import puppeteer, { LaunchOptions, ConnectOptions, Browser } from "puppeteer";
import { ENDPOINTS } from "./endpoints";
import { logger } from "./custom.logger";
import config from "./app.config";

async function getBrowserInstance(): Promise<Browser> {
  return await puppeteer.launch({
    headless: false,
    ignoreHTTPSErrors: true,
    args: [
      "--proxy-server='direct://'",
      "--proxy-bypass-list=*",
      "--disable-gpu",
      "--disable-dev-shm-usage",
      "--disable-setuid-sandbox",
      "--no-first-run",
      "--no-sandbox",
      "--no-zygote",
      "--single-process",
      "--ignore-certificate-errors",
      "--ignore-certificate-errors-spki-list",
      "--enable-features=NetworkService",
    ],
  });
}

async function browserLogin() {
  let isloggedIn: boolean = false;
  try {
    const browser = await getBrowserInstance();
    const page = await browser.newPage();
    await page.goto(config.ikbr_login_url as string, {
      waitUntil: "networkidle0",
    });
    await page.type("input[name='username']", config.ikbr_username as string);
    await page.type("input[name='password']", config.ikbr_password as string);
    await page.click("button[type=submit]");
    logger.warn(
      "Waiting for login confirmation [60s]... [if 2FA is enabled, check your phone]"
    );
    await page.waitForNavigation({ waitUntil: "networkidle0", timeout: 60000 });
    const url = page.url();
    if (url === ENDPOINTS.DISPATCHER) {
      logger.info("Login successful");
      isloggedIn = true;
    } else {
      logger.error("Login failed :(");
      isloggedIn = false;
    }

    await browser.close();
    return isloggedIn;
  } catch (error: any) {
    logger.error(`Error while logging in: ${error.message}`);
    return isloggedIn;
  }
}

export { browserLogin };
