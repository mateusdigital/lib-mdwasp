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
//  File      : NetUtils.ts                                                   //
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
import {Error_CriticalError} from "../ErrorUtils/Exceptions";

//
// Public Functions
//

// ---------------------------------------------------------------------------
export function MakeAPIUrl(baseUrl: string, endpoint: string, ...data: any)
{
  const replaced  = _ReplaceArgs(endpoint, ...data);
  const final_url = `${baseUrl}/${replaced}`;
  return final_url;
}

//
// Private Functions
//

// ---------------------------------------------------------------------------
function _ReplaceArgs(url: string, ...args: any)
{
  try {
    const components           = url.split("/");
    const replaced: Array<any> = [];

    let   arg_index = 0;
    for (let i = 0; i < components.length; ++i) {
      const component = components[i];
      if (component.startsWith(":")) {
        if (arg_index < args.length) {
          const value = args[arg_index];
          replaced.push(value);
          ++arg_index;
        }
      }
      else if (component.length != 0) {
        replaced.push(component);
      }
    }

    return replaced.join("/");
  }
  catch (error) {
    // TODO: Logger
    throw Error_CriticalError.FromCatchClauseError(error);
  }
}
