export const sendOrderToWhatsApp = (cartItems, clientInfo, summary, restaurantInfo) => {
  const whatsappNumber = restaurantInfo?.whatsappNumber || "242060000000";

  let message = `🔔 *NOUVELLE COMMANDE - SONGOLO FAST-FOOD*\n`;
  message += `----------------------------------------\n`;
  message += `👤 *Client :* ${clientInfo.name}\n`;
  message += `📞 *Tél :* ${clientInfo.phone}\n`;
  message += `📍 *Quartier :* ${clientInfo.deliveryZone}\n`;
  message += `🏠 *Détails adresse :* ${clientInfo.address || "Non spécifié"}\n`;
  message += `----------------------------------------\n\n`;

  message += `🛒 *DÉTAIL DU PANIER :*\n`;

  cartItems.forEach((item) => {
    const itemPrice = item.price * item.quantity;
    message += `• *${item.quantity}x ${item.name}* (${item.price} FCFA)\n`;

    // Jus sur mesure — fruits sélectionnés
    if (item.selectedIngredients && item.selectedIngredients.length > 0) {
      message += `   └ _Fruits : ${item.selectedIngredients.join(", ")}_\n`;
    }

    // Taille sélectionnée
    if (item.selectedSize) {
      message += `   └ _Taille : ${item.selectedSize}_\n`;
    }

    // Options / suppléments
    if (item.selectedOptions && item.selectedOptions.length > 0) {
      const optionsStr = item.selectedOptions.map((opt) => opt.name).join(", ");
      message += `   └ _Options : ${optionsStr}_\n`;
    }

    message += `   *Sous-total :* ${itemPrice} FCFA\n\n`;
  });

  message += `----------------------------------------\n`;
  message += `💵 *Sous-total :* ${summary.subtotal} FCFA\n`;
  message += `🛵 *Livraison [${clientInfo.deliveryZone}] :* ${summary.deliveryFee} FCFA\n`;
  message += `💰 *TOTAL À PAYER : ${summary.total} FCFA*\n`;
  message += `----------------------------------------\n`;
  message += `_Merci pour votre commande ! Nous lançons la préparation dès votre confirmation._ ✨`;

  const encodedText = encodeURIComponent(message);
  const url = `https://wa.me/${whatsappNumber}?text=${encodedText}`;

  window.open(url, "_blank", "noopener,noreferrer");
  return url;
};
