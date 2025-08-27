/**
 * A box displaying a player's basic information. 
 * This box should only be displayed during the waiting, and betting phase!
 * @param props playername, player balance, ready status, current bets
 * @returns 
 */
function PlayerInfoBox(props: { playerName: string; balance: number; isPlayerReady: boolean; currentBet: number}) {
  const { playerName, balance, isPlayerReady, currentBet } = props;

  return (
    <div className={`relative w-44 rounded-xl p-5 shadow-xl border border-white/10
                  bg-white/5 backdrop-blur-xl overflow-hidden`}>
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-emerald-500/10 rounded-xl animate-pulse" />

      <div className="relative z-10 flex flex-col items-center gap-3.5">
        {/* Avatar */}
        <div className="relative">
          <img
            src={"../../../assets/logo.png"}
            alt={`${playerName} avatar`}
            className="w-12 h-12 rounded-full object-cover ring-2 ring-white/30 shadow-lg"
          />
        </div>

        {/* Name */}
        <div className="text-white text-[15px] font-bold tracking-wide text-center">
          {playerName}
        </div>

        {/* Balance */}
        <div className="text-amber-300/90 text-sm font-medium">
          Balance: {balance}
        </div>

        {/* Readiness pill */}
        <div>
          <span
            className={`inline-flex items-center rounded-full px-3 py-0.5 text-[12px] font-semibold
              ring-1 shadow-sm
              ${isPlayerReady
                ? "bg-emerald-500/15 text-emerald-300 ring-emerald-400/25"
                : "bg-rose-500/15 text-rose-300 ring-rose-400/25"}`}>
            {isPlayerReady ? "✓ Ready" : "Ready Up"}
          </span>
        </div>

        {/* Current Bet */}
        <div className="text-amber-300/90 text-sm font-medium">
          {`Current Bet: ${currentBet !== undefined ? currentBet : 0}`}
        </div>
      </div>
    </div>
  );
}

export default PlayerInfoBox;
