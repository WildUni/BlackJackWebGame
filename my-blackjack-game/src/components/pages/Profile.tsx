import { useState } from "react";
import { usePlayer } from "../player-context";
import { useNavigate } from "react-router-dom";

function Profile() {
    const { playerName, setPlayerName, balance, setBalance } = usePlayer();
    const [newName, setNewName] = useState(playerName || "Guest-");
    const [isEditing, setIsEditing] = useState(false);
    const [activeSection, setActiveSection] = useState("overview");
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const navigate = useNavigate();

    const handleSaveName = () => {
        if (!newName || newName.trim() === "" || newName === "Guest-") {
            alert("Please enter a valid name!");
            return;
        }
        setPlayerName(newName.trim());
        setIsEditing(false);
    };

    const handleResetBalance = () => {
        if (confirm("Are you sure you want to reset your balance to $100?")) {
            setBalance(100);
        }
    };

    const handleLogout = () => {
        if (confirm("Are you sure you want to logout?")) {
            setPlayerName("");
            setBalance(0);
            navigate("/");
        }
    };

    // Mock game history data
    const gameHistory = [
        { id: 1, date: "2024-01-15", result: "Win", amount: "+$50", room: "ABC123" },
        { id: 2, date: "2024-01-14", result: "Loss", amount: "-$25", room: "XYZ789" },
        { id: 3, date: "2024-01-13", result: "Win", amount: "+$75", room: "DEF456" },
        { id: 4, date: "2024-01-12", result: "Loss", amount: "-$30", room: "GHI321" },
        { id: 5, date: "2024-01-11", result: "Win", amount: "+$40", room: "JKL654" },
    ];

    const navigationItems = [
        { id: "overview", label: "Overview", icon: "📊" },
        { id: "statistics", label: "Statistics", icon: "📈" },
        { id: "history", label: "Game History", icon: "📝" },
        { id: "settings", label: "Settings", icon: "⚙️" },
    ];

    const handleSectionChange = (sectionId: string) => {
        setActiveSection(sectionId);
        setSidebarOpen(false); // Close sidebar on mobile after selection
    };

    const renderContent = () => {
        switch (activeSection) {
            case "overview":
                return (
                    <div className="space-y-4 md:space-y-6">
                        {/* Player Summary Card */}
                        <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl p-4 md:p-6 border border-white/20">
                            <div className="flex flex-col sm:flex-row items-center gap-4 mb-4">
                                <div className="text-3xl md:text-4xl">🎯</div>
                                <div className="text-center sm:text-left">
                                    <h3 className="text-lg md:text-xl font-bold text-white">{playerName}</h3>
                                    <p className="text-gray-300 text-sm md:text-base">Active Player</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-3 gap-2 md:gap-4">
                                <div className="text-center">
                                    <div className="text-lg md:text-2xl font-bold text-yellow-400">${balance}</div>
                                    <div className="text-xs text-gray-400">Current Balance</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-lg md:text-2xl font-bold text-green-400">5</div>
                                    <div className="text-xs text-gray-400">Games Won</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-lg md:text-2xl font-bold text-blue-400">8</div>
                                    <div className="text-xs text-gray-400">Total Games</div>
                                </div>
                            </div>
                        </div>

                        {/* Quick Stats */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                                <div className="text-center">
                                    <div className="text-2xl md:text-3xl mb-2">🏆</div>
                                    <div className="text-lg md:text-xl font-bold text-green-400">62.5%</div>
                                    <div className="text-sm text-gray-400">Win Rate</div>
                                </div>
                            </div>
                            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                                <div className="text-center">
                                    <div className="text-2xl md:text-3xl mb-2">💰</div>
                                    <div className="text-lg md:text-xl font-bold text-yellow-400">+$110</div>
                                    <div className="text-sm text-gray-400">Total Winnings</div>
                                </div>
                            </div>
                        </div>

                        {/* Recent Activity */}
                        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                            <h3 className="text-lg font-semibold text-white mb-3">Recent Games</h3>
                            <div className="space-y-2">
                                {gameHistory.slice(0, 3).map((game) => (
                                    <div key={game.id} className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 border-b border-white/10 last:border-b-0 gap-2">
                                        <div className="flex items-center gap-3">
                                            <span className={`text-xs sm:text-sm px-2 py-1 rounded ${
                                                game.result === "Win" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
                                            }`}>
                                                {game.result}
                                            </span>
                                            <span className="text-gray-400 text-xs sm:text-sm">{game.date}</span>
                                        </div>
                                        <span className={`font-medium text-sm sm:text-base ${
                                            game.amount.startsWith('+') ? "text-green-400" : "text-red-400"
                                        }`}>
                                            {game.amount}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                );

            case "statistics":
                return (
                    <div className="space-y-4 md:space-y-6">
                        {/* Detailed Statistics */}
                        <div className="bg-white/5 rounded-xl p-4 md:p-6 border border-white/10">
                            <h3 className="text-lg md:text-xl font-semibold text-white mb-4 flex items-center gap-2">
                                📊 Game Statistics
                            </h3>
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                                <div className="text-center p-3 md:p-4 bg-white/5 rounded-lg">
                                    <div className="text-lg md:text-2xl font-bold text-green-400">5</div>
                                    <div className="text-xs md:text-sm text-gray-400">Games Won</div>
                                </div>
                                <div className="text-center p-3 md:p-4 bg-white/5 rounded-lg">
                                    <div className="text-lg md:text-2xl font-bold text-red-400">3</div>
                                    <div className="text-xs md:text-sm text-gray-400">Games Lost</div>
                                </div>
                                <div className="text-center p-3 md:p-4 bg-white/5 rounded-lg">
                                    <div className="text-lg md:text-2xl font-bold text-blue-400">8</div>
                                    <div className="text-xs md:text-sm text-gray-400">Total Games</div>
                                </div>
                                <div className="text-center p-3 md:p-4 bg-white/5 rounded-lg">
                                    <div className="text-lg md:text-2xl font-bold text-purple-400">62.5%</div>
                                    <div className="text-xs md:text-sm text-gray-400">Win Rate</div>
                                </div>
                            </div>
                        </div>

                        {/* Financial Stats */}
                        <div className="bg-white/5 rounded-xl p-4 md:p-6 border border-white/10">
                            <h3 className="text-lg md:text-xl font-semibold text-white mb-4 flex items-center gap-2">
                                💰 Financial Summary
                            </h3>
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                                <div className="text-center p-4 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-lg border border-yellow-500/30">
                                    <div className="text-xl md:text-2xl font-bold text-yellow-400">${balance}</div>
                                    <div className="text-sm text-gray-400">Current Balance</div>
                                </div>
                                <div className="text-center p-4 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-lg border border-green-500/30">
                                    <div className="text-xl md:text-2xl font-bold text-green-400">+$165</div>
                                    <div className="text-sm text-gray-400">Total Winnings</div>
                                </div>
                                <div className="text-center p-4 bg-gradient-to-br from-red-500/20 to-pink-500/20 rounded-lg border border-red-500/30">
                                    <div className="text-xl md:text-2xl font-bold text-red-400">-$55</div>
                                    <div className="text-sm text-gray-400">Total Losses</div>
                                </div>
                            </div>
                        </div>

                        {/* Performance Trends */}
                        <div className="bg-white/5 rounded-xl p-4 md:p-6 border border-white/10">
                            <h3 className="text-lg md:text-xl font-semibold text-white mb-4 flex items-center gap-2">
                                📈 Performance Trends
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="p-4 bg-white/5 rounded-lg">
                                    <div className="text-base md:text-lg font-semibold text-blue-400">Best Streak</div>
                                    <div className="text-xl md:text-2xl font-bold text-white">3 Wins</div>
                                    <div className="text-sm text-gray-400">January 2024</div>
                                </div>
                                <div className="p-4 bg-white/5 rounded-lg">
                                    <div className="text-base md:text-lg font-semibold text-purple-400">Biggest Win</div>
                                    <div className="text-xl md:text-2xl font-bold text-white">$75</div>
                                    <div className="text-sm text-gray-400">Single Game</div>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case "history":
                return (
                    <div className="space-y-4 md:space-y-6">
                        <div className="bg-white/5 rounded-xl p-4 md:p-6 border border-white/10">
                            <h3 className="text-lg md:text-xl font-semibold text-white mb-4 flex items-center gap-2">
                                📝 Game History
                            </h3>
                            <div className="space-y-3">
                                {gameHistory.map((game) => (
                                    <div key={game.id} className="bg-white/5 rounded-lg p-3 md:p-4 border border-white/10">
                                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                                            <div className="flex items-center gap-3 md:gap-4">
                                                <span className={`px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-medium ${
                                                    game.result === "Win" 
                                                        ? "bg-green-500/20 text-green-400 border border-green-500/30" 
                                                        : "bg-red-500/20 text-red-400 border border-red-500/30"
                                                }`}>
                                                    {game.result}
                                                </span>
                                                <div>
                                                    <div className="text-white font-medium text-sm md:text-base">Room: {game.room}</div>
                                                    <div className="text-gray-400 text-xs md:text-sm">{game.date}</div>
                                                </div>
                                            </div>
                                            <div className="text-left sm:text-right">
                                                <div className={`text-lg md:text-xl font-bold ${
                                                    game.amount.startsWith('+') ? "text-green-400" : "text-red-400"
                                                }`}>
                                                    {game.amount}
                                                </div>
                                                <div className="text-gray-400 text-xs md:text-sm">
                                                    {game.result === "Win" ? "Profit" : "Loss"}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                );

            case "settings":
                return (
                    <div className="space-y-4 md:space-y-6">
                        {/* Player Name Section */}
                        <div className="bg-white/5 rounded-xl p-4 md:p-6 border border-white/10">
                            <h3 className="text-lg md:text-xl font-semibold text-white mb-4 flex items-center gap-2">
                                👤 Player Settings
                            </h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-gray-300 text-sm font-medium mb-2">
                                        Player Name
                                    </label>
                                    {isEditing ? (
                                        <div className="flex flex-col sm:flex-row gap-2">
                                            <input
                                                type="text"
                                                value={newName}
                                                onChange={(e) => setNewName(e.target.value.replace(/\s+/g, ""))}
                                                maxLength={20}
                                                className="flex-1 bg-white/5 border-2 border-white/10 rounded-lg px-3 md:px-4 py-2 md:py-3 text-white 
                                                         font-medium tracking-wide placeholder-gray-500 outline-none transition-all duration-300
                                                         focus:border-purple-500 focus:bg-white/10 text-sm md:text-base"
                                                placeholder="Enter new name"
                                            />
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={handleSaveName}
                                                    className="bg-green-600 hover:bg-green-700 text-white px-3 md:px-4 py-2 md:py-3 rounded-lg font-medium transition-all duration-300 text-sm md:text-base"
                                                >
                                                    ✓
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        setNewName(playerName || "Guest-");
                                                        setIsEditing(false);
                                                    }}
                                                    className="bg-gray-600 hover:bg-gray-700 text-white px-3 md:px-4 py-2 md:py-3 rounded-lg font-medium transition-all duration-300 text-sm md:text-base"
                                                >
                                                    ✗
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center bg-white/5 rounded-lg p-3 md:p-4 gap-3">
                                            <span className="text-white font-medium text-base md:text-lg">{playerName || "No name set"}</span>
                                            <button
                                                onClick={() => setIsEditing(true)}
                                                className="bg-blue-600 hover:bg-blue-700 text-white px-3 md:px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 self-start sm:self-auto"
                                            >
                                                Edit
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Balance Management */}
                        <div className="bg-white/5 rounded-xl p-4 md:p-6 border border-white/10">
                            <h3 className="text-lg md:text-xl font-semibold text-white mb-4 flex items-center gap-2">
                                💰 Balance Management
                            </h3>
                            <div className="bg-white/5 rounded-lg p-3 md:p-4">
                                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-2">
                                    <span className="text-gray-300 text-sm md:text-base">Current Balance:</span>
                                    <span className="text-yellow-400 font-bold text-xl md:text-2xl">${balance || 0}</span>
                                </div>
                                <button
                                    onClick={handleResetBalance}
                                    className="w-full bg-yellow-600 hover:bg-yellow-700 text-white py-2 md:py-3 px-3 md:px-4 rounded-lg font-medium transition-all duration-300 text-sm md:text-base"
                                >
                                    Reset Balance to $100
                                </button>
                            </div>
                        </div>

                        {/* Danger Zone */}
                        <div className="bg-red-500/10 rounded-xl p-4 md:p-6 border border-red-500/30">
                            <h3 className="text-lg md:text-xl font-semibold text-red-400 mb-4 flex items-center gap-2">
                                ⚠️ Danger Zone
                            </h3>
                            <p className="text-gray-300 mb-4 text-sm md:text-base">This action cannot be undone. You will lose all your progress and be logged out.</p>
                            <button
                                onClick={handleLogout}
                                className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 md:py-3 px-3 md:px-4 rounded-lg 
                                         transition-all duration-300 shadow-md hover:shadow-red-500/40 text-sm md:text-base"
                            >
                                🚪 Logout & Clear Data
                            </button>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="fixed inset-0 h-screen w-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-2 md:p-4 overflow-hidden">
            <div className="relative bg-white/5 backdrop-blur-xl rounded-xl md:rounded-2xl shadow-2xl border border-white/10 w-full h-full md:max-w-6xl md:h-[90vh] overflow-hidden">
                {/* Animated background gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-emerald-500/10 rounded-xl md:rounded-2xl animate-pulse"></div>
                
                <div className="relative z-10 h-full flex flex-col lg:flex-row">
                    {/* Mobile Header */}
                    <div className="lg:hidden flex items-center justify-between p-4 border-b border-white/10 bg-white/5">
                        <div className="flex items-center gap-3">
                            <div className="text-2xl">⚙️</div>
                            <h1 className="text-xl font-black text-white tracking-wider bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                                PROFILE
                            </h1>
                        </div>
                        <button
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="bg-white/10 hover:bg-white/20 text-white p-2 rounded-lg transition-all duration-300"
                        >
                            <span className="text-lg">☰</span>
                        </button>
                    </div>

                    {/* Mobile Navigation Overlay */}
                    {sidebarOpen && (
                        <div className="lg:hidden fixed inset-0 bg-black/50 z-50" onClick={() => setSidebarOpen(false)}>
                            <div className="absolute top-0 left-0 w-64 h-full bg-slate-900/95 backdrop-blur-xl border-r border-white/10 p-4" onClick={(e) => e.stopPropagation()}>
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-lg font-bold text-white">Navigation</h2>
                                    <button
                                        onClick={() => setSidebarOpen(false)}
                                        className="text-white text-xl"
                                    >
                                        ✕
                                    </button>
                                </div>
                                <nav className="space-y-2">
                                    {navigationItems.map((item) => (
                                        <button
                                            key={item.id}
                                            onClick={() => handleSectionChange(item.id)}
                                            className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 flex items-center gap-3 ${
                                                activeSection === item.id
                                                    ? "bg-purple-600/30 text-white border border-purple-500/50"
                                                    : "text-gray-300 hover:bg-white/10 hover:text-white"
                                            }`}
                                        >
                                            <span className="text-lg">{item.icon}</span>
                                            <span className="font-medium">{item.label}</span>
                                        </button>
                                    ))}
                                </nav>
                                <div className="mt-8 pt-4 border-t border-white/10">
                                    <button
                                        onClick={() => navigate("/Home")}
                                        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-3 px-4 rounded-lg 
                                                 transform transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-2xl flex items-center justify-center gap-2"
                                    >
                                        <span>🎮</span>
                                        <span>Back to Game</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Desktop Sidebar Navigation */}
                    <div className="hidden lg:flex w-64 bg-white/5 border-r border-white/10 p-6 flex-col">
                        <div className="text-center mb-8">
                            <div className="text-3xl mb-2">⚙️</div>
                            <h1 className="text-2xl font-black text-white tracking-wider drop-shadow-2xl bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                                PROFILE
                            </h1>
                        </div>

                        <nav className="space-y-2 flex-1">
                            {navigationItems.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => setActiveSection(item.id)}
                                    className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 flex items-center gap-3 ${
                                        activeSection === item.id
                                            ? "bg-purple-600/30 text-white border border-purple-500/50"
                                            : "text-gray-300 hover:bg-white/10 hover:text-white"
                                    }`}
                                >
                                    <span className="text-lg">{item.icon}</span>
                                    <span className="font-medium">{item.label}</span>
                                </button>
                            ))}
                        </nav>

                        <div className="pt-4 border-t border-white/10">
                            <button
                                onClick={() => navigate("/Home")}
                                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-3 px-4 rounded-lg 
                                         transform transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-2xl flex items-center justify-center gap-2"
                            >
                                <span>🎮</span>
                                <span>Back to Game</span>
                            </button>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1 p-3 md:p-6 overflow-y-auto">
                        {/* Mobile Section Indicator */}
                        <div className="lg:hidden mb-4">
                            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                                {navigationItems.find(item => item.id === activeSection)?.icon}
                                {navigationItems.find(item => item.id === activeSection)?.label}
                            </h2>
                        </div>
                        {renderContent()}
                    </div>
                </div>

                
            </div>
        </div>
    );
}

export default Profile;