import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Home(){
    const [gameCode, setGameCode] = useState("");
    const navigate = useNavigate();

    const handleStartNewGame = () => {
        // Generate a random 6-digit game code
        const newGameCode = Math.random().toString(36).substring(2, 8).toUpperCase();
        console.log("Creating new game with code:", newGameCode);
        // Navigate to the game room with the new code
        navigate(`/room/${newGameCode}`);
    };

    const handleJoinGame = () => {
        if (!gameCode || gameCode.length !== 6) {
            alert("Please enter a valid 6-digit game code!");
            return;
        }
        console.log("Joining game with code:", gameCode);
        // Navigate to the game room with the entered code
        navigate(`/room/${gameCode}`);
    };

    return (
        <div className="fixed inset-0 h-screen w-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-6 overflow-hidden">
            <div className="relative bg-white/5 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-white/10 max-w-lg w-full">
                {/* Animated background gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-emerald-500/10 rounded-2xl animate-pulse"></div>
                <div className="relative z-10">
                    {/* Profile Button - Positioned absolutely with higher z-index */}
                    <button
                        onClick={() => navigate("/profile")}
                        className="absolute top-0 right-0 bg-white/10 hover:bg-white/20 text-white p-3 rounded-xl transition-all duration-300 border border-white/20 hover:border-white/40 shadow-lg z-20"
                        title="Profile"
                    >
                        <span className="text-xl">⚙️</span>
                    </button>

                    {/* Title Section */}
                    <div className="text-center mb-8 mt-4">
                        <div className="text-5xl mb-3 animate-bounce">🃏</div>
                        <h1 className="text-4xl font-black text-white mb-3 tracking-wider drop-shadow-2xl bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                            BLACKJACK
                        </h1>
                        <p className="text-gray-300 text-lg font-medium">
                            Beat the dealer. Hit 21. Win big.
                        </p>
                    </div>

                    {/* Game Code Input */}
                    <div className="mb-6">
                        <input
                            type="text"
                            value={gameCode}
                            onChange={(e) => setGameCode(e.target.value.toUpperCase())}
                            placeholder="Enter game code or leave blank"
                            maxLength={6}
                            className="w-full bg-white/5 border-2 border-white/10 rounded-xl px-5 py-3 text-white text-base 
                                    font-mono tracking-wider placeholder-gray-500 outline-none transition-all duration-300
                                    focus:border-purple-500 focus:bg-white/10 focus:shadow-lg focus:shadow-purple-500/25"
                        />
                    </div>

                    {/* Single Join/Create Button */}
                    <div className="mb-8">
                        <button 
                            className="mx-auto bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500 text-white font-semibold px-5 py-3 rounded-xl 
                                    transform transition-all duration-300 hover:scale-105 hover:from-blue-600 hover:via-purple-600 hover:to-emerald-600 
                                    shadow-md active:scale-95 flex items-center justify-center gap-3"
                            onClick={gameCode ? handleJoinGame : handleStartNewGame}
                        >
                            <span className="text-xl">{gameCode ? '🎯' : '🎮'}</span>
                            <span>{gameCode ? 'Join Game' : 'Create New Game'}</span>
                        </button>
                    </div>

                    {/* Footer */}
                    <div className="pt-5 border-t border-white/10 text-center">
                        <div className="flex flex-wrap justify-center gap-8 text-gray-400 text-sm font-medium">
                            <span className="flex items-center gap-2">
                                A BlackJack Multiplayer Game | Created By WildUni & tteoi
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;