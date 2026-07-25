/* OrderScreen.jsx — schéma actuel (menu.recommendations) */
import { useCart } from "../context/CartContext";
import { useMenu } from "../context/MenuContext";
import { BackButton, FCFA } from "./ui";

export default function OrderScreen({ onBack, onCheckout }) {
  const { menu } = useMenu();
  const allItems = menu.categories.flatMap((c) => c.items);
  const { lines, addLine, updateQty, removeLine, subtotal } = useCart();

  // Dérivation des suggestions "Upsell" (Ventes croisées)
  const cartNames = new Set(lines.map(l => l.name));
  const upsellCandidates = allItems.filter(item => {
    // On sélectionne des articles peu coûteux (<= 2500 FCFA), avec un prix fixe, non présents dans le panier
    return item.price && item.price <= 2500 && !cartNames.has(item.name);
  });

  // On en prend 3 aléatoirement
  const suggestions = [...upsellCandidates].sort(() => 0.5 - Math.random()).slice(0, 3);

  return (
    <div className="flex flex-col h-full w-full bg-white">
      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto pb-8">
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-14 pb-4">
        <BackButton onClick={onBack} />
        <h2 className="font-display text-[17px] font-semibold text-ink">Votre commande</h2>
        <div className="w-9" />
      </div>

      <div className="px-5 pb-44 overflow-y-auto">
        <h3 className="font-display text-[16px] font-bold text-ink mb-3">Articles commandés</h3>

        {lines.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <span className="text-5xl">🛒</span>
            <p className="mt-4 text-[15px] font-semibold text-ink">Votre commande est vide</p>
            <p className="mt-1 text-[13px] text-muted">Ajoutez des plats depuis le menu</p>
            <button onClick={onBack} className="mt-6 rounded-full bg-primary px-6 py-3 text-[14px] font-bold text-white">
              Parcourir le menu
            </button>
          </div>
        ) : (
          <>
            <div className="space-y-4">
              {lines.map((line) => (
                <div key={line.lineId} className="flex items-center gap-4">
                  <div className="flex-shrink-0 h-16 w-16 rounded-2xl bg-[#FFF5EE] flex items-center justify-center">
                    <span className="text-3xl">🍽</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[14px] font-semibold text-ink truncate">{line.name}</p>
                    {line.meta && (
                      <p className="text-[12px] text-muted mt-0.5 line-clamp-1">+ {line.meta}</p>
                    )}
                    <p className="mt-1 text-[14px] font-bold text-ink">{FCFA(line.unitPrice * line.qty)}</p>
                  </div>
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    {line.qty === 1 ? (
                      <button
                        onClick={() => removeLine(line.lineId)}
                        className="flex h-7 w-7 items-center justify-center rounded-full bg-red-100 text-red-500 transition-transform active:scale-90"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        </svg>
                      </button>
                    ) : (
                      <button
                        onClick={() => updateQty(line.lineId, line.qty - 1)}
                        className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-white text-sm font-bold transition-transform active:scale-90"
                      >−</button>
                    )}
                    <span className="w-5 text-center text-[13px] font-semibold text-ink">{line.qty}</span>
                    <button
                      onClick={() => updateQty(line.lineId, line.qty + 1)}
                      className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-white text-sm font-bold transition-transform active:scale-90"
                    >+</button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">
              <span className="font-display text-[16px] font-bold text-ink">Total</span>
              <span className="font-display text-[16px] font-bold text-primary">{FCFA(subtotal)}</span>
            </div>
          </>
        )}

        {/* Upsell / Complétez votre repas */}
        {lines.length > 0 && suggestions.length > 0 && (
          <div className="mt-8 animate-fade-up">
            <h3 className="font-display text-[16px] font-bold text-ink mb-3">Complétez votre repas ! 🍟🥤</h3>
            <div className="flex gap-3 overflow-x-auto no-scrollbar -mx-1 px-1">
              {suggestions.map((rec) => (
                <div key={rec.id} className="flex-shrink-0 w-32 rounded-2xl overflow-hidden bg-white shadow-sm border border-gray-100 relative transition-transform active:scale-95">
                  <div className="h-24 bg-[#FFF5EE] flex items-center justify-center">
                    {rec.image ? (
                      <img src={rec.image} alt={rec.name} className="h-full w-full object-cover" />
                    ) : (
                      <span className="text-4xl">{rec.emoji || "🍽"}</span>
                    )}
                  </div>
                  <button 
                    onClick={() => addLine({ name: rec.name, unitPrice: rec.price, qty: 1 })}
                    className="absolute top-2 right-2 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-white shadow-md"
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor"><path d="M5 0h2v5h5v2H7v5H5V7H0V5h5z"/></svg>
                  </button>
                  <div className="px-2.5 py-2.5">
                    <p className="text-[12px] font-semibold text-ink truncate">{rec.name}</p>
                    <p className="text-[13px] font-bold text-primary mt-0.5">{FCFA(rec.price)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {lines.length > 0 && (
        <div className="flex-shrink-0 w-full bg-white px-5 py-4 shadow-[0_-10px_30px_rgba(0,0,0,0.06)] border-t border-gray-100 z-40">
          <button
            onClick={onCheckout}
            className="flex w-full items-center justify-between rounded-full bg-primary px-6 py-4 text-[15px] font-bold text-white shadow-lg shadow-primary/30"
          >
            <span>Valider la commande</span>
            <span className="rounded-full bg-white/20 px-3 py-1 text-[14px]">{FCFA(subtotal)}</span>
          </button>
        </div>
      )}
    </div>
  );
}
