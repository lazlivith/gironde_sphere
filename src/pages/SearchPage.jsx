/* SearchPage.jsx — schéma actuel (popularSearchTags + categories > items) */
import { useState } from "react";
import { useMenu } from "../context/MenuContext";
import { LazyImage,  FCFA  } from "../components/ui/ui";

function ProductThumb({ item }) {
  return item.image ? (
    <LazyImage src={item.image} alt={item.name} className="h-full w-full object-cover" loading="lazy" />
  ) : (
    <span className="text-6xl">{item.emoji || "ðŸ½"}</span>
  );
}

export default function SearchPage({ onOpenItem }) {
  const { menu } = useMenu();
  const allItems = menu.categories.flatMap((c) => c.items);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [searched, setSearched] = useState(false);

  const handleSearch = (q) => {
    const trimmed = q.trim().toLowerCase();
    setQuery(q);
    if (trimmed.length >= 2) {
      setSearched(true);
      setResults(
        allItems.filter(
          (item) =>
            item.name.toLowerCase().includes(trimmed) ||
            item.description?.toLowerCase().includes(trimmed)
        )
      );
    } else {
      setSearched(false);
      setResults([]);
    }
  };

  return (
    <div className="pb-24 overflow-y-auto min-h-screen bg-white">
      {/* Search bar */}
      <div className="px-5 pt-safe pb-4 mt-12 bg-white sticky top-0 z-10">
        <div className="flex items-center gap-3 rounded-2xl bg-surface px-4 py-3">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9E9E9E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
          </svg>
          <input
            type="text"
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Rechercher un plat..."
            className="flex-1 bg-transparent text-[15px] text-ink placeholder-muted outline-none"
            autoFocus
          />
          {query && (
            <button onClick={() => handleSearch("")}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9E9E9E" strokeWidth="2" strokeLinecap="round">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>
          )}
        </div>
      </div>

      {!searched ? (
        <div className="px-5 pt-2">
          <div className="flex flex-wrap gap-2">
            {(menu.popularSearchTags || []).map((tag) => (
              <button
                key={tag}
                onClick={() => handleSearch(tag)}
                className="rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-[13px] font-medium text-primary transition hover:bg-primary hover:text-white"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      ) : results.length === 0 ? (
        <div className="flex flex-col items-center justify-center pt-20 px-8 text-center">
          <span className="text-5xl">ðŸ”</span>
          <p className="mt-4 text-[15px] font-semibold text-ink">Aucun résultat</p>
          <p className="mt-1 text-[13px] text-muted">Essayez un autre mot-clé</p>
        </div>
      ) : (
        <div className="px-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
          {results.map((item) => {
            const displayPrice = item.price ?? item.sizes?.[0]?.price ?? 0;
            return (
              <button
                key={item.id}
                onClick={() => onOpenItem(item)}
                className="w-full text-left rounded-3xl overflow-hidden bg-white shadow-sm ring-1 ring-black/5"
              >
                <div className="h-44 bg-[#FFF5EE] flex items-center justify-center overflow-hidden">
                  <ProductThumb item={item} />
                </div>
                <div className="p-4">
                  <h3 className="font-display text-[16px] font-semibold text-ink">{item.name}</h3>
                  <p className="text-[12px] text-muted mt-0.5 line-clamp-1">{item.description}</p>
                  <div className="mt-2 flex items-center gap-3">
                    <span className="text-[13px] font-semibold text-primary">{FCFA(displayPrice)}</span>
                    <span className="text-muted">â€¢</span>
                    <span className="text-[12px] text-muted">30-50 min</span>
                    <span className="text-muted">â€¢</span>
                    <div className="flex items-center gap-1">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="#FFB800"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                      <span className="text-[12px] font-semibold text-ink">9.2</span>
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}


