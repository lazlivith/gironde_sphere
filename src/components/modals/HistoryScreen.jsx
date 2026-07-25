import { useState, useEffect } from "react";
import { useCart } from "../../context/CartContext";
import { BackButton, FCFA } from "../ui/ui";

export default function HistoryScreen({ onBack, onReorder }) {
  const { setCartFromHistory } = useCart();
  const [history, setHistory] = useState([]);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("songolo_history") || "[]");
      setHistory(saved);
    } catch (e) {
      console.warn("Failed to load history");
    }
  }, []);

  const handleReorder = (order) => {
    setCartFromHistory(order.cartLines);
    onReorder();
  };

  const formatDate = (isoString) => {
    const d = new Date(isoString);
    return new Intl.DateTimeFormat("fr-FR", {
      day: "2-digit",
      month: "long",
      hour: "2-digit",
      minute: "2-digit",
    }).format(d).replace(":", "h");
  };

  return (
    <div className="flex-1 overflow-y-auto bg-white">
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-14 pb-4 bg-white sticky top-0 z-10 border-b border-gray-100">
        <BackButton onClick={onBack} />
        <h2 className="font-display text-[17px] font-semibold text-ink">Mes Commandes</h2>
        <div className="w-9" />
      </div>

      <div className="px-5 py-6 space-y-4 pb-24">
        {history.length === 0 ? (
          <div className="text-center py-20 text-muted">
            <span className="text-5xl block mb-4">🛒</span>
            <p>Aucune commande passée.</p>
          </div>
        ) : (
          history.map((order) => (
            <div key={order.id} className="rounded-3xl border border-gray-100 bg-surface p-5 shadow-sm animate-fade-up">
              <div className="flex justify-between items-start mb-3 border-b border-gray-200 pb-3">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wide text-muted">Date</span>
                  <p className="text-[14px] font-semibold text-ink mt-0.5 capitalize">{formatDate(order.date)}</p>
                </div>
                <div className="text-right">
                  <span className="text-[11px] font-bold uppercase tracking-wide text-muted">Total</span>
                  <p className="text-[15px] font-bold text-primary mt-0.5">{FCFA(order.summary.total)}</p>
                </div>
              </div>
              <div className="space-y-1.5 mb-4">
                {order.cartLines.map((line, idx) => (
                  <div key={idx} className="flex gap-2 text-[13px] text-muted">
                    <span className="font-semibold text-ink">{line.qty}x</span>
                    <span className="truncate">{line.name}</span>
                  </div>
                ))}
              </div>
              <button
                onClick={() => handleReorder(order)}
                className="w-full flex items-center justify-center gap-2 rounded-2xl bg-ink py-3.5 text-[14px] font-bold text-white transition active:scale-95 shadow-md shadow-ink/20"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="1 4 1 10 7 10"></polyline>
                  <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"></path>
                </svg>
                Commander à nouveau
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
