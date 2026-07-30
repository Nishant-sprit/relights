/**
 * Helper to sync cart items with Shopify's native AJAX cart and redirect to official Shopify Checkout (/checkout).
 * Uses Shopify's /cart/add.js API to populate the active Shopify cart session before navigating to /checkout.
 */
export async function redirectToShopifyCheckout(cartItems: Array<{ id: string; quantity: number }>) {
  try {
    if (typeof window !== 'undefined') {
      const payloadItems = cartItems
        .map((item) => {
          const numericId = item.id.replace(/[^0-9]/g, '');
          // Only pass valid numeric variant IDs if available
          return numericId && numericId.length >= 8
            ? { id: numericId, quantity: item.quantity || 1 }
            : null;
        })
        .filter(Boolean);

      if (payloadItems.length > 0) {
        await fetch('/cart/add.js', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({ items: payloadItems }),
        }).catch(() => {});
      }
    }
  } catch (error) {
    console.warn('Cart sync warning:', error);
  }

  // Redirect directly to official Shopify checkout (/checkout)
  window.location.href = '/checkout';
}
