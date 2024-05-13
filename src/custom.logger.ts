import chalk from "chalk";
import { name } from "../package.json";

export const logger = {
  info: (message: string) => {
    console.log(chalk.green(`[${name}]`), message);
  },
  warn: (message: string) => {
    console.log(chalk.yellow(`[${name}]`), message);
  },
  error: (message: string) => {
    console.log(chalk.red(`[${name}]`), message);
  },
};
