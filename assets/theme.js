// Relights Theme JS - Cart Drawer & Ajax Handlers
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

      try {
        const res = await fetch('/cart/add.js', {
          method: 'POST',
          body: formData
        });

        if (res.ok) {
          // Fetch updated cart JSON
          const cartRes = await fetch('/cart.js');
          const cartData = await cartRes.json();

          // Update cart count badges
          document.querySelectorAll('.cart-count-badge').forEach(badge => {
            badge.textContent = cartData.item_count;
          });

          toggleCartDrawer(true);
        }
      } catch (err) {
        console.error('Failed to add item to cart', err);
      }
    });
  });
});
