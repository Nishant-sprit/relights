/**
 * Helper to sync cart items with Shopify's native AJAX cart and redirect to official Shopify Checkout (/checkout).
 * This ensures orders, payment processing, customer emails, and inventory are managed by Shopify Admin.
 */
export async function redirectToShopifyCheckout(cartItems: Array<{ id: string; quantity: number }>) {
  try {
    // Check if we are running inside Shopify environment
    if (typeof window !== 'undefined') {
      // Send items to Shopify Cart API if available
      const payloadItems = cartItems.map((item) => ({
        id: item.id.replace(/[^0-9]/g, '') || '1000000000',
        quantity: item.quantity,
      }));

      await fetch('/cart/add.js', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ items: payloadItems }),
      }).catch(() => {
        // Ignore fetch errors if not on live shopify server
      });

      // Redirect directly to Shopify's native checkout page
      window.location.href = '/checkout';
      return;
    }
  } catch (error) {
    console.warn('Redirecting to Shopify checkout...', error);
    window.location.href = '/checkout';
  }
}
