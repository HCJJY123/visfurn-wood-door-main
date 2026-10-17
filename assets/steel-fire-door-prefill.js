(() => {
  const form = document.querySelector('#quote-form');
  if (!form) return;

  const products = {
    'taupe-woodgrain-wpc-interior-door': {
      name: "Taupe Woodgrain WPC Door for Modern Residential and Hotel Interiors",
      path: '/products/wpc-doors/taupe-woodgrain-wpc-interior-door',
      context: 'Product selected',
      doorType: 'WPC Doors',
      requirements: 'Taupe woodgrain WPC door set including frame; FOB Tianjin, China.\nQuantity / door marks: \nLeaf or opening sizes / wall thickness / handing: \nFinish sample / frame profile / trim: \nHardware inclusion and specification to confirm: \nDestination / requested timing: '
    },

    'charcoal-panel-entrance-door': {
      name: 'Charcoal Panel Entrance Door with Geometric Detailing',
      path: '/products/exterior-doors/charcoal-panel-entrance-door',
      context: 'Product selected',
      doorType: 'Exterior Doors',
      requirements: 'Preferred elevation / quantities by door mark: \nOpening sizes / wall thickness / handing: \nExposure / required performance standards: \nLeaf, frame, threshold and hardware scope: \nFinish / destination / requested delivery window: '
    },

    'entrance-doors': {
      name: 'Entrance Doors Collection',
      path: '/products/entrance-doors',
      context: 'Collection selected',
      doorType: 'Entrance Doors',
      requirements: 'Door marks / quantities / opening sizes: \nExposure / frame / threshold requirements: \nFinish reference / hardware / destination: '
    },
    'exterior-doors': {
      name: 'Exterior Doors Collection',
      path: '/products/exterior-doors',
      context: 'Collection selected',
      doorType: 'Exterior Doors',
      requirements: 'Door marks / quantities / opening sizes: \nWeather exposure / frame / seal requirements: \nFinish reference / hardware / destination: '
    },
    'fire-security-doors': {
      name: 'Fire & Security Doors Collection',
      path: '/products/fire-security-doors',
      context: 'Collection selected',
      doorType: 'Steel Security Doors',
      requirements: 'Door marks / quantities / opening sizes: \nRequired performance / standard / documentation: \nDoor leaf, frame and hardware scope / destination: '
    },
    'interior-doors': {
      name: 'Interior Doors Collection',
      path: '/products/interior-doors',
      context: 'Collection selected',
      doorType: 'Interior Wooden Doors',
      requirements: 'Door marks / applications / quantities: \nOpening sizes / wall thickness / frame scope: \nFinish reference / hardware / destination: '
    },
    'school-doors': {
      name: 'School Doors Collection',
      path: '/products/school-doors',
      context: 'Collection selected',
      projectType: 'School',
      doorType: 'School Doors',
      requirements: 'Room schedule / quantities / opening sizes: \nFinished wall thickness / frame scope: \nVision panel / hardware / finish reference / destination: '
    },
    'wooden-doors': {
      name: 'Wooden Doors Collection',
      path: '/products/wooden-doors',
      context: 'Collection selected',
      doorType: 'Interior Wooden Doors',
      requirements: 'Door marks / applications / quantities: \nLeaf construction / opening sizes / frame scope: \nFinish reference / hardware / destination: '
    },
    'wpc-doors': {
      name: 'WPC Doors Collection',
      path: '/products/wpc-doors',
      context: 'Collection selected',
      doorType: 'WPC Doors',
      requirements: 'Door marks / applications / quantities: \nOpening sizes / wall thickness / frame scope: \nMoisture exposure / finish reference / hardware / destination: '
    },
    'classic-french-raised-panel-wooden-interior-door': {
      name: 'Classic French Raised-Panel Wooden Interior Door',
      path: '/products/wooden-doors/classic-french-raised-panel-wooden-interior-door',
      context: 'Product selected',
      doorType: 'Interior Wooden Doors',
      requirements: 'Door marks / quantities / opening sizes: \nPanel elevation / paint reference: \nLeaf construction / frame / wall thickness: \nHardware / handing / destination: '
    },
    'modern-prehung-wpc-interior-door': {
      name: 'Modern Prehung WPC Interior Door for Hotels & Apartments',
      path: '/products/wpc-doors/modern-prehung-wpc-interior-door',
      context: 'Product selected',
      doorType: 'WPC Doors',
      requirements: 'Door marks / quantities / opening sizes: \nFinished wall thickness / handing: \nPrehung assembly / frame / trim scope: \nFinish reference / hardware / destination: '
    },
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
    },
    'modern-finished-hotel-interior-door': {
      name: 'Modern Finished Hotel Interior Door',
      path: '/products/hotel-doors/modern-finished-hotel-interior-door',
      context: 'Product selected',
      projectType: 'Hotel / Hospitality',
      doorType: 'Hotel Doors',
      requirements: 'Room marks / quantities: \nOpening sizes / frame scope: \nFinish reference / hardware drawings: '
    },
    'hotel-doors': {
      name: 'Hotel Doors Collection',
      path: '/products/hotel-doors',
      context: 'Collection selected',
      projectType: 'Hotel / Hospitality',
      doorType: 'Hotel Doors',
      requirements: 'Room schedule / quantities: \nSupply scope (leaf only, leaf + frame, or specified hardware set): \nExisting frame / finished wall thickness: \nHardware supplied vs preparation only / approved drawings: \nFinish reference / destination / delivery phase: '
    },
    'hospital-doors': {
      name: 'Hospital Doors Collection',
      path: '/products/hospital-doors',
      context: 'Collection selected',
      projectType: 'Hospital / Healthcare',
      doorType: 'Hospital Doors',
      requirements: 'Room schedule / opening dimensions: \nWall thickness, vision panel and hardware requirements: \nFinish reference, quantity and destination: '
    },
    'modern-laboratory-door': {
      name: 'Double Swing Laboratory Door for Healthcare Projects',
      path: '/products/hospital-doors/modern-laboratory-door',
      context: 'Product selected',
      projectType: 'Hospital / Healthcare',
      doorType: 'Hospital Doors',
      requirements: 'Door marks / opening dimensions: \nFrame, vision panel and hardware requirements: \nRequired documentation and destination: '
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

