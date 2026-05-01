// Admin WhatsApp Configuration
// Update ADMIN_WHATSAPP_NUMBER to your actual WhatsApp number (with country code, no + or spaces)
export const ADMIN_WHATSAPP_NUMBER = '2348000000000'; // e.g. 2348012345678

export const buildWhatsAppUrl = (message: string): string => {
  return `https://wa.me/${ADMIN_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
};

export const contactAdminAboutProduct = (productTitle: string, productId: string): string => {
  const message = `Hello Admin, I have just posted a product for sale on UI Marketplace and would like to follow up for verification.\n\nProduct: ${productTitle}\nProduct ID: ${productId}\n\nPlease review my listing. Thank you.`;
  return buildWhatsAppUrl(message);
};

export const buyerContactAdmin = (productTitle: string, productId: string, sellerName?: string): string => {
  const message = `Hello Admin, I am interested in a product listed on UI Marketplace and need assistance.\n\nProduct: ${productTitle}\nProduct ID: ${productId}\nSeller: ${sellerName || 'Unknown'}\n\nPlease help me connect with the seller. Thank you.`;
  return buildWhatsAppUrl(message);
};
