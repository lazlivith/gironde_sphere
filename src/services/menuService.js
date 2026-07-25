import Papa from 'papaparse';
import staticMenu from '../data/menu.json';

const CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQZzKmXZuS333ca9LKuSPPwTe0wVm5N7PEYGxltFsUSottI1laZm8MwRtAqLO7IDjLz70JI5fczzSXO/pub?gid=0&single=true&output=csv';

/**
 * Format Google Drive image links for direct display
 */
const formatImageUrl = (url) => {
  if (!url) return '';
  if (url.includes('drive.google.com')) {
    const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
    if (match && match[1]) {
      return `https://drive.google.com/uc?export=view&id=${match[1]}`;
    }
  }
  return url;
};

export const fetchMenuFromSheets = async () => {
  return new Promise((resolve, reject) => {
    const noCacheUrl = `${CSV_URL}&t=${new Date().getTime()}`;
    Papa.parse(noCacheUrl, {
      download: true,
      header: true,
      skipEmptyLines: true,
      transformHeader: (h) => h.trim(),
      complete: (results) => {
        try {
          const rows = results.data;
          
          // Deep copy the static menu to avoid mutating the imported JSON object directly
          const mergedMenu = JSON.parse(JSON.stringify(staticMenu));

          rows.forEach(row => {
            const isAvailable = row.disponible && row.disponible.trim().toUpperCase() === 'OUI';
            const isPromo = row.en_promo && row.en_promo.trim().toUpperCase() === 'OUI';
            
            const cleanNumber = (val) => parseInt(String(val || '').replace(/\s+/g, ''), 10) || 0;
            const price = cleanNumber(row.prix);
            const promoPrice = cleanNumber(row.prix_promo);

            // If it's a promo but no valid promo price is set, just use normal price
            const finalPromoPrice = promoPrice > 0 ? promoPrice : price;
            // Only show crossed out price if the promo price is actually lower
            const hasDiscount = isPromo && finalPromoPrice < price;

            const item = {
              id: row.id,
              name: row.nom,
              description: row.description,
              price: isPromo ? finalPromoPrice : price,
              originalPrice: hasDiscount ? price : undefined,
              image: formatImageUrl(row.url_image),
              type: row.type || 'simple',
              emoji: '🍽️',
              tag: isPromo ? 'PROMO' : undefined,
            };

            const categoryId = (row.categorie || '').toLowerCase();
            
            // Find existing category or create a fallback one
            let category = mergedMenu.categories.find(c => c.id.toLowerCase() === categoryId);
            if (!category) {
              category = mergedMenu.categories.find(c => c.id === 'autres');
              if (!category) {
                category = { id: 'autres', label: 'Autres', items: [], count: '' };
                mergedMenu.categories.push(category);
              }
            }

            // Find if item already exists in this category
            const existingItemIndex = category.items.findIndex(i => i.id === item.id);
            
            if (!isAvailable) {
              // If marked as unavailable in Sheets, remove it if it exists
              if (existingItemIndex >= 0) {
                category.items.splice(existingItemIndex, 1);
              }
            } else {
              if (existingItemIndex >= 0) {
                // Update existing item while preserving its optionGroups and other static metadata
                category.items[existingItemIndex] = {
                  ...category.items[existingItemIndex],
                  ...item,
                  // Keep the original image/emoji if the sheet doesn't provide one
                  image: item.image || category.items[existingItemIndex].image,
                };
              } else {
                // Add new item
                category.items.push(item);
              }
            }
          });

          // Update counts
          mergedMenu.categories.forEach(cat => {
            cat.count = `${cat.items.length} plats`;
          });

          // Remove empty categories
          mergedMenu.categories = mergedMenu.categories.filter(cat => cat.items.length > 0);

          resolve(mergedMenu);
        } catch (error) {
          console.error("Error processing Sheets data:", error);
          reject(error);
        }
      },
      error: (error) => {
        console.error("PapaParse error:", error);
        reject(error);
      }
    });
  });
};
