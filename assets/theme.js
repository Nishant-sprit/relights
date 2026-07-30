/**
 * LuminaStep Core Theme JavaScript (Shopify AJAX Cart & Modals)
 */
document.addEventListener('DOMContentLoaded', () => {
  const cartDrawer = document.getElementById('CartDrawer');
  
  function openCart() {
    if (cartDrawer) {
      cartDrawer.classList.remove('translate-x-full');
      fetchCart();
    }
  }

  function closeCart() {
    if (cartDrawer) {
      cartDrawer.classList.add('translate-x-full');
    }
  }

  // Open & Close Triggers
  document.addEventListener('click', (e) => {
    if (e.target.closest('[data-action="open-cart"]')) {
      e.preventDefault();
      openCart();
    }
    if (e.target.closest('[data-action="close-cart"]')) {
      e.preventDefault();
      closeCart();
    }
  });

  // Fetch Shopify Cart AJAX
  async function fetchCart() {
    try {
      const res = await fetch('/cart.js');
      const cart = await res.json();
      updateCartUI(cart);
    } catch (err) {
      console.error('Error fetching cart:', err);
    }
  }

  // Currency Formatter
  function formatMoney(cents) {
    if (typeof cents !== 'number') return '₹0.00';
    const amount = (cents / 100).toFixed(2);
    return `₹${amount}`;
  }

  // Dynamic UI Updater
  function updateCartUI(cart) {
    const cartCountEls = document.querySelectorAll('.cart-count-badge');
    const cartItemsContainer = document.getElementById('CartDrawerItems');
    const cartSubtotalEl = document.getElementById('CartSubtotalAmount');
    const cartTotalEl = document.getElementById('CartTotalAmount');
    const shippingProgressText = document.getElementById('ShippingProgressText');
    const shippingProgressBar = document.getElementById('ShippingProgressBar');

    // 1. Update Cart Badge Count
    cartCountEls.forEach((el) => {
      el.textContent = cart.item_count || '0';
    });

    // 2. Update Subtotal & Total
    const formattedTotal = formatMoney(cart.total_price);
    if (cartSubtotalEl) cartSubtotalEl.textContent = formattedTotal;
    if (cartTotalEl) cartTotalEl.textContent = formattedTotal;

    // 3. Update Free Shipping Progress Bar
    const thresholdCents = 15000; // ₹150.00 threshold
    if (shippingProgressText && shippingProgressBar) {
      if (cart.total_price < thresholdCents) {
        const remaining = thresholdCents - cart.total_price;
        shippingProgressText.innerHTML = `Add <strong class="text-blue-400 font-mono">${formatMoney(remaining)}</strong> more for <strong class="text-white">Free Express Shipping</strong>`;
        const percent = Math.min(100, Math.max(0, (cart.total_price / thresholdCents) * 100));
        shippingProgressBar.style.width = `${percent}%`;
      } else {
        shippingProgressText.innerHTML = `<span class="text-green-400 font-bold">✓ You qualify for FREE Express Shipping!</span>`;
        shippingProgressBar.style.width = `100%`;
      }
    }

    // 4. Update Items Container
    if (!cartItemsContainer) return;

    if (cart.item_count === 0) {
      cartItemsContainer.innerHTML = `
        <div class="text-center py-16 space-y-4">
          <div class="w-16 h-16 rounded-2xl bg-neutral-800 border border-neutral-700 flex items-center justify-center mx-auto text-neutral-500">
            <svg class="w-8 h-8 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
          </div>
          <div class="space-y-1">
            <h4 class="text-base font-bold text-white">Your cart is currently empty</h4>
            <p class="text-xs text-neutral-400">Discover our smart motion lighting kits and elevate your home.</p>
          </div>
          <button data-action="close-cart" class="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/30 transition-all">
            Browse Products &rarr;
          </button>
        </div>
      `;
      return;
    }

    cartItemsContainer.innerHTML = cart.items.map((item, index) => `
      <div class="p-4 rounded-xl bg-neutral-950 border border-neutral-800 flex gap-4 transition-all items-center">
        <img src="${item.image || 'https://images.unsplash.com/photo-1541123437800-1bb1317badc2?auto=format&fit=crop&q=80&w=150'}" alt="${item.title}" class="w-16 h-16 object-cover rounded-xl border border-neutral-800 bg-neutral-900 shrink-0">
        
        <div class="flex-1 space-y-1">
          <div class="flex justify-between items-start">
            <h4 class="text-sm font-bold text-white leading-snug line-clamp-1">
              ${item.product_title}
            </h4>
            <button class="text-neutral-500 hover:text-red-400 p-1 transition-colors ml-2" onclick="changeQuantity('${item.key}', 0)" title="Remove item">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
            </button>
          </div>

          <p class="text-xs text-neutral-400 font-medium">${item.variant_title || 'Standard Kit'}</p>

          <div class="flex items-center justify-between pt-2 border-t border-neutral-800/80 mt-2">
            <!-- Quantity Changer Controls -->
            <div class="flex items-center bg-neutral-900 border border-neutral-700 rounded-lg p-0.5">
              <button class="w-7 h-7 bg-neutral-800 hover:bg-neutral-700 text-white font-bold text-sm flex items-center justify-center rounded transition-colors cursor-pointer" onclick="changeQuantity('${item.key}', ${item.quantity - 1})">-</button>
              <span class="px-3 text-xs font-mono font-bold text-white">${item.quantity}</span>
              <button class="w-7 h-7 bg-neutral-800 hover:bg-neutral-700 text-white font-bold text-sm flex items-center justify-center rounded transition-colors cursor-pointer" onclick="changeQuantity('${item.key}', ${item.quantity + 1})">+</button>
            </div>

            <span class="text-sm font-bold text-blue-400 font-mono">${formatMoney(item.final_line_price)}</span>
          </div>
        </div>
      </div>
    `).join('');
  }

  // Global Quantity Changer Function
  window.changeQuantity = async (lineKey, newQty) => {
    try {
      const res = await fetch('/cart/change.js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: lineKey, quantity: Math.max(0, newQty) })
      });
      const cart = await res.json();
      updateCartUI(cart);
    } catch (err) {
      console.error('Error updating cart quantity:', err);
    }
  };

  // Add to Cart Form Interceptor
  document.addEventListener('submit', async (e) => {
    if (e.target && e.target.matches('form[action*="/cart/add"]')) {
      e.preventDefault();
      const formData = new FormData(e.target);
      try {
        await fetch('/cart/add.js', {
          method: 'POST',
          body: formData
        });
        openCart();
      } catch (err) {
        console.error('Error adding to cart:', err);
      }
    }
  });
});
