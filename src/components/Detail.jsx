/* Detail.jsx — Food Details (Glovo Style) */
import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { BackButton, CloseButton, HeartButton, Stepper, FCFA } from "./ui";

export default function Detail({ item, onBack, onAdded }) {
  const { addLine } = useCart();
  const [qty, setQty] = useState(1);
  const [isFav, setIsFav] = useState(false);
  const [selections, setSelections] = useState({});

  // Initialize defaults for 'single' type required groups
  useEffect(() => {
    const initialSelections = {};
    item.optionGroups?.forEach(group => {
      if (group.type === "single" && group.required && group.options?.length > 0) {
        initialSelections[group.id] = group.options[0].id; // default to first
      } else if (group.type === "multiple") {
        initialSelections[group.id] = {}; // empty object for tracking checkboxes
      }
    });
    setSelections(initialSelections);
  }, [item]);

  // Calculate final unit price
  let optionsTotal = 0;
  item.optionGroups?.forEach(group => {
    if (group.type === "single") {
      const selectedId = selections[group.id];
      if (selectedId) {
        const opt = group.options.find(o => o.id === selectedId);
        if (opt) optionsTotal += opt.price || 0;
      }
    } else if (group.type === "multiple") {
      const selectedMap = selections[group.id] || {};
      Object.keys(selectedMap).forEach(optId => {
        if (selectedMap[optId]) {
          const opt = group.options.find(o => o.id === optId);
          if (opt) optionsTotal += opt.price || 0;
        }
      });
    }
  });

  const unitPrice = item.price + optionsTotal;

  // Validation
  let isValid = true;
  item.optionGroups?.forEach(group => {
    if (group.required && group.type === "single" && !selections[group.id]) {
      isValid = false;
    }
  });

  const toggleSingle = (groupId, optionId) => {
    setSelections(prev => ({ ...prev, [groupId]: optionId }));
  };

  const toggleMultiple = (groupId, optionId, max) => {
    setSelections(prev => {
      const groupSelections = prev[groupId] || {};
      const currentlySelectedCount = Object.values(groupSelections).filter(Boolean).length;
      
      const isCurrentlySelected = !!groupSelections[optionId];

      if (!isCurrentlySelected && max && currentlySelectedCount >= max) {
        return prev; // Hit max limit
      }

      return {
        ...prev,
        [groupId]: {
          ...groupSelections,
          [optionId]: !isCurrentlySelected
        }
      };
    });
  };

  const handleAdd = () => {
    if (!isValid) return;

    // Collect meta data for cart description
    const metaParts = [];
    item.optionGroups?.forEach(group => {
      if (group.type === "single") {
        const selectedId = selections[group.id];
        if (selectedId) {
          const opt = group.options.find(o => o.id === selectedId);
          if (opt) metaParts.push(opt.label);
        }
      } else if (group.type === "multiple") {
        const selectedMap = selections[group.id] || {};
        Object.keys(selectedMap).forEach(optId => {
          if (selectedMap[optId]) {
            const opt = group.options.find(o => o.id === optId);
            if (opt) metaParts.push(opt.label);
          }
        });
      }
    });

    addLine({
      name: item.name,
      unitPrice,
      qty,
      meta: metaParts.join(" | ") || undefined,
    });
    onAdded();
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      {/* Full-Bleed Hero Header */}
      <div className="relative w-full h-64 bg-gray-100">
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
          <BackButton onClick={onBack} />
          <HeartButton active={isFav} onClick={() => setIsFav((v) => !v)} />
        </div>
        {item.image ? (
          <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-[#FFF5EE] text-8xl">{item.emoji || "🍽"}</div>
        )}
      </div>

      {/* Basic Info */}
      <div className="bg-white px-5 py-4 border-b border-gray-100 shadow-sm relative z-10">
        <h1 className="font-display text-[22px] font-bold text-ink leading-tight">{item.name}</h1>
        <p className="mt-1 text-[13px] leading-relaxed text-muted">{item.description}</p>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="font-display text-[20px] font-bold text-primary">{FCFA(item.price)}</span>
        </div>
      </div>

      {/* Option Groups (Glovo Style) */}
      <div className="pb-36 mt-2 space-y-2">
        {item.optionGroups?.map(group => {
          if (group.type === "single") {
            return (
              <div key={group.id} className="bg-white px-5 py-4 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-display text-[16px] font-bold text-ink">{group.title}</h3>
                  {group.required && <span className="bg-gray-100 text-gray-500 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide">Obligatoire</span>}
                </div>
                <div className="space-y-3">
                  {group.options.map(opt => {
                    const selected = selections[group.id] === opt.id;
                    return (
                      <button
                        key={opt.id}
                        onClick={() => toggleSingle(group.id, opt.id)}
                        className="flex w-full items-center justify-between group"
                      >
                        <div className="flex items-center gap-3">
                          <div className={`flex items-center justify-center w-6 h-6 rounded-full border-2 transition-colors ${selected ? "border-primary bg-primary" : "border-gray-300"}`}>
                            {selected && <div className="w-2 h-2 rounded-full bg-white" />}
                          </div>
                          <span className="text-[15px] font-medium text-ink">{opt.label}</span>
                        </div>
                        {opt.price > 0 && <span className="text-[14px] text-muted font-medium">+{FCFA(opt.price)}</span>}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          } else if (group.type === "multiple") {
            const selectedCount = Object.values(selections[group.id] || {}).filter(Boolean).length;
            return (
              <div key={group.id} className="bg-white px-5 py-4 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-display text-[16px] font-bold text-ink">{group.title}</h3>
                    {group.max && <p className="text-[11px] text-muted mt-0.5">Choisis jusqu'à {group.max} options</p>}
                  </div>
                  {group.max && <span className="text-[11px] font-bold text-primary bg-primary/10 px-2 py-1 rounded">{selectedCount}/{group.max}</span>}
                </div>
                <div className="space-y-3">
                  {group.options.map(opt => {
                    const selected = !!(selections[group.id] && selections[group.id][opt.id]);
                    const disabled = !selected && group.max && selectedCount >= group.max;
                    return (
                      <button
                        key={opt.id}
                        onClick={() => toggleMultiple(group.id, opt.id, group.max)}
                        disabled={disabled}
                        className={`flex w-full items-center justify-between group ${disabled ? "opacity-50" : ""}`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`flex items-center justify-center w-6 h-6 rounded shadow-sm border-2 transition-colors ${selected ? "border-primary bg-primary" : "border-gray-300 bg-white"}`}>
                            {selected && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>}
                          </div>
                          <span className="text-[15px] font-medium text-ink">{opt.label}</span>
                        </div>
                        {opt.price > 0 && <span className="text-[14px] text-muted font-medium">+{FCFA(opt.price)}</span>}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          }
          return null;
        })}
      </div>

      {/* Sticky Bottom Bar */}
      <div className="fixed bottom-[68px] left-0 right-0 z-40 flex w-full items-center gap-3 bg-white px-5 py-3 shadow-[0_-10px_30px_rgba(0,0,0,0.06)] border-t border-gray-100">
        <Stepper qty={qty} onChange={(v) => setQty(Math.max(1, v))} />
        <button
          onClick={handleAdd}
          disabled={!isValid}
          className="flex-1 flex items-center justify-between rounded-2xl bg-primary px-5 py-3.5 text-[15px] font-bold text-white shadow-lg shadow-primary/30 transition-all active:scale-95 disabled:opacity-50 disabled:active:scale-100"
        >
          <span>Ajouter</span>
          <span>{FCFA(unitPrice * qty)}</span>
        </button>
      </div>
    </div>
  );
}
