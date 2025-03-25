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
//  File      : TransactionMiddleware.ts                                      //
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
import mongoose from "mongoose";
// -----------------------------------------------------------------------------
import {Request, Response, NextFunction} from "express";

// -----------------------------------------------------------------------------
export interface IRequestWithSession extends Request {
  DB_SESSION: mongoose.ClientSession;
}
;

// -----------------------------------------------------------------------------
export async function TransactionMiddleware(
  req: Request, res: Response, next: NextFunction)
{
  const session = await mongoose.startSession();
  session.startTransaction();

  (req as IRequestWithSession).DB_SESSION = session;

  try {
    await next();
    await session.commitTransaction();
  }
  catch (error) {
    await session.abortTransaction();
    console.error("Transaction rolled back due to error:", error);
  }
  finally {
    session.endSession();
  }
};
