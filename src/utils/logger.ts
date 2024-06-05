import chalk from 'chalk';
import highlight from 'cli-highlight';
import { isObject, isString } from 'lodash';

enum PreLog {
  ERROR = 'ERROR',
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  PANIC = 'PANIC',
  WARN = 'WARN',
}

const prelogColorMap = {
  [PreLog.ERROR]: 'red',
  [PreLog.DEBUG]: 'yellow',
  [PreLog.INFO]: 'blue',
  [PreLog.PANIC]: 'red',
  [PreLog.WARN]: 'yellow',
} as { [x: string]: 'red' | 'yellow' | 'blue' };

export class Logger {
  static makeHighligth(data: unknown) {
    const json = JSON.stringify(data, null, 2);
    const highlightedJson = highlight(json, {
      language: 'json',
      ignoreIllegals: true,
    });
    return highlightedJson;
  }

  static preLog(preLog: PreLog, ...args: unknown[]) {
    console.log(
      chalk[prelogColorMap[preLog]].bold(
        `============================================================${preLog}============================================================`
      )
    );
    this.log(...args);
    console.log(
      chalk[prelogColorMap[preLog]].bold(
        `============================================================${preLog}============================================================`
      )
    );
  }

  static log(...args: unknown[]) {
    let msg = '';

    for (const arg of args) {
      if (isString(arg)) {
        const argLower = arg.toLowerCase();

        if (argLower.includes('data')) {
          msg += chalk.green(arg);
          msg += `\n`;
          continue;
        }

        if (argLower.includes('error')) {
          msg += chalk.red(arg);
          msg += `\n`;
          continue;
        }

        if (argLower.includes('warn')) {
          msg += chalk.yellow(arg);
          msg += `\n`;
          continue;
        }

        if (argLower.includes('info')) {
          msg += chalk.blue(arg);
          msg += `\n`;
          continue;
        }

        if (argLower.includes('access')) {
          msg += chalk.magenta(arg);
          msg += `\n`;
          continue;
        }

        msg += `${arg} \n`;
        continue;
      }

      if (isObject(arg)) {
        msg += this.makeHighligth(arg);
        msg += `\n`;
      }
    }

    console.log(msg);
  }

  static debug(...args: unknown[]) {
    this.preLog(PreLog.DEBUG, ...args);
  }

  static error(...args: unknown[]) {
    this.preLog(PreLog.ERROR, ...args);
  }

  static info(...args: unknown[]) {
    this.preLog(PreLog.INFO, ...args);
  }

  static panic(...args: unknown[]) {
    this.preLog(PreLog.PANIC, ...args);
  }

  static warn(...args: unknown[]) {
    this.preLog(PreLog.WARN, ...args);
  }
}
