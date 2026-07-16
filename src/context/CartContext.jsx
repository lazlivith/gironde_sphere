import { createContext, useContext, useState, useMemo, useCallback, useEffect } from "react";

const CartContext = createContext(null);

// Each cart line looks like:
// { lineId, name, unitPrice, qty, meta } where meta holds e.g. selected fruits/size

export function CartProvider({ children }) {
  const [lines, setLines] = useState(() => {
    try {
      const saved = localStorage.getItem("songolo_cart");
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("songolo_cart", JSON.stringify(lines));
  }, [lines]);

  const addLine = useCallback((line) => {
    setLines((prev) => [...prev, { ...line, lineId: crypto.randomUUID(), qty: line.qty || 1 }]);
  }, []);

  const updateQty = useCallback((lineId, qty) => {
    setLines((prev) =>
      qty <= 0
        ? prev.filter((l) => l.lineId !== lineId)
        : prev.map((l) => (l.lineId === lineId ? { ...l, qty } : l))
    );
  }, []);

  const removeLine = useCallback((lineId) => {
    setLines((prev) => prev.filter((l) => l.lineId !== lineId));
  }, []);

  const clearCart = useCallback(() => setLines([]), []);

  const subtotal = useMemo(
    () => lines.reduce((sum, l) => sum + l.unitPrice * l.qty, 0),
    [lines]
  );

  const itemCount = useMemo(() => lines.reduce((sum, l) => sum + l.qty, 0), [lines]);

  const value = { lines, addLine, updateQty, removeLine, clearCart, subtotal, itemCount };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
