/* OrderScreen.jsx — schéma actuel (menu.recommendations) */
import { useCart } from "../context/CartContext";
import menu from "../data/menu.json";
import { BackButton, FCFA } from "./ui";

const RECO = menu.recommendations || [];

export default function OrderScreen({ onBack, onCheckout }) {
  const { lines, updateQty, removeLine, subtotal } = useCart();

  return (
    <div className="min-h-screen bg-white">
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

        {/* Recommandations */}
        {RECO.length > 0 && (
          <div className="mt-8">
            <h3 className="font-display text-[16px] font-bold text-ink mb-3">Recommandations</h3>
            <div className="flex gap-3 overflow-x-auto no-scrollbar -mx-1 px-1">
              {RECO.map((rec) => (
                <div key={rec.id} className="flex-shrink-0 w-28 rounded-2xl overflow-hidden bg-[#FFF5EE] relative">
                  <div className="h-24 flex items-center justify-center">
                    <span className="text-4xl">{rec.emoji}</span>
                  </div>
                  <button className="absolute top-2 right-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white">
                    <svg width="10" height="10" viewBox="0 0 12 12" fill="currentColor"><path d="M5 0h2v5h5v2H7v5H5V7H0V5h5z"/></svg>
                  </button>
                  <div className="bg-white px-2 py-2">
                    <p className="text-[11px] font-semibold text-ink truncate">{rec.name}</p>
                    <p className="text-[12px] font-bold text-primary">{FCFA(rec.price)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {lines.length > 0 && (
        <div className="fixed bottom-0 left-1/2 z-50 w-full max-w-[430px] -translate-x-1/2 bg-white px-5 py-4 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
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
