/* ProfilePage.jsx — User profile with menu list (Figma faithful) */
const MENU_ITEMS = [
  {
    id: "my-profile",
    label: "Mon Profil",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FF6B2C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
        <circle cx="12" cy="7" r="4"/>
      </svg>
    ),
  },
  {
    id: "my-orders",
    label: "Mes Commandes",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FF6B2C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
        <line x1="3" y1="6" x2="21" y2="6"/>
        <path d="M16 10a4 4 0 0 1-8 0"/>
      </svg>
    ),
  },
  {
    id: "delivery-address",
    label: "Adresse de livraison",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FF6B2C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
        <circle cx="12" cy="10" r="3"/>
      </svg>
    ),
  },
  {
    id: "payment",
    label: "Moyens de paiement",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FF6B2C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
        <line x1="1" y1="10" x2="23" y2="10"/>
      </svg>
    ),
  },
  {
    id: "contact",
    label: "Nous contacter",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FF6B2C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
  },
  {
    id: "settings",
    label: "Paramètres",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FF6B2C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3"/>
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14M12 2a10 10 0 0 1 10 10M4.93 19.07a10 10 0 0 1 0-14.14M12 22a10 10 0 0 1-10-10"/>
      </svg>
    ),
  },
  {
    id: "help",
    label: "Aide & FAQ",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FF6B2C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
        <line x1="12" y1="17" x2="12.01" y2="17"/>
      </svg>
    ),
  },
];

export default function ProfilePage() {
  return (
    <div className="pb-24 overflow-y-auto min-h-screen bg-white">
      {/* Profile header */}
      <div className="flex flex-col items-center pt-14 pb-6 px-5">
        {/* Avatar */}
        <div className="relative mb-4">
          <div className="h-20 w-20 rounded-full bg-orange-100 border-4 border-primary flex items-center justify-center overflow-hidden">
            <span className="text-5xl">👤</span>
          </div>
          <button className="absolute bottom-0 right-0 flex h-6 w-6 items-center justify-center rounded-full bg-primary">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="white">
              <path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
        <h2 className="font-display text-[20px] font-bold text-ink">Katty Berry</h2>
        <p className="text-[13px] text-muted mt-0.5">kattyberry@gmail.com</p>
      </div>

      {/* Menu items */}
      <div className="px-5 space-y-1">
        {MENU_ITEMS.map((item) => (
          <button
            key={item.id}
            className="flex w-full items-center gap-4 rounded-2xl px-4 py-3.5 text-left hover:bg-surface transition-colors"
          >
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
              {item.icon}
            </div>
            <span className="text-[15px] font-medium text-ink">{item.label}</span>
            <svg className="ml-auto" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9E9E9E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </button>
        ))}

        {/* Logout */}
        <div className="pt-4">
          <button className="flex w-full items-center justify-center gap-2 rounded-full border-2 border-primary py-3 text-[15px] font-semibold text-primary transition hover:bg-primary hover:text-white">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
              <polyline points="16 17 21 12 16 7"/>
              <line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
            Se déconnecter
          </button>
        </div>
      </div>
    </div>
  );
}
