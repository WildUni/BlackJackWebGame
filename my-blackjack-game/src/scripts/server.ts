import http from "http";
import express from "express";
import { Server } from "socket.io";
import type { Socket } from "socket.io";
import type { playerInfo } from "./utils";
import assert from "assert";
import GameRoom from "./gameLogic";
import { gameConstants, socketErrorTypes } from "./utils";

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
const runningTimers = new Map<string, NodeJS.Timeout>();

//Some room management functions
async function leaveAllPublic(socket: import("socket.io").Socket) {
  for (const r of socket.rooms) {
    if (r !== socket.id) {
      await socket.leave(r);
    }
  }
}

console.log('🚀 Starting Blackjack server...');


io.on('connection', (socket) => {
    const { playerName } = socket.handshake.auth;
    let { balance } = socket.handshake.auth;
    const handleReveal = (game:GameRoom) =>{
        game.dealerReveal();
        game.evaluateWinner();
        balance = game.getPlayersInfo().get(playerName)?.balance;
        sendGameData(game.roomId, game);
    }

    const restartGame = (game:GameRoom) =>{
        game.restartGame();
        sendGameData(game.roomId, game);
    }

    const handRevealAndRestart = (game: GameRoom)=>{
        handleReveal(game);
        console.log(`Game ${game.roomId} is revealing!`)
        const dealerHand = game.getDealerHand();
        console.log(game.getHandValue(dealerHand));
        setTimeout(()=>restartGame(game), gameConstants.REVEALING_TIMER)
        console.log(`Game ${game.roomId} has ended and is restarting!`)
    }

    const handleActionPhase = (game: GameRoom) =>{
        if(game.getGameState() !== "ACTING"){
            return;
        }
        console.log(`Player ${game.getCurrentPlayerName()} is choosing an action`)

        const timer = setTimeout(()=>{
            game.standAction();
            runningTimers.delete(game.roomId);
            sendGameData(game.roomId, game)
            if(game.getGameState() === "REVEALING"){
                handRevealAndRestart(game);
            }
            handleActionPhase(game);
        }, gameConstants.ACTING_TIMER)

        runningTimers.set(game.roomId, timer);
    }

    const sendGameData = (roomId:string, game:GameRoom)=>{
        io.to(roomId).emit("gameUpdate", {
            displayData: game.getDisplayData()
        })
    }

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
    socket.on('join-room', (roomId: string) => {
        const playerInfo: playerInfo = {
            playerName,
            balance,
            currentBet: 0, 
            socket: socket.id,
            ready:false
        }
        let game = runningGames.get(roomId);

        if(!game){
            game = new GameRoom(roomId);
            runningGames.set(roomId, game);
        }

        //if player already exists, replace socket
        if(game.getPlayersInfo().has(playerName)){
            const tempInfo: playerInfo = game.players.get(playerName)??assert.fail();
            tempInfo.socket = socket.id;
            console.log(`🎮 "${playerName}" rejoining room "${roomId}"`);
            socket.join(roomId);
            return;       
        }


        //handles max capacity and invalid game state
        if(game.getNumPlayers() >= gameConstants.MAX_PLAYER_COUNT){
            socket.emit("ERROR", { type: socketErrorTypes.JOIN, description: `The can be a max of ${gameConstants.MAX_PLAYER_COUNT} players in the room at the same time`});
            console.log(`🎮 "${playerName}" was declined from room "${roomId}"`);
            return;
        }
        if(game.getGameState() != "WAITING"){
            socket.emit("ERROR", { type: socketErrorTypes.JOIN, description:"The game has started!"})
        }


        // Join the socket room
        socket.join(roomId);
        game.addPlayer(playerInfo);
        console.log(`🎮 "${playerName}" joining room "${roomId}"`);
        
        
        //sends update
        sendGameData(roomId, game);
    })

    socket.on('player-ready', (roomId) => {
        const game = runningGames.get(roomId)??assert.fail("Games does not exist");
        game.changeReadyState(playerName);
        console.log(`🎯 Player ${playerName} is ${game.players.get(playerName)?.ready ? "ready": "un-ready"} in room "${roomId}"`);

        if(game.checkBetting()){
            game.setGameState("BETTING");
            setTimeout(()=>{
                //end of betting, init hands with betsize
                game.finalizePlayerBet();
                try{
                    game.setGameState("DEALING");
                    console.log(`Game ${roomId} started dealing phase`)

                    game.initHands();
                    game.dealInitCards();
                    if(game.checkForTermination()){
                        game.setGameState("REVEALING");
                        handRevealAndRestart(game)
                        return
                    }

                    //ask for double down
                    sendGameData(roomId, game);

                    //starting acting phase
                    setTimeout(()=>{
                        game.setGameState("ACTING");
                        console.log(`Game ${roomId} started acting phase`)
                        sendGameData(roomId, game);
                        handleActionPhase(game);
                    }, gameConstants.DEALING_TIMER);
            }catch(e){
                game.setGameState("WAITING");
                game.restartGame();
                console.log("Game failed to start because no bet was placed")
                sendGameData(roomId, game);
            }

            }, gameConstants.BETTING_TIMER);
        };

        sendGameData(roomId, game);
    });

    socket.on('player-bet', (roomId:string, betSize:number)=>{
        const game = runningGames.get(roomId)??assert.fail("Game does not exist ");
        assert(game.getGameState() === "BETTING", "Game not in betting state!");
        game.setPlayerBet(playerName, betSize);
        sendGameData(roomId, game);
    })

    socket.on('player-action', (roomId: string, action:string) => {
        const game = runningGames.get(roomId)??assert.fail("Game not found!");
        switch(action){
            case "HIT":
                game.hitAction()
                break;
            case "STAND":
                console.log(game.getHands())
                game.standAction();
                break;
            case "DOUBLE":
                try{
                    game.doubleDownAction(playerName);
                }catch(e){
                    socket.emit("ERROR", {type:socketErrorTypes.DOUBLE, description:"Double Action Failed"})
                    return;
                }
                break;
            case "SPLIT":
                try{
                    game.playerSplitHand();
                }catch(e){
                    socket.emit("ERROR", {type:socketErrorTypes.SPLIT, description:"SPLIT ACTION FAILED"})
                    return;
                }
                
                break;
        }
        
        const timer = runningTimers.get(roomId)
        clearTimeout(timer);
        runningTimers.delete(roomId);

        if(game.getGameState() === "REVEALING"){
            handRevealAndRestart(game);
        }

        sendGameData(roomId, game); 
    });

    socket.on('leave-room', (roomId:string) => {
        console.log(`❌ Player  ${playerName} left room ${roomId}`);
        try{
        const game = runningGames.get(roomId)??assert.fail();
        game.removePlayer(playerName);
        socket.leave(roomId);
        sendGameData(roomId, game);
        }catch(e){
            return
        }
    });


});

server.listen(3001, () => {
  console.log('🚀 Blackjack server running on http://localhost:3001');
  console.log('📝 Waiting for players...');
  console.log('🎮 Open http://localhost:5173 in your browser');
});