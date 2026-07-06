export function FlagHR({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 40" className={className} aria-hidden="true">
      <rect width="60" height="13.33" fill="#FF0000" />
      <rect y="13.33" width="60" height="13.33" fill="#FFFFFF" />
      <rect y="26.67" width="60" height="13.33" fill="#171796" />
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
