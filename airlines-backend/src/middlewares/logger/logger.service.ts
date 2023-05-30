import { LoggerService as LoggerInterface, LogLevel } from '@nestjs/common';
import * as process from 'process';
import { appendFileSync } from 'node:fs';
import { logFileRotation } from './utils';
import * as path from 'path';

const logLevels: LogLevel[] = ['error', 'warn', 'log', 'verbose', 'debug'];

export class AppLogger implements LoggerInterface {
  private readonly logLevel: number;

  constructor() {
    this.logLevel = logLevels.indexOf(this.getLogLevel());
  }

  debug(message: any, ...optionalParams: any[]): any {
    this.createLog('debug', message, optionalParams);
  }

  error(message: any, ...optionalParams: any[]): any {
    this.createLog('error', message, optionalParams);
  }

  log(message: any, ...optionalParams: any[]): any {
    this.createLog('log', message, optionalParams);
  }

  verbose(message: any, ...optionalParams: any[]): any {
    this.createLog('verbose', message, optionalParams);
  }

  warn(message: any, ...optionalParams: any[]): any {
    this.createLog('warn', message, optionalParams);
  }

  logResponse(
    statusCode: number,
    responseBody: string | object | undefined,
  ): any {
    let responseBodyString = 'N/A';

    if (typeof responseBody === 'string') {
      responseBodyString = responseBody;
    } else if (typeof responseBody === 'object') {
      responseBodyString = JSON.stringify(responseBody);
    }

    this.log(`Response: Status code ${statusCode}; Body ${responseBodyString}`);
  }

  private createLog(level: LogLevel, message: any, optionalParams: any[]): any {
    if (logLevels.indexOf(level) > this.logLevel) {
      return;
    }

    const logLine =
      `${level.toUpperCase()}: ${message} ${optionalParams.join(' ')}` + '\n';

    process.stdout.write(logLine);

    this.writeToFile(level, logLine);
  }

  private getLogLevel(): LogLevel {
    const logLevel = process.env.LOG_LEVEL as unknown;

    if (!logLevels.includes(logLevel as LogLevel)) {
      return 'debug';
    }

    return logLevel as LogLevel;
  }

  private writeToFile(level: LogLevel, logLine: string) {
    const fileName = level === 'error' ? 'error.log' : 'log_info.log';

    const logFilePath = path.join(__dirname + `/../../../logs/${fileName}`);

    logFileRotation(logFilePath);

    appendFileSync(logFilePath, logLine);
  }
}
