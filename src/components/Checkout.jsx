/* Checkout.jsx — schéma actuel (menu.deliveryZones avec id/label) */
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { sendOrderToWhatsApp } from "../services/whatsappService";
import { BackButton, FCFA } from "./ui";
import menu from "../data/menu.json";

const zones = menu.deliveryZones;

export default function Checkout({ onBack }) {
  const { lines, subtotal, clearCart } = useCart();
  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    address: "",
    zoneId: zones[0].id,
  });
  const [error, setError] = useState("");

  const zone = zones.find((z) => z.id === customer.zoneId);
  const total = subtotal + (zone?.fee ?? 0);
  const canSubmit = customer.name.trim() && customer.phone.trim();

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    if (!canSubmit) {
      setError("Merci de renseigner votre nom et votre numéro de téléphone.");
      return;
    }
    setError("");

    // Format attendu par le service WhatsApp
    const cartItems = lines.map((l) => ({
      name: l.name,
      price: l.unitPrice,
      quantity: l.qty,
      selectedIngredients: l.selectedIngredients,
      selectedSize: l.selectedSize,
      selectedOptions: l.selectedOptions,
    }));

    const clientInfo = {
      name: customer.name,
      phone: customer.phone,
      deliveryZone: zone?.label ?? "",
      address: customer.address,
    };

    const summary = {
      subtotal,
      deliveryFee: zone?.fee ?? 0,
      total,
    };

    const restaurantInfo = {
      name: menu.brand,
      whatsappNumber: menu.whatsappNumber,
    };

    sendOrderToWhatsApp(cartItems, clientInfo, summary, restaurantInfo);
    clearCart();
    onBack();
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-14 pb-4">
        <BackButton onClick={onBack} />
        <h2 className="font-display text-[17px] font-semibold text-ink">Livraison</h2>
        <div className="w-9" />
      </div>

      <form onSubmit={handleSubmit} className="px-5 pb-36 space-y-5">
        {/* Nom */}
        <div>
          <label className="mb-1.5 block text-[12px] font-bold uppercase tracking-wide text-muted">Nom complet</label>
          <input
            value={customer.name}
            onChange={(e) => setCustomer((p) => ({ ...p, name: e.target.value }))}
            placeholder="Jean Dupont"
            className="w-full rounded-2xl border-2 border-gray-100 bg-surface px-4 py-3.5 text-[15px] text-ink outline-none focus:border-primary transition"
          />
        </div>

        {/* Téléphone */}
        <div>
          <label className="mb-1.5 block text-[12px] font-bold uppercase tracking-wide text-muted">Téléphone</label>
          <input
            value={customer.phone}
            onChange={(e) => setCustomer((p) => ({ ...p, phone: e.target.value }))}
            placeholder="+242 06 XXX XX XX"
            className="w-full rounded-2xl border-2 border-gray-100 bg-surface px-4 py-3.5 text-[15px] text-ink outline-none focus:border-primary transition"
          />
        </div>

        {/* Adresse précise */}
        <div>
          <label className="mb-1.5 block text-[12px] font-bold uppercase tracking-wide text-muted">
            Adresse précise <span className="normal-case font-normal text-muted">(optionnel)</span>
          </label>
          <input
            value={customer.address}
            onChange={(e) => setCustomer((p) => ({ ...p, address: e.target.value }))}
            placeholder="À côté du marché, maison bleue..."
            className="w-full rounded-2xl border-2 border-gray-100 bg-surface px-4 py-3.5 text-[15px] text-ink outline-none focus:border-primary transition"
          />
        </div>

        {/* Zone */}
        <div>
          <label className="mb-2 block text-[12px] font-bold uppercase tracking-wide text-muted">Quartier</label>
          <div className="space-y-2">
            {zones.map((z) => (
              <button
                key={z.id}
                type="button"
                onClick={() => setCustomer((p) => ({ ...p, zoneId: z.id }))}
                className={`flex w-full items-center justify-between rounded-2xl border-2 px-4 py-3.5 text-[14px] transition ${
                  customer.zoneId === z.id ? "border-primary bg-primary/5" : "border-gray-100 bg-surface"
                }`}
              >
                <span className="font-medium text-ink">{z.label}</span>
                <span className={`font-bold ${customer.zoneId === z.id ? "text-primary" : "text-muted"}`}>
                  {FCFA(z.fee)}
                </span>
              </button>
            ))}
          </div>
        </div>

        {error && (
          <p className="rounded-xl bg-red-50 px-4 py-3 text-[13px] font-medium text-red-500">{error}</p>
        )}

        {/* Récap */}
        <div className="rounded-2xl bg-surface p-4 space-y-2">
          <div className="flex justify-between text-[14px] text-muted">
            <span>Sous-total</span><span>{FCFA(subtotal)}</span>
          </div>
          <div className="flex justify-between text-[14px] text-muted">
            <span>Livraison ({zone?.label})</span><span>{FCFA(zone?.fee ?? 0)}</span>
          </div>
          <div className="flex justify-between border-t border-gray-200 pt-2 font-display text-[16px] font-bold text-ink">
            <span>Total</span><span className="text-primary">{FCFA(total)}</span>
          </div>
        </div>
      </form>

      {/* CTA */}
      <div className="fixed bottom-0 left-1/2 z-50 w-full max-w-[430px] -translate-x-1/2 bg-white px-5 py-4 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
        <button
          onClick={handleSubmit}
          disabled={!canSubmit}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-primary py-4 text-[15px] font-bold text-white shadow-lg shadow-primary/30 transition disabled:opacity-40"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
          </svg>
          Confirmer via WhatsApp — {FCFA(total)}
        </button>
      </div>
    </div>
  );
}
