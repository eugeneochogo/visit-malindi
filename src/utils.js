export const WHATSAPP_NUMBER = "254791562000";
export const isWhatsAppConfigured = Boolean(WHATSAPP_NUMBER);

export function whatsappLink(message = "Hello Visit Malindi, I'd like some help planning my trip.") {
  const encoded = encodeURIComponent(message);
  return WHATSAPP_NUMBER ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}` : `https://wa.me/?text=${encoded}`;
}

export function enquiryMessage(type, name, context = "") {
  const intro = "Hello Visit Malindi 👋";
  const messages = {
    experience: `${intro}\n\nI'm interested in ${name}.\n\nDate:\nNumber of people:\n\nPlease share availability and pricing.`,
    stay: `${intro}\n\nI'm interested in ${name}.\n\nCheck-in:\nCheck-out:\nNumber of guests:\n\nPlease share availability and rates.`,
    transfer: `${intro}\n\nI'd like to arrange:\n${name}\n\nDate:\nNumber of passengers:\nPickup/arrival time:\n\nPlease share the available options and price.`,
    nightlife: `${intro}\n\nWhat's happening in Malindi tonight?\n\nWe're interested in: ${name}\n\nPlease recommend some options.`,
    itinerary: `${intro}\n\nI'd like help with the ${name} itinerary.\n\nPlease help me shape the best plan for my trip.`,
    general: `${intro}\n\nI'd like help planning my trip to Malindi.`,
  };
  return `${messages[type] || messages.general}${context ? `\n\n${context}` : ""}`;
}

export function navigate(path) {
  window.history.pushState({}, "", path);
  window.dispatchEvent(new PopStateEvent("popstate"));
  window.scrollTo({ top: 0, behavior: "smooth" });
}

export function slugFromPath(pathname) {
  return pathname.split("/").filter(Boolean).pop() || "";
}