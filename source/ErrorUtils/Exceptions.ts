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
//  File      : Exceptions.ts                                                 //
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
import JsonUtils from "../JsonUtils";

//
// Enums
//

// -----------------------------------------------------------------------------
export enum ErrorType {
  LogicError     = "LogicError",
  CriticalError  = "CriticalError",
  AssertionError = "AssertionError",
}

//
// Exceptions
//

// -----------------------------------------------------------------------------
export class Error_Base extends Error
{
  // ---------------------------------------------------------------------------
  errorPayload: string;
  errorType: ErrorType;

  // ---------------------------------------------------------------------------
  constructor(message: string,
              payload: any         = {},
              errorType: ErrorType = ErrorType.CriticalError)
  {
    super(message);

    this.errorPayload = JsonUtils.Serialize(payload);
    this.errorType    = errorType;
  }
}

// -----------------------------------------------------------------------------
export class Error_CriticalError extends Error_Base
{
  // ---------------------------------------------------------------------------
  static FromCatchClauseError(error: any)
  {
    const payload = JsonUtils.Serialize(error);
    const result  = new Error_CriticalError(error.message, payload);

    return result;
  }

  // ---------------------------------------------------------------------------
  constructor(message: string, payload: any = {})
  {
    super(message, payload, ErrorType.CriticalError);
    this.name = "Critical Error";
  }
}

// -----------------------------------------------------------------------------
export class Error_LogicError extends Error_Base
{
  // ---------------------------------------------------------------------------
  constructor(message: string, payload: any = {})
  {
    super(message, payload, ErrorType.LogicError);
    this.name = "LogicError";
  }
}
// -----------------------------------------------------------------------------
export class Error_Assert extends Error_Base
{
  // ---------------------------------------------------------------------------
  constructor(message: string, payload: any = {})
  {
    super(message, payload, ErrorType.AssertionError);
    this.name = "Assert Failed";
  }
}

// -----------------------------------------------------------------------------
export class Error_RequestValidationError extends Error_Base
{
  // ---------------------------------------------------------------------------
  constructor(validationErrors: any)
  {
    super("request validation error", validationErrors, ErrorType.CriticalError);
    this.name = "Request Validation Error";
  }
}
