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
import mongoose from "mongoose";
// -----------------------------------------------------------------------------
import { Assert } from "../Assert";
import { Logger } from "../Logger";
import { Error_LogicError } from "../ErrorUtils/Exceptions";


//
// Types
//

// -----------------------------------------------------------------------------
export type SoftObjectId = mongoose.ObjectId | string | unknown;

//
// Class
//

// -----------------------------------------------------------------------------
interface ConnectionOptions {
  MONGO_URI: string,
  MONGO_USER: string,
  MONGO_PASSWORD: string,
  PORT: string | number
}


// -----------------------------------------------------------------------------
export class MongoUtils {

  //
  //
  //

  // ---------------------------------------------------------------------------
  static IdEqual(id1: SoftObjectId, id2: SoftObjectId) {
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
  static async MakeMongooseConnect(options: ConnectionOptions,
    onConnected: any = (port: number) => { },
    onError: any = (err: any) => { }) {
    //
    Assert(options.MONGO_URI, `==> Missing MONGO_URI`, options);
    Assert(options.MONGO_USER, "==> Missing MONGO_USER", options);
    Assert(options.MONGO_PASSWORD, "==> Missing MONGO_PASSWORD", options);
    Assert(options.PORT, "==> Missing PORT", options);

    //
    const api_port = Number(options.PORT);

    const mongo_uri = options.MONGO_URI as string;
    const mongo_user = options.MONGO_USER as string;
    const mongo_password = options.MONGO_PASSWORD as string;

    const conn_str = mongo_uri
      .replace("MONGO_PASSWORD", mongo_password)
      .replace("MONGO_USER", mongo_user);

    //
    Logger.Debug(`Starting to connect to MongoDB`);
    Logger.Debug(`Mongo Url:      ${mongo_uri}`);
    Logger.Debug(`Api Port:       ${api_port}`);
    Logger.Debug(`Mongo User:     ${mongo_user}`);
    Logger.Debug(`Mongo Password: ${mongo_password}`);
    Logger.Debug(`Connection Str: ${conn_str}`);

    try {
      await mongoose.connect(conn_str)
      Logger.Info("Connected to MongoDB");
      onConnected(api_port);

    } catch (err: any) {
      Logger.Fatal(`Error connecting to MongoDB: ${err}`);
      onError(err);
    };
  }

  //
  // Helpers
  //

  // ---------------------------------------------------------------------------
  static IsValidObjectId(id: any) {
    const is_valid = mongoose.Types.ObjectId.isValid(id);
    return is_valid;
  }
}

//
// Throw If
//

// -----------------------------------------------------------------------------
export function ThrowIfNotValidObjectId(value: any) {
  if (!MongoUtils.IsValidObjectId(value)) {
    throw new Error_LogicError(
      `Not a valid ObjectId: ${value}`,
      `Not a valid ObjectId: ${value}`,
    );
  }
}
