/* PromoPage.jsx — Section Promotions, Formules, Vidéos */
import { useState } from "react";
import menu from "../data/menu.json";
import { StatusBar, FCFA } from "./ui";

const allItems = menu.categories.flatMap((c) => c.items);
const formulesCategory = menu.categories.find(c => c.id === "formules")?.items || [];

function ProductThumb({ item }) {
  return item.image ? (
    <img src={item.image} alt={item.name} className="h-full w-full object-cover" loading="lazy" />
  ) : (
    <span className="text-4xl">{item.emoji || "🍽"}</span>
  );
}

export default function PromoPage({ onOpenItem }) {
  const [activeTab, setActiveTab] = useState("offres");

  // On crée quelques promos basées sur les items existants si on n'a pas de champ originalPrice
  const promoItems = allItems.slice(0, 3).map(item => ({
    ...item,
    originalPrice: item.price + 500 // Mock a discount
  }));

  // Filtres pour jus et crêpes
  const jusItems = allItems.filter(item => item.id.includes("jus") || item.emoji === "🥤" || item.emoji === "🍋" || item.id.includes("cocktail"));
  const crepesItems = allItems.filter(item => item.id.includes("crepe") || item.emoji === "🥞");

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
              À La Une
            </span>
            <h2 className="font-display text-[22px] font-bold text-white leading-tight drop-shadow-md">Nouveautés Songolo</h2>
            <p className="text-[13px] text-white/90 mt-1 font-medium drop-shadow-md">Découvrez nos formules explosives</p>
          </div>
        </div>
      </div>

      {/* Horizontal Tabs */}
      <div className="px-5 mb-6">
        <div className="flex gap-2.5 overflow-x-auto no-scrollbar -mx-1 px-1">
          {["offres", "formules", "jus", "crêpes"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-shrink-0 rounded-2xl px-5 py-3 text-[14px] font-bold capitalize transition-all active:scale-95 ${
                activeTab === tab 
                  ? "bg-ink text-white shadow-lg" 
                  : "bg-white border border-gray-100 text-muted shadow-sm hover:border-gray-200"
              }`}
            >
              {tab === "offres" ? "Promos 🔥" : tab}
            </button>
          ))}
        </div>
      </div>

      {/* Dynamic Content */}
      <div className="px-5 space-y-4">
        {activeTab === "offres" && (
          promoItems.map(item => (
            <button
              key={item.id}
              onClick={() => onOpenItem(item)}
              className="flex w-full items-center gap-4 text-left rounded-3xl bg-white p-3.5 shadow-sm ring-1 ring-red-500/20 relative overflow-hidden transition-all active:scale-95"
            >
              <div className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold px-3 py-1 rounded-bl-2xl">
                PROMO
              </div>
              <div className="flex-shrink-0 h-24 w-24 rounded-2xl bg-[#FFF5EE] overflow-hidden flex items-center justify-center shadow-inner">
                <ProductThumb item={item} />
              </div>
              <div className="flex-1 min-w-0 pt-1 pb-1">
                <p className="text-[16px] font-bold text-ink leading-tight truncate">{item.name}</p>
                <p className="mt-1 text-[13px] text-muted line-clamp-2 leading-relaxed">{item.description}</p>
                <div className="mt-2.5 flex items-baseline gap-2">
                  <span className="text-[16px] font-black text-red-600">{FCFA(item.price)}</span>
                  <span className="text-[13px] text-muted font-medium line-through">{FCFA(item.originalPrice)}</span>
                </div>
              </div>
            </button>
          ))
        )}

        {activeTab === "formules" && (
          formulesCategory.map(item => (
            <button
              key={item.id}
              onClick={() => onOpenItem(item)}
              className="flex w-full items-center gap-4 text-left rounded-3xl bg-white p-3.5 shadow-sm ring-1 ring-primary/20 transition-all active:scale-95 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 bg-primary/10 text-primary text-[10px] font-bold px-3 py-1 rounded-bl-2xl">
                MENU
              </div>
              <div className="flex-shrink-0 h-24 w-24 rounded-2xl bg-[#FFF5EE] overflow-hidden flex items-center justify-center shadow-inner">
                <ProductThumb item={item} />
              </div>
              <div className="flex-1 min-w-0 pt-1 pb-1">
                <p className="text-[16px] font-bold text-ink leading-tight truncate">{item.name}</p>
                <p className="mt-1 text-[13px] text-muted line-clamp-2 leading-relaxed">{item.description}</p>
                <div className="mt-2.5 flex items-baseline gap-2">
                  <span className="text-[16px] font-black text-primary">{FCFA(item.price)}</span>
                </div>
              </div>
            </button>
          ))
        )}

        {(activeTab === "jus" ? jusItems : activeTab === "crêpes" ? crepesItems : []).map(item => (
          <button
            key={item.id}
            onClick={() => onOpenItem(item)}
            className="flex w-full items-center gap-4 text-left rounded-3xl bg-white p-3.5 shadow-[0_2px_10px_rgba(0,0,0,0.02)] ring-1 ring-black/5 transition-all active:scale-95"
          >
            <div className="flex-shrink-0 h-20 w-20 rounded-2xl bg-[#F9F9F9] overflow-hidden flex items-center justify-center">
              <ProductThumb item={item} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[15px] font-bold text-ink leading-tight truncate">{item.name}</p>
              <p className="mt-1 text-[12px] text-muted line-clamp-1">{item.description}</p>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-[15px] font-bold text-ink">{FCFA(item.price)}</span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
