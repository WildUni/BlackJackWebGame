function PlayerInfoBox(props: { playerName: string; balance: number; isPlayerReady: boolean }) {
  const { playerName, balance, isPlayerReady } = props;

  return (
    <div
      className={`relative w-52 rounded-2xl p-6 shadow-2xl border border-white/10
                  bg-white/5 backdrop-blur-xl overflow-hidden`}
    >
      {/* Animated background gradient (same style as your main card) */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-emerald-500/10 rounded-2xl animate-pulse" />

      <div className="relative z-10 flex flex-col items-center gap-4">
        {/* Avatar with readiness indicator */}
        <div className="relative">
          <img
            src={"../../../assets/logo.png"}
            alt={`${playerName} avatar`}
            className="w-20 h-20 rounded-full object-cover ring-2 ring-white/30 shadow-lg"
          />
        </div>

        {/* Name */}
        <div className="text-white text-lg font-extrabold tracking-wide text-center">
          {playerName}
        </div>

        {/* Balance */}
        <div className="text-amber-300/90 font-medium">
          Balance: {balance}
        </div>

        {/* Readiness text pill */}
        <div>
          <span
            className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold
              ring-1 shadow-sm
              ${isPlayerReady
                ? "bg-emerald-500/15 text-emerald-300 ring-emerald-400/25"
                : "bg-rose-500/15 text-rose-300 ring-rose-400/25"}`}
          >
            {isPlayerReady ? "✓ Ready" : "Ready Up"}
          </span>
        </div>
      </div>
    </div>
  );
}

export default PlayerInfoBox;