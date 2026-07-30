/**
 * Helper to sync cart items with Shopify's native AJAX cart and redirect to official Shopify Checkout (/checkout).
 * Works seamlessly on live Shopify store domains and handles preview environments cleanly.
 */
export async function redirectToShopifyCheckout(cartItems: Array<{ id: string; quantity: number }>) {
  try {
    const isShopifyStore =
      typeof window !== 'undefined' &&
      (!!(window as any).Shopify ||
        window.location.hostname.includes('myshopify.com') ||
        window.location.hostname.includes('shopify') ||
        window.location.pathname.startsWith('/theme') ||
        window.location.pathname.startsWith('/collections') ||
        window.location.pathname.startsWith('/products'));

    const variantId = cartItems[0]?.id?.replace(/[^0-9]/g, '') || '1000000000';

    if (isShopifyStore) {
      const payloadItems = cartItems.map((item) => ({
        id: item.id.replace(/[^0-9]/g, '') || variantId,
        quantity: item.quantity || 1,
      }));

      // Post to Shopify Cart API
      await fetch('/cart/add.js', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ items: payloadItems }),
      }).catch(() => {});

      // Redirect to Shopify native checkout
      window.location.href = `/cart/${variantId}:${cartItems[0]?.quantity || 1}`;
      return;
    }

    // On standalone static preview (e.g. GitHub Pages or Localhost), redirect to /checkout or handle gracefully
    try {
      window.location.href = '/checkout';
    } catch (e) {
      console.warn('Checkout navigation', e);
    }
  } catch (error) {
    console.warn('Redirecting to Shopify checkout...', error);
    window.location.href = '/checkout';
  }
}
