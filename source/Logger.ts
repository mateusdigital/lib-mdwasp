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


export abstract class ILogger
{
  abstract Debug(...args: any[]): void;
  abstract Info(...args: any[]): void;
  abstract Http(...args: any[]): void;
  abstract Fatal(...args: any[]): void;
  abstract Error(...args: any[]): void;

  D(...args: any[]): void { this.Debug(...args); }
  I(...args: any[]): void { this.Info(...args); }
  H(...args: any[]): void { this.Http(...args); }
  F(...args: any[]): void { this.Fatal(...args); }
  E(...args: any[]): void { this.Error(...args); }
}


// -----------------------------------------------------------------------------
export class ConsoleLogger extends ILogger
{
  Debug(...args: any[]) { console.debug(...args); }
  Info(...args: any[]) { console.info(...args); }
  Http(...args: any[]) { console.log(...args); }
  Fatal(...args: any[]) {
    console.error(...args);
    debugger;
  }
  Error(...args: any[]) {
    console.error(...args);
    // debugger;
  }
}

// -----------------------------------------------------------------------------
export const Logger = new ConsoleLogger();
export const DefaultLogger = Logger;