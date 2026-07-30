// Relights Theme JS - Cart Drawer, Buy Now Direct & Shopify Ajax Handlers
document.addEventListener('DOMContentLoaded', () => {
  try {
    const openCartBtn = document.getElementById('OpenCartDrawerBtn');
    const closeCartBtn = document.getElementById('CloseCartDrawer');
    const cartDrawer = document.getElementById('CartDrawer');
    const cartBackdrop = cartDrawer ? cartDrawer.querySelector('.cart-drawer-backdrop') : null;

    function toggleCartDrawer(open) {
      if (!cartDrawer) return;
      try {
        if (open) {
          cartDrawer.classList.add('active');
          document.body.style.overflow = 'hidden';
        } else {
          cartDrawer.classList.remove('active');
          document.body.style.overflow = '';
        }
      } catch (e) {}
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

          if (isBuyNow || res.ok) {
            if (isBuyNow) {
              window.location.href = '/checkout';
              return;
            }

            try {
              const cartRes = await fetch('/cart.js');
              const cartData = await cartRes.json();
              document.querySelectorAll('.cart-count-badge').forEach(badge => {
                badge.textContent = cartData.item_count;
              });
            } catch (err) {}

            toggleCartDrawer(true);
          } else {
            window.location.href = '/checkout';
          }
        } catch (err) {
          window.location.href = '/checkout';
        }
      });
    });

    // Handle all "Buy Now" links/buttons across theme
    document.addEventListener('click', async (e) => {
      try {
        const target = e.target.closest('[data-action="buy-now"]');
        if (target) {
          e.preventDefault();
          const variantId = target.getAttribute('data-variant-id');
          if (variantId) {
            try {
              await fetch('/cart/add.js', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ items: [{ id: variantId, quantity: 1 }] })
              });
            } catch (err) {}
          }
          window.location.href = '/checkout';
        }
      } catch (err) {
        window.location.href = '/checkout';
      }
    });
  } catch (err) {}
});
