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
//  File      : DTOUtils.ts                                                   //
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
import "reflect-metadata";

//
// Constants
//

// -----------------------------------------------------------------------------
export const DTO_METADATA_KEY = Symbol("dto_metadata");

//
// Decorators
//

// -----------------------------------------------------------------------------
export function DTO(options: {remove?: boolean} = {})
{
  return function(target: any, propertyKey: string) {
    // Retrieve existing metadata or initialize an empty object
    const existing_metadata =
      Reflect.getMetadata(DTO_METADATA_KEY, target) || {};

    // Store the new property metadata
    existing_metadata[propertyKey] = options;

    // Update metadata for the class
    Reflect.defineMetadata(DTO_METADATA_KEY, existing_metadata, target);
  };
}
