// Erzeugt src/app/opengraph-image.png und src/app/apple-icon.png.
// Aufruf: node scripts/generate-brand-assets.cjs (benötigt Playwright mit Chromium).
const { chromium } = require('playwright');
const path = require('path');
const app = path.join(__dirname, '..', 'src', 'app');
const fs = require('fs');
const f = (n) => 'data:font/woff2;base64,' + fs.readFileSync(path.join(app, 'fonts', n)).toString('base64');
const stripes = Array.from({ length: 13 }, (_, i) =>
  `<path d="M${i * 96} 0h96v${150 - 48}a48 48 0 0 1-96 0z" fill="${i % 2 ? '#fffdf8' : '#17479b'}"/>`).join('');
const html = `<!doctype html><html><head><style>
@font-face{font-family:BC;font-weight:700;src:url(${f('barlow-condensed-latin-700-normal.woff2')})}
@font-face{font-family:BC;font-weight:600;src:url(${f('barlow-condensed-latin-600-normal.woff2')})}
@font-face{font-family:B;font-weight:500;src:url(${f('barlow-latin-500-normal.woff2')})}
*{margin:0;box-sizing:border-box}
body{width:1200px;height:630px;background:#f4efe4;color:#15181d;font-family:B;overflow:hidden;position:relative}
svg.aw{display:block;filter:drop-shadow(0 10px 10px rgba(21,24,29,.16))}
.c{padding:44px 72px 0}
.k{font:600 30px BC;letter-spacing:.06em;text-transform:uppercase;color:#17479b}
h1{white-space:nowrap;font:700 108px/.94 BC;text-transform:uppercase;margin-top:14px;letter-spacing:-.01em}
.f{position:absolute;left:72px;right:72px;bottom:44px;display:flex;justify-content:space-between;align-items:center;font-size:28px;color:#414650;border-top:2px solid #15181d;padding-top:22px}
.f b{font:700 34px BC;letter-spacing:.02em;text-transform:uppercase;color:#15181d}
</style></head><body>
<svg class="aw" width="1200" height="150" viewBox="0 0 1200 150">${stripes}</svg>
<div class="c"><p class="k">Griechischer Grill · Kneipe · Biergarten</p>
<h1>Gyros, Kölsch und<br>Bahnstadt-Geschichten</h1></div>
<div class="f"><b>Bahnstadtgrill Opladen</b><span>Lützenkirchener Straße 12 · am Bahnhof Opladen</span></div>
</body></html>`;
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  await p.setContent(html, { waitUntil: 'networkidle' });
  await p.evaluate(() => document.fonts.ready);
  await p.screenshot({ path: path.join(app, 'opengraph-image.png') });
  const icon = fs.readFileSync(path.join(app, 'icon.svg'), 'utf8').replace('rx="12"', 'rx="0"');
  const q = await b.newPage({ viewport: { width: 180, height: 180 }, deviceScaleFactor: 1 });
  await q.setContent(`<body style="margin:0">${icon.replace('<svg ', '<svg width="180" height="180" ')}</body>`);
  await q.screenshot({ path: path.join(app, 'apple-icon.png') });
  await b.close();
})();
