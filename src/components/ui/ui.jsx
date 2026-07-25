/* =====================================================
   ui.jsx â€” Shared UI primitives (Figma-faithful)
   ===================================================== */

// â”€â”€ Back Button (rounded grey circle with arrow) â”€â”€
export function BackButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex h-11 w-11 items-center justify-center rounded-full bg-[#F5F5F5] text-ink transition-transform active:scale-90 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none hover:bg-gray-200 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
      aria-label="Retour"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 18l-6-6 6-6" />
      </svg>
    </button>
  );
}

// â”€â”€ Close Button (X) â”€â”€
export function CloseButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex h-11 w-11 items-center justify-center rounded-full bg-[#F5F5F5] text-ink transition-transform active:scale-90 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none hover:bg-gray-200 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
      aria-label="Fermer"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 6L6 18M6 6l12 12" />
      </svg>
    </button>
  );
}

// â”€â”€ Status Bar (simulated) â”€â”€
export function StatusBar() {
  return (
    <div className="flex items-center justify-between px-5 pt-3 pb-1">
      <span className="text-[12px] font-semibold text-ink">11:11</span>
      <div className="flex items-center gap-1">
        <svg width="16" height="11" viewBox="0 0 16 11" fill="currentColor" className="text-ink">
          <rect x="0" y="4" width="3" height="7" rx="0.5"/>
          <rect x="4.5" y="2.5" width="3" height="8.5" rx="0.5"/>
          <rect x="9" y="0.5" width="3" height="10.5" rx="0.5"/>
          <rect x="13.5" y="0" width="2.5" height="11" rx="0.5" opacity="0.3"/>
        </svg>
        <svg width="16" height="12" viewBox="0 0 24 18" fill="none" className="text-ink">
          <path d="M1 7C4.5 3.5 9 1.5 12 1.5S19.5 3.5 23 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M4 10.5C6.5 8 9 6.5 12 6.5s5.5 1.5 8 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M7.5 14C9 12.5 10.5 11.5 12 11.5s3 1 4.5 2.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <circle cx="12" cy="17" r="1.5" fill="currentColor"/>
        </svg>
        <div className="flex items-center gap-0.5">
          <div className="h-3 w-6 rounded-sm border border-ink relative">
            <div className="absolute inset-[1.5px] rounded-[1px] bg-ink" style={{width:'75%'}}/>
          </div>
          <div className="h-2 w-0.5 rounded-r-sm bg-ink"/>
        </div>
      </div>
    </div>
  );
}

// â”€â”€ Top Bar (standard page header) â”€â”€
export function TopBar({ title, onBack, right }) {
  return (
    <div className="flex items-center justify-between px-5 py-3">
      <BackButton onClick={onBack} />
      {title && <h2 className="font-display text-[16px] font-semibold text-ink">{title}</h2>}
      {right || <div className="w-9" />}
    </div>
  );
}

// â”€â”€ Stepper (quantity control like Figma orange buttons) â”€â”€
export function Stepper({ qty, onChange, size = "md" }) {
  const dims = size === "sm" ? "h-9 w-9 text-sm" : "h-11 w-11 text-base";
  return (
    <div className="flex items-center gap-3">
      <button
        onClick={() => onChange(qty - 1)}
        className={`${dims} flex items-center justify-center rounded-full bg-primary font-bold text-white shadow-sm transition-transform active:scale-90 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none`}
        aria-label="Diminuer"
      >
        <svg width="12" height="2" viewBox="0 0 12 2" fill="currentColor"><rect width="12" height="2" rx="1"/></svg>
      </button>
      <span className="min-w-[20px] text-center text-[15px] font-semibold text-ink">{qty}</span>
      <button
        onClick={() => onChange(qty + 1)}
        className={`${dims} flex items-center justify-center rounded-full bg-primary font-bold text-white shadow-sm transition-transform active:scale-90 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none`}
        aria-label="Augmenter"
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor"><path d="M5 0h2v5h5v2H7v5H5V7H0V5h5z"/></svg>
      </button>
    </div>
  );
}

// â”€â”€ Heart / Favorite icon button â”€â”€
export function HeartButton({ active = false, onClick, className = "" }) {
  return (
    <button
      onClick={onClick}
      className={`flex h-11 w-11 items-center justify-center rounded-full ${active ? 'bg-red-50' : 'bg-white'} shadow-sm transition-all duration-300 active:scale-75 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none ${active ? 'animate-pop' : ''} ${className}`}
      aria-label={active ? "Retirer des favoris" : "Ajouter aux favoris"}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill={active ? "#FF3B30" : "none"} stroke={active ? "#FF3B30" : "#9E9E9E"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    </button>
  );
}

// â”€â”€ Star rating â”€â”€
export function StarRating({ value }) {
  return (
    <div className="flex items-center gap-1">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="#FFB800" stroke="none">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
      <span className="text-[12px] font-semibold text-ink">{value}</span>
    </div>
  );
}

// â”€â”€ Price display â”€â”€
export const FCFA = (n) => `${n.toLocaleString("fr-FR")} FCFA`;


