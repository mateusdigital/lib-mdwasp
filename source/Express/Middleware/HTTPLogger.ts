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
//  File      : HTTPLogger.ts                                                 //
//  Project   : mdwasp                                                         //
//  Date      : 2025-03-24                                                    //
//  License   : See project's COPYING.TXT for full info.                      //
//  Author    : mateus.digital <hello@mateus.digital>                         //
//  Copyright : mateus.digital - 2025                                         //
//                                                                            //
//  Description :                                                             //
//                                                                            //
//----------------------------------------------------------------------------//
// -----------------------------------------------------------------------------
import {randomUUID} from 'crypto';
// -----------------------------------------------------------------------------
import {NextFunction, Request, Response} from 'express';
// -----------------------------------------------------------------------------
import {Logger} from "../../Logger";
import {JsonUtils} from "../../JsonUtils";

// -----------------------------------------------------------------------------
export function _HttpLogger(req: Request, res: Response, next: NextFunction)
{
  //
  next();
}

// -----------------------------------------------------------------------------
export function SetupHttpLogger(app: any) { app.use(_HttpLogger); }
