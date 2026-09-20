# AGENTS.md

## 跟踪代码（不可改动）
- 每个页面的 Google Tag Manager 代码块（`GTM-PD963ZR7`，位于 `<head>` 顶部 + `<body>` 后的 noscript）禁止改动或删除。
- 以下 3 个页面有直接的 gtag.js 块（`G-GWFSDTTMQL`），禁止改动：
  - `blog/fire-rated-doors-and-safety-solutions.html`
  - `blog/wpc-door-suppliers-in-china.html`
  - `case-study/commercial-project-door-package.html`

## Google Ads 转化（由 GTM 管理，不在静态代码里）
- Google Ads 转化（含 WhatsApp 点击 `AW-18306142236/NqtSCK74gc0cEJyghplE`）由 GTM 容器 `GTM-PD963ZR7` 配置并触发，仓库代码里没有对应的 gtag/AW 块，不要手动加回。
- WhatsApp 按钮必须保留 `href` 中的 `wa.me` 或 `api.whatsapp.com`，不要改成 `onclick`、`<button>` 或 JS 跳转——GTM 的 Click URL 触发器依赖这个 `href`。
