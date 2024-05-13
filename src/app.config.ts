import "dotenv/config";

interface Config {
  ikbr_username: string | undefined;
  ikbr_password: string | undefined;
  ikbr_login_url: string | undefined;
}

const config: Config = {
  ikbr_username: process.env.IKBR_USERNAME,
  ikbr_password: process.env.IKBR_PASSWORD,
  ikbr_login_url: process.env.IKBR_LOGIN_URL,
};

export default config;
