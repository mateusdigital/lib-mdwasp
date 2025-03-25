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
//  File      : ThrowIf.ts                                                    //
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
import {Error_LogicError, Error_CriticalError, ErrorType} from "./Exceptions";
// -----------------------------------------------------------------------------
import {MongoUtils} from "../DB/MongoUtils";

//
// Functions
//

// -----------------------------------------------------------------------------
export function ThrowCriticalErrorIf(condition: boolean, message: string): void
{
  if (condition) {
    throw new Error_CriticalError(message);
  }
}

// -----------------------------------------------------------------------------
export function ThrowNotFoundErrorIf(condition: boolean, message: string): void
{
  if (condition) {
    throw new Error_LogicError(message);
  }
}

// -----------------------------------------------------------------------------
export function ThrowLogicErrorIf(condition: boolean, message: string): void
{
  if (condition) {
    throw new Error_LogicError(message);
  }
}

//
//  Check Or Throw
//

// -----------------------------------------------------------------------------
export function ThrowIfNotValidObjectId(value: any)
{
  if (!MongoUtils.IsValidObjectId(value)) {
    throw new Error_LogicError(
      `Not a valid ObjectId: ${value}`,
      `Not a valid ObjectId: ${value}`,
    );
  }
}

// -----------------------------------------------------------------------------
export function ThrowIfEmptyOrNull(value: any, msg: string)
{
  // Check for null or undefined
  if (value == null) {
    throw new Error_LogicError(msg, "null or undefined");
  }

  // Check for strings
  if (typeof value === "string") {
    if (value.trim().length === 0) {
      throw new Error_LogicError(msg, "empty string");
    }
  }

  // Check for arrays
  else if (Array.isArray(value)) {
    if (value.length === 0) {
      throw new Error_LogicError(msg, "empty array");
    }
  }

  // Check for objects (including Maps and Sets)
  else if (value instanceof Map || value instanceof Set) {
    if (value.size === 0) {
      throw new Error_LogicError(msg, "empty map or set");
    }
  }
  else if (typeof value === "object") {
    if (Object.keys(value).length === 0) {
      throw new Error_LogicError(msg, "empty object");
    }
  }

  else if (typeof value === "number") {
    if (!value) {
      throw new Error_LogicError(msg, "zero");
    }
  }

  // Check for other types (optional)
  else {
    throw new Error_LogicError(msg, "unsupported type");
  }
}
