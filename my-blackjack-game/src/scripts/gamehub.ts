import GameRoom from "./gameLogic";
import type { Request, Response } from "express";
import type { playerInfo } from "./utils";

//gamehub for all current running game
const runningGames = new Map<string, GameRoom>();


function joinLobby(req: Request, res:Response){
    const {playerName, balance, socketID, roomID} = req.body;
    let game = runningGames.get(roomID);
    let info: playerInfo = {
        playerName: playerName,
        balance: balance,
        socket: socketID,
        ready: false
    }
    if (!game){
        game = new GameRoom(roomID);
        runningGames.set(roomID, game);
    }
    game.addPlayer(info)
    res.send({
        players: game.players
    });
}

module.exports = {
    runningGames,
    joinLobby,
};