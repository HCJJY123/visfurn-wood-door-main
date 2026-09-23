(() => {
  const form = document.querySelector('#quote-form');
  if (!form) return;

  const products = {
    'steel-fire-door-for-house': {
      name: 'Steel Fire Door for House & Apartment Projects',
      path: '/products/fire-security-doors/steel-fire-door-for-house'
    }
  };
  const slug = new URLSearchParams(window.location.search).get('product');
  if (!Object.prototype.hasOwnProperty.call(products, slug)) return;

  const product = products[slug];
  const values = {
    product_slug: slug,
    product_name: product.name,
    product_url: new URL(product.path, 'https://www.visfurn.com').href,
    source_page: product.path
  };
  for (const [name, value] of Object.entries(values)) {
    let field = form.querySelector(`input[name="${name}"]`);
    if (!field) {
      field = document.createElement('input');
      field.type = 'hidden';
      field.name = name;
      form.appendChild(field);
    }
    field.value = value;
  }

  if (!document.getElementById('vf-product-context')) {
    const context = document.createElement('p');
    context.id = 'vf-product-context';
    context.textContent = `Concept enquiry for: ${product.name}`;
    form.prepend(context);
  }

  const requirements = form.querySelector('textarea[name="requirements"]');
  if (requirements && !requirements.value.trim()) {
    requirements.value = `Product: ${product.name}\nRequired fire rating / standard: \nDoor leaf, frame and hardware scope: `;
  }
})();
