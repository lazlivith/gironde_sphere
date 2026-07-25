/* CategoriesPage.jsx â€” schÃ©ma actuel (categories > items imbriquÃ©s) */
import { useState } from "react";
import { useMenu } from "../context/MenuContext";
import { LazyImage,  StatusBar, FCFA  } from "../components/ui/ui";

function ProductThumb({ item }) {
  return item.image ? (
    <LazyImage src={item.image} alt={item.name} className="h-full w-full object-cover transition-transform duration-500 hover:scale-110" loading="lazy" />
  ) : (
    <span className="text-4xl transition-transform duration-500 hover:scale-110">{item.emoji || "ðŸ½"}</span>
  );
}

export default function CategoriesPage({ onOpenItem }) {
  const { menu } = useMenu();
  const allItems = menu.categories.flatMap((c) => c.items);
  const [activeCat, setActiveCat] = useState(null);

  const shownItems = activeCat
    ? menu.categories.find((c) => c.id === activeCat)?.items ?? []
    : allItems;

  const activeLabel = activeCat
    ? menu.categories.find((c) => c.id === activeCat)?.label
    : "Tous les plats";

  return (
    <div className="pb-24 overflow-y-auto min-h-screen bg-surface">
      <StatusBar />

      <div className="px-5 pt-2 pb-4">
        <h1 className="font-display text-[28px] font-bold text-ink">CatÃ©gories</h1>
      </div>

      {/* Category cards */}
      <div className="px-5 mb-5">
        <div className="flex gap-3 overflow-x-auto no-scrollbar -mx-1 px-1 pb-1">
          {/* Tout */}
          <button
            onClick={() => setActiveCat(null)}
            className={`flex-shrink-0 flex flex-col items-center gap-1.5 rounded-2xl px-4 py-3 border-2 transition-all active:scale-95 ${
              activeCat === null ? "bg-primary border-primary text-white" : "bg-white border-gray-200 text-ink"
            }`}
          >
            <span className="text-3xl">ðŸ½</span>
            <span className={`text-[12px] font-semibold ${activeCat === null ? "text-white" : "text-ink"}`}>Tout</span>
            <span className={`text-[11px] ${activeCat === null ? "text-white/80" : "text-muted"}`}>{allItems.length} plats</span>
          </button>

          {menu.categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCat(activeCat === cat.id ? null : cat.id)}
              className={`flex-shrink-0 flex flex-col items-center gap-1.5 rounded-2xl px-4 py-3 border-2 transition-all active:scale-95 ${
                activeCat === cat.id ? "bg-primary border-primary text-white" : "bg-white border-gray-200 text-ink"
              }`}
            >
              <span className="text-3xl">{cat.emoji}</span>
              <span className={`text-[12px] font-semibold ${activeCat === cat.id ? "text-white" : "text-ink"}`}>
                {cat.label}
              </span>
              <span className={`text-[11px] ${activeCat === cat.id ? "text-white/80" : "text-muted"}`}>{cat.items.length} plat{cat.items.length > 1 ? "s" : ""}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Section label */}
      <div className="px-5 mb-3 flex items-center justify-between">
        <h2 className="font-display text-[16px] font-bold text-ink">{activeLabel}</h2>
        <span className="text-[13px] text-muted">{shownItems.length} rÃ©sultat{shownItems.length > 1 ? "s" : ""}</span>
      </div>

      {/* Items list */}
      <div className="px-5 space-y-3">
        {shownItems.map((item, index) => {
          const displayPrice = item.price ?? item.sizes?.[0]?.price ?? 0;
          return (
            <button
              key={item.id}
              onClick={() => onOpenItem(item)}
              className="flex w-full items-center gap-4 text-left rounded-2xl bg-white p-3 shadow-sm ring-1 ring-black/5 transition-transform active:scale-95 hover:shadow-md animate-fade-up"
              style={{ animationDelay: `${Math.min(index * 50, 400)}ms` }}
            >
              <div className="flex-shrink-0 h-20 w-20 rounded-2xl bg-surface overflow-hidden flex items-center justify-center">
                <ProductThumb item={item} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-[14px] font-semibold text-ink leading-tight">{item.name}</p>
                  {item.tag && (
                    <span className={`flex-shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold text-white ${item.tag === 'PROMO' ? 'bg-promo' : 'bg-primary'}`}>
                      {item.tag}
                    </span>
                  )}
                </div>
                <p className="mt-0.5 text-[12px] text-muted line-clamp-2">{item.description}</p>
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-[14px] font-bold text-primary">{FCFA(displayPrice)}</span>
                  {item.originalPrice && (
                    <span className="text-[12px] text-muted line-through">{FCFA(item.originalPrice)}</span>
                  )}
                  <span className="ml-auto flex items-center justify-center h-8 w-8 rounded-full bg-ink text-white hover:bg-primary transition-colors">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}


