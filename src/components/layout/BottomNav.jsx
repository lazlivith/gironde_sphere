/* BottomNav.jsx — 4 tabs: Discover, Categories, Search, Favorite */
const NAV_ITEMS = [
  {
    id: "discover",
    label: "Découvrir",
    icon: (active) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? "#FF6B2C" : "#9E9E9E"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" fill={active ? "#FF6B2C" : "none"}/>
      </svg>
    ),
  },
  {
    id: "categories",
    label: "Catégories",
    icon: (active) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? "#FF6B2C" : "#9E9E9E"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1" fill={active ? "#FFF0E8" : "none"}/>
        <rect x="14" y="3" width="7" height="7" rx="1" fill={active ? "#FFF0E8" : "none"}/>
        <rect x="3" y="14" width="7" height="7" rx="1" fill={active ? "#FFF0E8" : "none"}/>
        <rect x="14" y="14" width="7" height="7" rx="1" fill={active ? "#FFF0E8" : "none"}/>
      </svg>
    ),
  },
  {
    id: "search",
    label: "Recherche",
    icon: (active) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? "#FF6B2C" : "#9E9E9E"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"/>
        <path d="M21 21l-4.35-4.35"/>
      </svg>
    ),
  },
  {
    id: "promos",
    label: "Promos",
    icon: (active) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? "#FF6B2C" : "none"} stroke={active ? "#FF6B2C" : "#9E9E9E"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 12V22H4V12"/>
        <path d="M22 7H2v5h20V7z"/>
        <path d="M12 22V7"/>
        <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/>
        <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/>
      </svg>
    ),
  },
];

export default function BottomNav({ active, onNavigate }) {
  return (
    <nav aria-label="Navigation principale" className="fixed bottom-0 left-0 right-0 z-50 flex w-full items-center justify-around border-t border-gray-100 bg-white px-2 py-2 pb-safe shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
      {NAV_ITEMS.map((item) => {
        const isActive = active === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            aria-label={item.label}
            className="flex flex-col items-center gap-1 px-3 py-1 rounded-xl focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
          >
            {item.icon(isActive)}
            <span
              className={`text-[10px] font-medium leading-none ${
                isActive ? "text-primary font-semibold" : "text-muted"
              }`}
            >
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
