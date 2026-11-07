(() => {
  const form = document.querySelector('#quote-form');
  if (!form) return;
  const params = new URLSearchParams(window.location.search);
  const choices = {
    inquiry_purpose: {
      'bulk-order': 'Bulk order quotation',
      'sample-review': 'Professional sample review',
      'commercial-trial': 'Commercial trial review',
      'specification-review': 'Specification review'
    },
    supply_scope: {
      'slab-only': 'Door leaf only (slab)',
      'leaf-frame-trim': 'Leaf, frame and trim',
      'hardware-package': 'Package with specified hardware',
      'help-me-choose': 'Help me compare the scope'
    },
    finish_state: {
      'white-primed': 'White primed for subsequent finishing',
      'white-finished': 'White finished surface'
    }
  };
  for (const [name, values] of Object.entries(choices)) {
    const key = params.get(name);
    if (!Object.prototype.hasOwnProperty.call(values, key)) continue;
    const field = form.querySelector(`[name="${name}"]`);
    if (!field || field.value) continue;
    field.value = values[key];
  }
})();
