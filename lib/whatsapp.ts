export const WA_NUMBER = '9779816800052'
export const WA_DISPLAY = '+977 981-680-0052'

/** Build a wa.me link with a pre-filled message. */
export const waLink = (message?: string) =>
  message ? `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}` : `https://wa.me/${WA_NUMBER}`
