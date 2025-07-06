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
//  File      : MongoUtils.ts                                                 //
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
import {Assert} from "../Assert";
import {Logger} from "../Logger";
import { Error_LogicError } from "../ErrorUtils/Exceptions";

//
// Types
//

// -----------------------------------------------------------------------------
export type SoftObjectId = mongoose.ObjectId|string|unknown;

//
// Class
//

// -----------------------------------------------------------------------------
export class MongoUtils
{

  //
  //
  //

  // ---------------------------------------------------------------------------
  static IdEqual(id1: SoftObjectId, id2: SoftObjectId)
  {
    if (id1 === id2) {
      return true;
    }

    const s1 = (id1 as any).toString()
    const s2 = (id2 as any).toString();

    return s1 == s2;
  }

  //
  // Connection
  //

  // ---------------------------------------------------------------------------
  static MakeMongooseConnect(appObj: any,
                             mongooseObj: any,
                             envObj: any,
                             packageJson: any,
                             onConnected: any,
                             onError: any)
  {
    //
    Assert(envObj.MONGO_URI, "==> Missing envObj.MONGO_URL");
    Assert(envObj.MONGO_USER, "==> Missing envObj.MONGO_USER");
    Assert(envObj.MONGO_PASSWORD, "==> Missing envObj.MONGO_PASSWORD");

    //
    const api_port = 3000; // META_PORTS.GetServicePort(packageJson.name);

    const mongo_uri      = envObj.MONGO_URI as string;
    const mongo_user     = envObj.MONGO_USER as string;
    const mongo_password = envObj.MONGO_PASSWORD as string;

    const conn_str = mongo_uri.replace("MONGO_PASSWORD", mongo_password)
                       .replace("MONGO_USER", mongo_user);

    //
    Logger.Debug(`Starting to connect to MongoDB`);
    Logger.Debug(`Mongo Url:      ${mongo_uri}`);
    Logger.Debug(`Api Port:       ${api_port}`);
    Logger.Debug(`Mongo User:     ${mongo_user}`);
    Logger.Debug(`Mongo Password: ${mongo_password}`);
    Logger.Debug(`Connection Str: ${conn_str}`);

    //
    mongooseObj.connect(conn_str)
      .then(() => {
        //
        MongoUtils._OnMongooseConnected(appObj, api_port, conn_str, onConnected);
      })
      .catch((err: any) => {
        //
        MongoUtils._OnMongooseError(err, onError);
      });
  }

  //
  // Private Functions
  //

  // ---------------------------------------------------------------------------
  static _OnMongooseConnected(appObj: any,
                              api_port: any,
                              conn_str: any,
                              onConnectedCallback: any)
  {
    Logger.Info("Connected to MongoDB");
    Logger.Debug(`Connection String: ${conn_str}`);

    //
    onConnectedCallback(appObj, api_port);
  }

  // ---------------------------------------------------------------------------
  static _OnMongooseError(err: any, onErrorCallback: any)
  {
    Logger.Fatal(`Error connecting to MongoDB: ${err}`);
    onErrorCallback(err);
  }

  //
  // Helpers
  //

  // ---------------------------------------------------------------------------
  static IsValidObjectId(id: any)
  {
    const is_valid = mongoose.Types.ObjectId.isValid(id);
    return is_valid;
  }
}

//
// Throw If
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
