import { createContext, useContext, useState } from "react";
import type {ReactNode} from "react";

type PlayerContextValue = {
  playerName: string;
  balance: number;
  setPlayerName: (name: string) => void;
  setBalance: (newBal: number) =>void;
};

const PlayerContext = createContext<PlayerContextValue | undefined>(undefined);

export function PlayerProvider({ children }: { children: ReactNode }) {
    const [playerName, setPlayerName] = useState("");
    const [balance, setBalance] = useState(0);
    return (
      <PlayerContext.Provider value={{ playerName, setPlayerName , balance, setBalance}}>
        {children}
      </PlayerContext.Provider>
    );
}

// Custom hook to use it safely
export function usePlayer() {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error("usePlayer must be used within <PlayerProvider>");
  return ctx;
}