import {
  createLogger,
  transports,
  format,
  LoggerOptions,
  Logger as WinstonLogger,
} from 'winston';
import * as color from 'colors/safe';

type LoggerLevel = 'error' | 'warn' | 'log' | 'verbose' | 'debug';
type WinstonLoggerLevels =
  | 'error'
  | 'warn'
  | 'info'
  | 'verbose'
  | 'debug'
  | 'silly';
type LogTransport = 'file' | 'console';

export class AppLogger {
  private loggers: Record<LoggerLevel, WinstonLogger>;
  private loggerName = 'logger';
  private logDirectory = 'logs';

  constructor(name = 'logger') {
    this.loggerName = name;
    this.loggers = this.getLoggers();
  }

  public setDirectory(directory: string): this {
    this.logDirectory = directory;

    return this;
  }

  public log(message: any): void {
    this.getLogger('log').info(message);
  }

  public verbose(message: any): void {
    this.getLogger('verbose').verbose(message);
  }

  public error(message: any): void {
    this.getLogger('error').error(message);
  }

  public warn(message: any): void {
    this.getLogger('warn').warn(message);
  }

  public debug(message: any): void {
    this.getLogger('debug').debug(message);
  }

  private getLogger(logLevel: LoggerLevel): WinstonLogger {
    return this.loggers[logLevel];
  }

  private getLoggers(): Record<LoggerLevel, WinstonLogger> {
    return {
      error: createLogger(this.getLogConfig('error', ['file', 'console'])),
      log: createLogger(this.getLogConfig('info', ['console'])),
      warn: createLogger(this.getLogConfig('warn', ['console'])),
      verbose: createLogger(this.getLogConfig('verbose', ['console'])),
      debug: createLogger(this.getLogConfig('debug', ['file', 'console'])),
    };
  }

  private generateFileName(): string {
    const timestamp: Date = new Date();
    const [day, month, year] = [
      timestamp.getDate(),
      `0${timestamp.getMonth() + 1}`.slice(-2),
      timestamp.getFullYear(),
    ];

    const dateFormat = `${year}-${month}-${day}`;

    return `${this.logDirectory}/log-${dateFormat}.log`;
  }

  private buildConsoleLogger(
    label: string,
    level: string,
    timestamp: any,
    message: any,
  ): string {
    const colorize = this.colorize(level);
    const env = colorize((process.env.NODE_ENV || 'local').toUpperCase());

    label = colorize(label);
    level = colorize(`${level.toUpperCase()}:`);
    message = colorize(message);

    return `${label} ${env} ${timestamp} - ${level} ${message}`;
  }

  private colorize(level: string): any {
    const logColors = {
      error: color.red,
      warn: color.yellow,
      log: color.green,
      info: color.green,
      verbose: color.cyan,
      debug: color.blue,
    };

    return logColors[level] || color.white;
  }

  private getLogConfig(
    level: WinstonLoggerLevels,
    logOptions: LogTransport[],
  ): LoggerOptions {
    const config: LoggerOptions = this.getDefaultLogConfig();

    const transportChannels: any = [];

    if (logOptions.includes('console')) {
      transportChannels.push(
        new transports.Console({
          level,
          format: format.combine(
            format.label({
              label: `[${this.loggerName.toUpperCase()}]`,
            }),
            format.timestamp({
              format: 'YY-MM-DD HH:mm:ss',
            }),
            format.printf((info) => {
              return this.buildConsoleLogger(
                info.label,
                info.level,
                info.timestamp,
                info.message,
              );
            }),
          ),
        }),
      );
    }

    if (logOptions.includes('file')) {
      transportChannels.push(
        new transports.File({ filename: this.generateFileName() }),
      );
    }

    config.transports = transportChannels;

    return config;
  }

  private getDefaultLogConfig(): LoggerOptions {
    return {
      transports: [],
      format: format.combine(
        format.label({
          label: `[${this.loggerName.toUpperCase()}]`,
        }),
        format.timestamp({
          format: 'YY-MM-DD HH:mm:ss',
        }),
        format.printf((info) => {
          const env = (process.env.NODE_ENV || 'local').toUpperCase();

          return `${info.label} ${env} ${
            info.timestamp
          } - ${info.level.toUpperCase()}: ${info.message}`;
        }),
      ),
    };
  }
}
