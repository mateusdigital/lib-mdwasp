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
//  File      : JsonUtils.ts                                                  //
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
import JSON5 from "json5";

// -----------------------------------------------------------------------------
export class JsonUtils
{
  // ---------------------------------------------------------------------------
  static Serialize(data: any, formatted = false)
  {
    const spaces  = formatted ? 2 : 0;
    const content = JSON.stringify(data, null, spaces);

    return content;
  }

  // ---------------------------------------------------------------------------
  static Deserialize(data: string)
  {
    const json_object = JSON5.parse(data);
    return json_object;
  }
}

// -----------------------------------------------------------------------------
export default JsonUtils;
