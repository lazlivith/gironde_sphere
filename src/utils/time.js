export function isStoreOpen() {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();

  // Heures d'ouverture: 10h00 à 22h30
  const timeInMinutes = hours * 60 + minutes;
  const openTime = 10 * 60; // 10:00 -> 600
  const closeTime = 22 * 60 + 30; // 22:30 -> 1350

  return timeInMinutes >= openTime && timeInMinutes < closeTime;
}
