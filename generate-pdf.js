const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  const htmlPath = path.join(__dirname, 'index.html');
  await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle0' });
  
  await page.setViewport({ width: 1280, height: 720 });
  
  await page.pdf({
    path: 'GIS_Relatorio_2025.pdf',
    width: '1280px',
    height: '720px',
    printBackground: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 }
  });
  
  console.log('PDF gerado: GIS_Relatorio_2025.pdf');
  await browser.close();
})();
