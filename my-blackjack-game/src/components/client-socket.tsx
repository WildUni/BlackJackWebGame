import type { displayData } from "../scripts/utils";
import { usePlayer } from "./player-context";

export function useGameSocket() {
  const { socket } = usePlayer();

  function joinRoom(roomId: string) {
    socket?.emit("join-room", roomId);
  }

  function updateReadyStatus(roomId: string) {
    socket?.emit("player-ready", roomId);
  }

  function addBet(roomId: string, betSize: number) {
    socket?.emit("player-bet", roomId, betSize);
  }

  function playerAction(roomId: string, action: string) {
    socket?.emit("player-action", roomId, action);
  }

  function leaveRoom(roomId: string) {
    socket?.emit("leave-room", roomId);
    socket?.off("gameUpdate");
  }

  function setUpGameListener(func: (data: displayData) => void){
    socket?.on("gameUpdate", (game: {displayData:displayData}) => {
      console.log("received game room!")
      func(game.displayData);
      console.log("gameUpdate listeners:", socket?.listeners("gameUpdate").length);
    });
  }

  function listenForSocketError(func:(msg : {type:string, reason: string})=>void){
    socket?.on("Error", (msg : {type:string, reason: string}) =>{
      func(msg);
    })
  }

  return { joinRoom, updateReadyStatus, addBet, playerAction, leaveRoom, setUpGameListener };
}
