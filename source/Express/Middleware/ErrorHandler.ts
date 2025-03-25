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
//  File      : ErrorHandler.ts                                               //
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
import {NextFunction, Request, Response} from 'express';
// -----------------------------------------------------------------------------
import {Error_Base, ErrorType} from "../../ErrorUtils/Exceptions";
import {ResponseStatus} from '../../Net/ResponseStatus';

// -----------------------------------------------------------------------------
export function _ErrorHandler(
  err: Error_Base, req: Request, res: Response, next: NextFunction)
{
  if (err.errorType == ErrorType.LogicError) {
    ResponseStatus.BadRequest(req, res, err.message);
  }
  else {
    ResponseStatus.InternalServerError(req, res, err);
  }

  next();
}

// -----------------------------------------------------------------------------
export function SetupErrorHandler(app: any) { app.use(_ErrorHandler); }
