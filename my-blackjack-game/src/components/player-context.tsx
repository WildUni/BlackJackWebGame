import { createContext, useContext, useState, useEffect } from "react";
import type {ReactNode} from "react";
import { io, type Socket } from "socket.io-client";
import { useGameSocket } from "./client-socket";

type PlayerContextValue = {
  playerName: string;
  balance: number;
  setPlayerName: (name: string) => void;
  setBalance: (newBal: number) =>void;
  socket:Socket|null;
};

const PlayerContext = createContext<PlayerContextValue | undefined>(undefined);
const endpoint = window.location.hostname + ":" + window.location.port;


export function PlayerProvider({ children }: { children: ReactNode }) {
    const [playerName, setPlayerName] = useState("");
    const [balance, setBalance] = useState(0);
    const [socket, setSocket] = useState<Socket | null>(null);
    
    useEffect(() => {
        //dc socket if no name
        if (!playerName) {
          setSocket(prev => {
          prev?.disconnect();
          return null;
        });
        return;
    }
    //console.log(endpoint);
    const s: Socket = io("http://localhost:3001", {
      transports: ["websocket"],
      auth: { playerName, balance }
    });

    s.on("connect", () => {
      console.log(`Successfully Connected to the server as ${playerName}!`);
    });

    s.connect();
    setSocket(s);
    // listenForSocketError();

    // cleanup: disconnect this instance if name changes/unmounts
    return () => {
      s.disconnect();
      setSocket(prev => (prev === s ? null : prev));
    };
  }, [playerName]);


    return (
      <PlayerContext.Provider value={{ playerName, setPlayerName , balance, setBalance, socket}}>
        {children}
      </PlayerContext.Provider>
    );

}


export function usePlayer() {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error("usePlayer must be used within <PlayerProvider>");
  return ctx;
}