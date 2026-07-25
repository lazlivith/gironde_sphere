/* PromoPage.jsx â€” Section Promotions, Formules, VidÃ©os */
import { useState } from "react";
import { useMenu } from "../context/MenuContext";
import { LazyImage,  StatusBar, FCFA  } from "../components/ui/ui";

function ProductThumb({ item }) {
  return item.image ? (
    <LazyImage src={item.image} alt={item.name} className="h-full w-full object-cover" loading="lazy" />
  ) : (
    <span className="text-4xl">{item.emoji || "ðŸ½"}</span>
  );
}

export default function PromoPage({ onOpenItem }) {
  const { menu } = useMenu();
  const allItems = menu.categories.flatMap((c) => c.items);
  const formulesCategory = menu.categories.find(c => c.id === "formules")?.items || [];
  const promoTabs = menu.promoTabs || [];
  const defaultTab = promoTabs.length > 0 ? promoTabs[0].id : "";
  const [activeTab, setActiveTab] = useState(defaultTab);

  // Vraies promotions : articles avec un originalPrice dÃ©fini et supÃ©rieur au price
  const realPromoItems = allItems.filter(item => item.originalPrice && item.originalPrice > item.price);

  return (
    <div className="pb-24 overflow-y-auto min-h-screen bg-[#F9F9F9]">
      <StatusBar />

      {/* Header */}
      <div className="px-5 pt-2 pb-4">
        <h1 className="font-display text-[28px] font-bold text-ink leading-tight">Nos Offres<br/>& Promos</h1>
      </div>

      {/* Featured Video Banner */}
      <div className="px-5 mb-6">
        <div className="relative h-56 w-full rounded-3xl overflow-hidden shadow-xl bg-black animate-fade-up">
          <video 
            src="/assets/promos/promo-banner.mp4" 
            poster="/assets/promos/promo-banner-poster.png"
            autoPlay 
            loop 
            muted 
            playsInline 
            className="w-full h-full object-cover opacity-80"
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none"></div>
          
          <div className="absolute bottom-5 left-5 right-5 pointer-events-none">
            <span className="inline-block rounded-full bg-red-500 px-3 py-1 text-[11px] font-bold text-white mb-2 shadow-lg shadow-red-500/30 uppercase tracking-wider">
              Ã€ La Une
            </span>
            <h2 className="font-display text-[22px] font-bold text-white leading-tight drop-shadow-md">NouveautÃ©s Songolo</h2>
            <p className="text-[13px] text-white/90 mt-1 font-medium drop-shadow-md">DÃ©couvrez nos formules explosives</p>
          </div>
        </div>
      </div>

      {/* Horizontal Tabs */}
      <div className="px-5 mb-6">
        <div className="flex gap-2.5 overflow-x-auto no-scrollbar -mx-1 px-1">
          {promoTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-shrink-0 rounded-2xl px-5 py-3 text-[14px] font-bold transition-all active:scale-95 ${
                activeTab === tab.id 
                  ? "bg-ink text-white shadow-lg" 
                  : "bg-white border border-gray-100 text-muted shadow-sm hover:border-gray-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Dynamic Content */}
      <div className="px-5 space-y-4">
        {(() => {
          const tabConfig = promoTabs.find(t => t.id === activeTab);
          if (!tabConfig) return null;

          let itemsToDisplay = [];
          if (tabConfig.type === "promo") {
            itemsToDisplay = realPromoItems;
          } else if (tabConfig.type === "category") {
            itemsToDisplay = menu.categories.find(c => c.id === tabConfig.categoryId)?.items || [];
          }

          if (itemsToDisplay.length === 0) {
            return (
              <div className="py-12 text-center text-muted">
                <p>Aucun article disponible pour le moment.</p>
              </div>
            );
          }

          return itemsToDisplay.map(item => (
            <button
              key={item.id}
              onClick={() => onOpenItem(item)}
              className={`flex w-full items-center gap-4 text-left rounded-3xl bg-white p-3.5 shadow-sm transition-all active:scale-95 relative overflow-hidden ${
                tabConfig.type === "promo" ? "ring-1 ring-red-500/20" : "ring-1 ring-primary/20"
              }`}
            >
              {tabConfig.type === "promo" && (
                <div className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold px-3 py-1 rounded-bl-2xl">
                  PROMO
                </div>
              )}
              {tabConfig.type === "category" && (
                <div className="absolute top-0 right-0 bg-primary/10 text-primary text-[10px] font-bold px-3 py-1 rounded-bl-2xl uppercase">
                  {tabConfig.label}
                </div>
              )}
              <div className="flex-shrink-0 h-24 w-24 rounded-2xl bg-[#FFF5EE] overflow-hidden flex items-center justify-center shadow-inner">
                <ProductThumb item={item} />
              </div>
              <div className="flex-1 min-w-0 pt-1 pb-1">
                <p className="text-[16px] font-bold text-ink leading-tight truncate">{item.name}</p>
                <p className="mt-1 text-[13px] text-muted line-clamp-2 leading-relaxed">{item.description}</p>
                <div className="mt-2.5 flex items-center justify-between gap-2">
                  <div className="flex items-baseline gap-2">
                    <span className={`text-[16px] font-black ${tabConfig.type === "promo" ? "text-red-600" : "text-primary"}`}>
                      {FCFA(item.price)}
                    </span>
                    {item.originalPrice && (
                      <span className="text-[13px] text-muted font-medium line-through">
                        {FCFA(item.originalPrice)}
                      </span>
                    )}
                  </div>
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ink text-white">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                  </span>
                </div>
              </div>
            </button>
          ));
        })()}
      </div>
    </div>
  );
}


