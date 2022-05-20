const puppeteer = require('puppeteer');

collectionsUrl = 'https://wwwapplications.barnsley.gov.uk/WasteMVC/ViewCollection/SelectAddress';
houseNumber = process.env.HOUSENUMBER;
postcode = process.env.POSTCODE;

async function run () {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: '/usr/bin/chromium-browser',
    args: [
      "--disable-gpu",
      "--disable-dev-shm-usage",
      "--disable-setuid-sandbox",
      "--no-sandbox",
    ]
  });
  const page = await browser.newPage(); // start browser
  await page.goto(collectionsUrl); // go to collections URL
  await page.type('input[id=HouseNumberOrName]', houseNumber); // enter house number
  await page.type('input[id=Postcode]', postcode); // enter postcode
  await page.click('input[name="person1_FindAddress"]'); // submit form data
  await page.waitForTimeout(1000); // wait for 1 second
  const nextBinDate = await page.$eval('.ui-bin-next-date', el => el.textContent); // get contents of ui-bin-next-date
  const nextBinType = await page.$eval('.ui-bin-next-type', el => el.textContent); // get contents of ui-bin-next-type
  const nextBinTypeTrim = nextBinType.trim(); // this is required as there is a leading space in nextBinType
  console.log(JSON.stringify({ colour: nextBinTypeTrim, date: nextBinDate }));
  await browser.close(); // close browser
}

run();