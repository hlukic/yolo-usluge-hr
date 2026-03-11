const puppeteer = require('puppeteer');
const path = require('path');

const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap" rel="stylesheet">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }

  body {
    background: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 600px;
    height: 140px;
  }

  .logo {
    display: flex;
    align-items: center;
    gap: 0px;
    font-family: 'Bebas Neue', sans-serif;
    line-height: 1;
  }

  .yolo {
    font-size: 96px;
    color: #CC1418;
    letter-spacing: 2px;
  }

  .usluge {
    font-size: 96px;
    color: #111111;
    letter-spacing: 2px;
  }

  .icon {
    width: 110px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 8px;
    position: relative;
    top: -2px;
  }

  svg.icon-svg {
    width: 110px;
    height: 80px;
    overflow: visible;
  }
</style>
</head>
<body>
<div class="logo">
  <span class="yolo">YOLO</span>

  <div class="icon">
    <svg class="icon-svg" viewBox="0 0 110 80" xmlns="http://www.w3.org/2000/svg">
      <!-- EKG line: flat → spike up → spike down → flat -->
      <polyline
        points="0,42  22,42  32,8  44,74  54,42  70,42"
        fill="none"
        stroke="#111111"
        stroke-width="5"
        stroke-linejoin="round"
        stroke-linecap="round"
      />

      <!-- Vertical bar (circuit start) -->
      <line x1="70" y1="22" x2="70" y2="62" stroke="#CC1418" stroke-width="4" stroke-linecap="round"/>

      <!-- Three horizontal circuit lines with open circles -->
      <line x1="70" y1="24" x2="92" y2="24" stroke="#CC1418" stroke-width="3.5" stroke-linecap="round"/>
      <circle cx="100" cy="24" r="7" fill="none" stroke="#CC1418" stroke-width="3.5"/>

      <line x1="70" y1="42" x2="92" y2="42" stroke="#CC1418" stroke-width="3.5" stroke-linecap="round"/>
      <circle cx="100" cy="42" r="7" fill="none" stroke="#CC1418" stroke-width="3.5"/>

      <line x1="70" y1="60" x2="92" y2="60" stroke="#CC1418" stroke-width="3.5" stroke-linecap="round"/>
      <circle cx="100" cy="60" r="7" fill="none" stroke="#CC1418" stroke-width="3.5"/>
    </svg>
  </div>

  <span class="usluge">usluge</span>
</div>
</body>
</html>`;

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 600, height: 140, deviceScaleFactor: 3 });
  await page.setContent(html, { waitUntil: 'networkidle0' });
  await page.evaluateHandle('document.fonts.ready');
  await new Promise(r => setTimeout(r, 1500));

  const dir = path.dirname(require.main.filename);

  // Light version (transparent bg)
  await page.screenshot({
    path: dir + '/logo-ekg-light.png',
    omitBackground: true
  });

  // Dark version
  await page.evaluate(() => {
    document.body.style.background = '#0a0a0a';
    document.querySelector('.usluge').style.color = '#ffffff';
  });
  await page.screenshot({
    path: dir + '/logo-ekg-dark.png',
    omitBackground: false
  });

  await browser.close();
  console.log('Done! logo-ekg-light.png + logo-ekg-dark.png');
})();
