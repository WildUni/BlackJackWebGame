import http from "http";
import express from "express";
import { Server } from "socket.io";
import type { Socket } from "socket.io";
import type { playerInfo } from "./utils";
import assert from "assert";
import GameRoom from "./gameLogic";
import { gameConstants } from "./utils";

const playerToSocket = new Map<string, Socket>();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});


//GU - gameUpdate
//So far we are emitting the entire gameRoom object, could be optimized 



const runningGames = new Map<string, GameRoom>();
const runningTimers = new Map<string, Map<string, NodeJS.Timeout>>();
const MAX_NUM_PLAYERS = 3;
//Some room management functions
async function leaveAllPublic(socket: import("socket.io").Socket) {
  for (const r of socket.rooms) {
    if (r !== socket.id) {
      await socket.leave(r);
    }
  }
}

console.log('🚀 Starting Blackjack server...');


const handleActionPhase = (game: GameRoom) =>{
    if(game.getGameState() !== "ACTING"){
        return;
    }
    console.log(`Player ${game.getCurrentPlayerName()} is choosing an action`)
    console.log(game.getHands())
    const playerName = game.getCurrentPlayerName();
    const timer = setTimeout(()=>{
        game.standAction();
        runningTimers.get(game.roomID)?.delete(playerName);
        if(game.getGameState() === "REVEALING"){
            console.log(`game ${game.roomID} has ended!`)
            game.dealerReveal();
            game.evaluateWinner();
            io.to(game.roomID).emit("gameUpdate", {
                displayData: game.getDisplayData()
            })

            setTimeout(()=>{
                game.restartGame();
                io.to(game.roomID).emit("gameUpdate", {
                    displayData: game.getDisplayData()
                })
            }, gameConstants.REVEALING_TIMER)
            
        }
        handleActionPhase(game);
    }, gameConstants.ACTING_TIMER)
    runningTimers.get(game.roomID)?.set(playerName, timer);
}




io.on('connection', (socket) => {
    const { playerName, balance } = socket.handshake.auth;

    console.log(`✅ Player ${playerName} connected:`, socket.id);

    
    if(playerToSocket.has(playerName)){
        const oldSocket = playerToSocket.get(playerName)??assert.fail();
        leaveAllPublic(oldSocket);
        playerToSocket.set(playerName, socket);
        console.log("Removed old player socket from server");
    }


    /**
     * Handles join room:
     * If room does not exist, we create a room
     * If room full, an error message is emitted
     * If room is not in waiting state, reject join request
     * If player with same ID tries to rejoin a second time, replace current
     */
    socket.on('join-room', (roomID: string) => {
        const playerInfo: playerInfo = {
            playerName,
            balance,
            currentBet: 0, 
            socket: socket.id,
            ready:false
        }
        let game = runningGames.get(roomID);

        if(!game){
            game = new GameRoom(roomID);
            runningGames.set(roomID, game);
        }

        //if player already exists, replace socket
        if(game.players.has(playerName)){
            const tempInfo: playerInfo = game.players.get(playerName)??assert.fail();
            tempInfo.socket = socket.id;
            console.log(`🎮 "${playerName}" rejoining room "${roomID}"`);
            socket.join(roomID);
            return;       
        }


        //handles max capacity and invalid game state, should split into two checks!
        if(game.getGameState() != "WAITING" || game.getNumPlayers() >= MAX_NUM_PLAYERS){
            socket.emit("error-message", { code: "ROOM_FULL", message: `The can be a max of ${MAX_NUM_PLAYERS} players in the room at the same time`});
            console.log(`🎮 "${playerName}" was declined from room "${roomID}"`);
            return;
        }
        // Join the socket room
        socket.join(roomID);
        game.addPlayer(playerInfo);
        console.log(`🎮 "${playerName}" joining room "${roomID}"`);
        
        
        //sends update
        io.to(roomID).emit("gameUpdate", {
            displayData: game.getDisplayData()
        })
    })



    socket.on('player-ready', (roomId) => {
        const game = runningGames.get(roomId)??assert.fail("Games does not exist");
        game.changeReadyState(playerName);
        console.log(`🎯 Player ${playerName} is ${game.players.get(playerName)?.ready ? "ready": "un-ready"} in room "${roomId}"`);

        if(game.startBetting()){
            setTimeout(()=>{
                //end of betting, init hands with betsize
                game.startDealingPhase();
                console.log(`Game ${roomId} started dealing phase`)
                game.finalizePlayerBet();
                game.initHands();
                game.dealInitCards();
                //ask for double down
                io.to(roomId).emit("gameUpdate", {
                    displayData: game.getDisplayData()
                })
                //handles double downs
                setTimeout(()=>{
                    game.startActingPhase();
                    console.log(`Game ${roomId} started acting phase`)
                    io.to(roomId).emit("gameUpdate", {
                        displayData: game.getDisplayData()
                    })
                    handleActionPhase(game);
                }, gameConstants.DEALING_TIMER);
            }, gameConstants.BETTING_TIMER);
        };
        io.to(roomId).emit("gameUpdate", {
            displayData: game.getDisplayData()
        })
    });

    
    socket.on('player-bet', (roomId:string, betSize:number)=>{
        const game = runningGames.get(roomId)??assert.fail("Game does not exist ");
        assert(game.getGameState() === "BETTING", "Game not in betting state!");
        game.setPlayerBet(playerName, betSize);
        io.to(roomId).emit("gameUpdate", {
            displayData: game.getDisplayData()
        })
    })


    socket.on('player-action', (roomId: string, action:string) => {
        const game = runningGames.get(roomId)??assert.fail("Game not found!");
        switch(action){
            case "HIT":
                game.hitAction()
                break;
            case "STAND":
                game.standAction();
                break;
            case "DOUBLE":
                try{
                    game.doubleDownAction();
                }catch(e){
                    const player = game.getCurrentPlayerName()??assert.fail();
                    const playerSocket = playerToSocket.get(player)??assert.fail();
                    playerSocket.emit("error", {
                        code:"INVALID_ACTION",
                        reason:"Insuifficient Balance!"
                    })
                    console.log("Insuifficient Balance! when trying to make a bet")
                    return;
                }
                break;
        }
        
        const timer = runningTimers.get(roomId)?.get(playerName);
        clearTimeout(timer);
        runningTimers.get(roomId)?.delete(playerName);

        if(game.getGameState() === "REVEALING"){
            console.log(`game ${game.roomID} has ended!`)
            game.dealerReveal();
            game.evaluateWinner();
            setTimeout(() => {
                game.restartGame();
                io.to(roomId).emit("gameUpdate", {
                    displayData: game.getDisplayData()
                }) 
            }, 10000);
        }

        io.to(roomId).emit("gameUpdate", {
            displayData: game.getDisplayData()
        })  

        
    });

    socket.on('leave-room', (roomId:string) => {
        console.log(`❌ Player  ${playerName} left room ${roomId}`);
        const game = runningGames.get(roomId)??assert.fail();
        game.removePlayer(playerName);
        socket.leave(roomId);
        io.to(roomId).emit("gameUpdate", {
            displayData:game.getDisplayData()
        });
    });


});

server.listen(3001, () => {
  console.log('🚀 Blackjack server running on http://localhost:3001');
  console.log('📝 Waiting for players...');
  console.log('🎮 Open http://localhost:5173 in your browser');
});