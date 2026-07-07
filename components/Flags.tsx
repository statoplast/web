const SHIELD_COLS = 5;
const SHIELD_ROWS = 5;
const SHIELD_X = 24;
const SHIELD_Y = 14;
const SHIELD_W = 12;
const SHIELD_H = 12;
const CELL_W = SHIELD_W / SHIELD_COLS;
const CELL_H = SHIELD_H / SHIELD_ROWS;

export function FlagHR({ className }: { className?: string }) {
  const cells = [];
  for (let row = 0; row < SHIELD_ROWS; row++) {
    for (let col = 0; col < SHIELD_COLS; col++) {
      const isRed = (row + col) % 2 === 0;
      cells.push(
        <rect
          key={`${row}-${col}`}
          x={SHIELD_X + col * CELL_W}
          y={SHIELD_Y + row * CELL_H}
          width={CELL_W}
          height={CELL_H}
          fill={isRed ? "#FF0000" : "#FFFFFF"}
        />
      );
    }
  }

  return (
    <svg viewBox="0 0 60 40" className={className} aria-hidden="true">
      <rect width="60" height="13.33" fill="#FF0000" />
      <rect y="13.33" width="60" height="13.33" fill="#FFFFFF" />
      <rect y="26.67" width="60" height="13.33" fill="#171796" />

      {/* simplified crown above the shield, hinting at the five historic shields */}
      <path
        d="M22.5 13 Q23 9 26 9.5 Q26.5 7.5 28.5 8 Q29.5 6 30 6 Q30.5 6 31.5 8 Q33.5 7.5 34 9.5 Q37 9 37.5 13 Z"
        fill="#D4AF37"
        stroke="#8a6d1f"
        strokeWidth="0.4"
      />

      <rect
        x={SHIELD_X}
        y={SHIELD_Y}
        width={SHIELD_W}
        height={SHIELD_H}
        fill="#FFFFFF"
        stroke="#FFFFFF"
        strokeWidth="1"
      />
      {cells}
      <rect
        x={SHIELD_X}
        y={SHIELD_Y}
        width={SHIELD_W}
        height={SHIELD_H}
        fill="none"
        stroke="#171796"
        strokeWidth="0.6"
      />
    </svg>
  );
}

export function FlagEN({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 40" className={className} aria-hidden="true">
      <rect width="60" height="40" fill="#00247D" />
      <line x1="0" y1="0" x2="60" y2="40" stroke="#FFFFFF" strokeWidth="8" />
      <line x1="60" y1="0" x2="0" y2="40" stroke="#FFFFFF" strokeWidth="8" />
      <line x1="0" y1="0" x2="60" y2="40" stroke="#CF142B" strokeWidth="3.5" />
      <line x1="60" y1="0" x2="0" y2="40" stroke="#CF142B" strokeWidth="3.5" />
      <rect x="24" width="12" height="40" fill="#FFFFFF" />
      <rect y="14" width="60" height="12" fill="#FFFFFF" />
      <rect x="26.5" width="7" height="40" fill="#CF142B" />
      <rect y="16.5" width="60" height="7" fill="#CF142B" />
    </svg>
  );
}

export function FlagDE({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 40" className={className} aria-hidden="true">
      <rect width="60" height="13.33" fill="#000000" />
      <rect y="13.33" width="60" height="13.33" fill="#DD0000" />
      <rect y="26.67" width="60" height="13.33" fill="#FFCC00" />
    </svg>
  );
}
