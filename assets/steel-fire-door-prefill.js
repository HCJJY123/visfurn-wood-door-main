(() => {
  const form = document.querySelector('#quote-form');
  if (!form) return;

  const products = {
    'steel-fire-door-for-house': {
      name: 'Steel Fire Door for House & Apartment Projects',
      path: '/products/fire-security-doors/steel-fire-door-for-house',
      context: 'Concept enquiry for',
      requirements: 'Required fire rating / standard: \nDoor leaf, frame and hardware scope: '
    },
    'custom-color-classroom-door': {
      name: 'Custom Color Classroom Door',
      path: '/products/school-doors/custom-color-classroom-door',
      context: 'Product selected',
      projectType: 'School',
      doorType: 'School Doors',
      requirements: 'Color reference / finish direction: \nDoor marks / opening sizes: \nHardware, glazing or protection requirements: '
    }
  };
  const slug = new URLSearchParams(window.location.search).get('product');
  if (!Object.prototype.hasOwnProperty.call(products, slug)) return;

  const product = products[slug];
  const values = {
    product_slug: slug,
    product_name: product.name,
    product_url: new URL(product.path, 'https://www.visfurn.com').href,
    source_page: new URLSearchParams(window.location.search).get('source_page') || product.path
  };
  const applyValues = () => {
    for (const [name, value] of Object.entries(values)) {
      let field = form.querySelector(`input[name="${name}"]`);
      if (!field) {
        field = document.createElement('input');
        field.type = 'hidden';
        field.name = name;
        form.appendChild(field);
      }
      field.value = value;
      field.setAttribute('value', value);
    }
  };
  applyValues();
  window.requestAnimationFrame(applyValues);
  window.setTimeout(applyValues, 0);
  window.addEventListener('pageshow', applyValues);
  form.addEventListener('submit', applyValues, true);
  form.addEventListener('formdata', (event) => {
    for (const [name, value] of Object.entries(values)) event.formData.set(name, value);
  });

  const projectType = form.querySelector('[name="project_type"]');
  if (projectType && product.projectType && !projectType.value) projectType.value = product.projectType;
  const doorType = form.querySelector('[name="door_type"]');
  if (doorType && product.doorType) doorType.value = product.doorType;

  const context = document.querySelector('[data-product-context]');
  if (context) {
    context.textContent = `${product.context}: ${product.name}. Add the opening schedule, finish reference and hardware requirements below.`;
    context.hidden = false;
  }

  const requirements = form.querySelector('textarea[name="requirements"]');
  if (requirements && !requirements.value.trim()) {
    requirements.value = `Product: ${product.name}\nProduct URL: ${values.product_url}\n\n${product.requirements}`;
  }
})();
