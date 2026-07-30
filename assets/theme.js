// Relights Theme JS - Cart Drawer, Buy Now Direct & Shopify Ajax Handlers
document.addEventListener('DOMContentLoaded', () => {
  const openCartBtn = document.getElementById('OpenCartDrawerBtn');
  const closeCartBtn = document.getElementById('CloseCartDrawer');
  const cartDrawer = document.getElementById('CartDrawer');
  const cartBackdrop = cartDrawer ? cartDrawer.querySelector('.cart-drawer-backdrop') : null;

  function toggleCartDrawer(open) {
    if (!cartDrawer) return;
    if (open) {
      cartDrawer.classList.add('active');
      document.body.style.overflow = 'hidden';
    } else {
      cartDrawer.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (openCartBtn) {
    openCartBtn.addEventListener('click', (e) => {
      e.preventDefault();
      toggleCartDrawer(true);
    });
  }

  if (closeCartBtn) {
    closeCartBtn.addEventListener('click', () => toggleCartDrawer(false));
  }

  if (cartBackdrop) {
    cartBackdrop.addEventListener('click', () => toggleCartDrawer(false));
  }

  // Intercept Ajax Cart Forms
  document.querySelectorAll('[data-ajax-cart-form]').forEach(form => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      const isBuyNow = e.submitter && e.submitter.getAttribute('data-buy-now') === 'true';

      try {
        const res = await fetch('/cart/add.js', {
          method: 'POST',
          body: formData
        });

        if (res.ok) {
          if (isBuyNow) {
            window.location.href = '/checkout';
            return;
          }

          // Fetch updated cart JSON
          const cartRes = await fetch('/cart.js');
          const cartData = await cartRes.json();

          // Update cart count badges
          document.querySelectorAll('.cart-count-badge').forEach(badge => {
            badge.textContent = cartData.item_count;
          });

          toggleCartDrawer(true);
        } else {
          if (isBuyNow) window.location.href = '/checkout';
        }
      } catch (err) {
        console.error('Failed to add item to cart', err);
        if (isBuyNow) window.location.href = '/checkout';
      }
    });
  });

  // Handle all "Buy Now" links/buttons across theme
  document.addEventListener('click', (e) => {
    const target = e.target.closest('[data-action="buy-now"]');
    if (target) {
      e.preventDefault();
      const variantId = target.getAttribute('data-variant-id');
      if (variantId) {
        fetch('/cart/add.js', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ items: [{ id: variantId, quantity: 1 }] })
        }).then(() => {
          window.location.href = '/checkout';
        }).catch(() => {
          window.location.href = '/checkout';
        });
      } else {
        window.location.href = '/checkout';
      }
    }
  });
});
