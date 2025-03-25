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
//  File      : RouteDecorators.ts                                            //
//  Project   : mdweb                                                         //
//  Date      : 2025-03-24                                                    //
//  License   : See project's COPYING.TXT for full info.                      //
//  Author    : mateus.digital <hello@mateus.digital>                         //
//  Copyright : mateus.digital - 2025                                         //
//                                                                            //
//  Description :                                                             //
//                                                                            //
//----------------------------------------------------------------------------//
import Joi from "joi";

//
// Types
//

// -----------------------------------------------------------------------------
interface IRouteOptions
{
  route?: string;
  schema?: any;
  useDBTransaction?: boolean;
}

// -----------------------------------------------------------------------------
function _DefaultRouteOptions(): IRouteOptions
{
  return {route : '/', schema : null, useDBTransaction : false};
}

//
// Decorators
//

// -----------------------------------------------------------------------------
export function GET(options: IRouteOptions = _DefaultRouteOptions())
{
  return function(
    target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    if (!target.routes) {
      target.routes = [];
    }

    const {route, schema, useDBTransaction} = options;
    target.routes.push({
      method : 'get',
      route,
      handler : descriptor.value,
      schema,
      useDBTransaction
    });
  };
}

// -----------------------------------------------------------------------------
export function POST(options: IRouteOptions = _DefaultRouteOptions())
{
  return function(
    target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    if (!target.routes) {
      target.routes = [];
    }

    const {route, schema, useDBTransaction} = options;

    target.routes.push({
      method : 'post',
      route,
      handler : descriptor.value,
      schema,
      useDBTransaction
    });
  };
}

// -----------------------------------------------------------------------------
export function DELETE(options: IRouteOptions = _DefaultRouteOptions())
{
  return function(
    target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    if (!target.routes) {
      target.routes = [];
    }

    const {route, schema, useDBTransaction} = options;

    target.routes.push({
      method : 'delete',
      route,
      handler : descriptor.value,
      schema,
      useDBTransaction
    });
  };
}
