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
//  File      : Utils.ts                                                      //
//  Project   : mdweb                                                         //
//  Date      : 2025-03-24                                                    //
//  License   : See project's COPYING.TXT for full info.                      //
//  Author    : mateus.digital <hello@mateus.digital>                         //
//  Copyright : mateus.digital - 2025                                         //
//                                                                            //
//  Description :                                                             //
//                                                                            //
//----------------------------------------------------------------------------//

import {DTO_METADATA_KEY} from "./DTO/DTOUtils";
import {IS_PRODUCTION_ENVIRONMENT} from "./Environments";

export function As<T>(m: any): T { return m as T; }

// -----------------------------------------------------------------------------
export function SanitizeDTO<T extends Record<string, any>>(model: any,
                                                           ctor: {new (): T}): T
{
  const sanitized_object: Partial<T> = new ctor();
  const metadata = Reflect.getMetadata(DTO_METADATA_KEY, ctor.prototype) || {};

  for (const key of Object.keys(sanitized_object)) {
    if (key in model) {
      const options = metadata[key];
      if (options && options.remove && IS_PRODUCTION_ENVIRONMENT()) {
        delete (sanitized_object as any)[key];
        continue;
      }

      (sanitized_object as any)[key] = model[key];
    }
  }

  return As<T>(sanitized_object);
}

// ---------------------------------------------------------------------------
export function FromObject<T>(clonedObject: any, ctor: {new (): T}): T
{
  const obj = new ctor();
  for (const key of Object.keys(clonedObject)) {
    (obj as any)[key] = clonedObject[key];
  }
  return obj;
}

// -----------------------------------------------------------------------------
class Utils
{
  // ---------------------------------------------------------------------------
  static IsNumeric(str: any) { return !isNaN(str) && !isNaN(parseFloat(str)); }

  // ---------------------------------------------------------------------------
  static IsInteger(str: any)
  {
    if (!Utils.IsNumeric(str)) {
      return false;
    }

    return parseFloat(str) == parseInt(str);
  }

  // ---------------------------------------------------------------------------
  static IsRunningOnProduction(): boolean
  {
    return process.env.NODE_ENV === 'production';
  }
}

// -----------------------------------------------------------------------------
export default Utils;
