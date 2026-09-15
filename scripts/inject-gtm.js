#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const rootDirectory = path.resolve(__dirname, '..');
const excludedDirectories = new Set(['.git', 'node_modules', 'source']);
const excludedFiles = new Set(['google2e6329d849809176.html']);
const containerId = 'GTM-PD963ZR7';
const headSnippet = `<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${containerId}');</script>
<!-- End Google Tag Manager -->`;
const bodySnippet = `<!-- Google Tag Manager (noscript) -->
<noscript><iframe height="0" src="https://www.googletagmanager.com/ns.html?id=${containerId}" style="display:none;visibility:hidden" width="0"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->`;

function collectHtmlFiles(directory, files = []) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (excludedDirectories.has(entry.name)) continue;

    const filePath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      collectHtmlFiles(filePath, files);
    } else if (
      entry.isFile() &&
      entry.name.endsWith('.html') &&
      !excludedFiles.has(entry.name)
    ) {
      files.push(filePath);
    }
  }

  return files;
}

function injectAfterOpeningTag(html, tagName, snippet) {
  const expression = new RegExp(`<${tagName}\\b[^>]*>`, 'i');
  const match = html.match(expression);
  if (!match) return null;

  const index = match.index + match[0].length;
  return `${html.slice(0, index)}\n${snippet}${html.slice(index)}`;
}

let headInserted = 0;
let bodyInserted = 0;
let unchanged = 0;
const invalidFiles = [];

for (const filePath of collectHtmlFiles(rootDirectory)) {
  const original = fs.readFileSync(filePath, 'utf8');
  let updated = original;
  let changed = false;

  if (!updated.includes('googletagmanager.com/gtm.js')) {
    const withHeadSnippet = injectAfterOpeningTag(updated, 'head', headSnippet);
    if (!withHeadSnippet) {
      invalidFiles.push(path.relative(rootDirectory, filePath));
      continue;
    }
    updated = withHeadSnippet;
    headInserted += 1;
    changed = true;
  }

  if (!updated.includes('googletagmanager.com/ns.html')) {
    const withBodySnippet = injectAfterOpeningTag(updated, 'body', bodySnippet);
    if (!withBodySnippet) {
      invalidFiles.push(path.relative(rootDirectory, filePath));
      continue;
    }
    updated = withBodySnippet;
    bodyInserted += 1;
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(filePath, updated);
  } else {
    unchanged += 1;
  }
}

if (invalidFiles.length) {
  console.error(`Missing required HTML tags in: ${invalidFiles.join(', ')}`);
  process.exitCode = 1;
} else {
  console.log(
    `GTM coverage updated: ${headInserted} head snippets inserted, ${bodyInserted} noscript snippets inserted, ${unchanged} files already complete.`,
  );
}
