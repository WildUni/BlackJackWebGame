import { useState } from "react";
import { usePlayer } from "../player-context";
import { useNavigate } from "react-router-dom";

function LoginPage(){
    const { setPlayerName, setBalance} = usePlayer();
    const [guestName, setGuestName] = useState("Guest-");
    const navigate = useNavigate();



    const handleGuestPlayer = () =>{
        if (!guestName || guestName === "Guest-") {
            alert("Please enter a valid guest name!");
            return;
        }
        console.log("Joining as:", guestName);
        setPlayerName(guestName);
        setBalance(100);
        navigate("/Home");
    }
    return (
    <div className="fixed inset-0 h-screen w-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-6 overflow-hidden">
      <div className="flex justify-center relative bg-white/5 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-white/10 max-w-lg w-full">
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-emerald-500/10 rounded-2xl animate-pulse"></div>
        <div className="relative z-10 flex-col justify-between">
          {/* Title Section */}

          <div className="text-center  mb-6">
            <div className="text-5xl mb-3 animate-bounce">🃏</div>
            <h1 className="text-4xl font-black text-white mb-3 tracking-wider drop-shadow-2xl bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              BLACKJACK
            </h1>
            <p className="text-gray-300 text-lg font-medium">
              Beat the dealer. Hit 21. Win big.
            </p>
          </div>




          {/* Player Name Input */}
          <div className="mb-5">
            <input
              type="text"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value.replace(/\s+/g, ""))}
              placeholder="Enter Your Guest Name! (Guest-)"
              maxLength={20}
              className="w-full bg-white/5 border-2 border-white/10 rounded-xl px-5 py-3 text-white text-base 
                         font-medium tracking-wide placeholder-gray-500 outline-none transition-all duration-300
                         focus:border-purple-500 focus:bg-white/10 focus:shadow-lg focus:shadow-purple-500/25"
            />
            <button
            onClick={() => {handleGuestPlayer()}}
            className="mt-8 block mx-auto bg-purple-600 hover:bg-purple-700 text-white font-semibold px-5 py-3 rounded-xl 
               transition-all duration-300 shadow-md hover:shadow-purple-500/40">
                Play As Guest!
            </button>
            </div>
          </div>
        </div>
      </div>
  )
}

export default LoginPage;