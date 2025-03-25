//----------------------------------------------------------------------------//
//                               *       +                                    //
//                         '                  |                               //
//                     ()    .-.,="``"=.    - o -                             //
//                           '=/_       \     |                               //
//                        *   |  '=._    |                                    //
//                             \     `=./`,        '                          //
//                          .   '=.__.=' `='      *                           //
//                 +                         +                                //
//                      O      *        '       .                             //
//                                                                            //
//  File      : Logger.ts                                                     //
//  Project   : mdweb                                                         //
//  Date      : 2025-03-24                                                    //
//  License   : See project's COPYING.TXT for full info.                      //
//  Author    : mateus.digital <hello@mateus.digital>                         //
//  Copyright : mateus.digital - 2025                                         //
//                                                                            //
//  Description :                                                             //
//                                                                            //
//----------------------------------------------------------------------------//
// -----------------------------------------------------------------------------
import path, {format} from 'path';
// -----------------------------------------------------------------------------
import winston from 'winston';

// -----------------------------------------------------------------------------
const logFormat = winston.format.printf(({level, message, timestamp, stack}) => {
  return `${timestamp} [${level.toUpperCase()}]: ${stack || message}`;
});

// -----------------------------------------------------------------------------
export class Logger
{
  static _logger: any;
  static _httpLevelFilter: any;

  // -----------------------------------------------------------------------------
  static _CreateLogger()
  {
    if (this._logger) {
      return;
    }

    this._logger = winston.createLogger({
      level : 'debug',
      format : winston.format.combine(
        winston.format.timestamp({format : 'YYYY-MM-DD HH:mm:ss'}),
        winston.format.errors({stack : true}), // Log stack traces
        logFormat),
      transports : [
        new winston.transports.Console(
          {format : winston.format.colorize({all : true})}),
      ]
    });

    winston.addColors({
      error : 'red',
      warn : 'yellow',
      info : 'cyan',
      http : 'white',
      debug : 'green'
    })
  }

  static Debug(...args: any[]) { this._logger.debug(...args); }
  static Info(...args: any[]) { this._logger.info(...args); }
  static Http(...args: any[]) { this._logger.http(...args); }
  static Fatal(...args: any[]) { this._logger.fatal(...args); }
  static Error(...args: any[]) { this._logger.error(...args); }
};

// -----------------------------------------------------------------------------
export function SetupLogger()
{
  //
  Logger._CreateLogger();
}

// -----------------------------------------------------------------------------
SetupLogger();
