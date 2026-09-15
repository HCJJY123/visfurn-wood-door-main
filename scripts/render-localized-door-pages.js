#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { renderLandingPage } = require('../templates/localized-door-landing.template');

const root = path.resolve(__dirname, '..');
const i18nDirectory = path.join(root, 'i18n');
let rendered = 0;
let skipped = 0;

for (const fileName of fs.readdirSync(i18nDirectory).filter((file) => file.endsWith('.json'))) {
  const config = JSON.parse(fs.readFileSync(path.join(i18nDirectory, fileName), 'utf8'));
  if (config.status !== 'approved') {
    skipped += 1;
    continue;
  }
  const languageDirectory = config.pathPrefix || config.lang.split('-')[0];
  const outputPath = path.join(root, languageDirectory, `${config.slug}.html`);
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, renderLandingPage(config));
  console.log(`Rendered ${path.relative(root, outputPath)}`);
  rendered += 1;
}

console.log(`Rendered ${rendered} approved page(s); skipped ${skipped} language configuration(s) awaiting language approval.`);
