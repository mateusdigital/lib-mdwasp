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
//  File      : App.ts                                                        //
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
import cors from "cors";
import express from "express";
import path from "path"
// -----------------------------------------------------------------------------
import {Logger} from "../Logger";
import {SetupHttpLogger} from "./Middleware/HTTPLogger";
// -----------------------------------------------------------------------------
import {
  SetupHeathCheckRoutes,
  SetupServiceInfoPage
} from "../Routes/DefaultRoutes";

//
// Cors
//

// -----------------------------------------------------------------------------
const _CORS_OPTIONS_DEFAULT = {
  origin : "*", // process.env.CORS_ALLOWED_URL,
  methods : "GET,POST,PUT,DELETE, PATCH",
  allowedHeaders : "Content-Type,Authorization",
};

//
// Globals
//

// -----------------------------------------------------------------------------
let g_ExpressApp: any = null;

//
// Class
//

// -----------------------------------------------------------------------------
export class App
{

  // ---------------------------------------------------------------------------
  public static GetExpressApp(): any { return g_ExpressApp; }

  // ---------------------------------------------------------------------------
  public static StartListen(apiPort: number)
  {
    Logger.Debug(`Starting listening on port ${apiPort}`);

    const hosturl = `http://localhost:${apiPort}`;
    g_ExpressApp.listen(apiPort, () => {
      Logger.Info(`Server running on port ${apiPort}`);
      Logger.Info(`Server is available at ${hosturl}`);

      this.PrintRoutes(hosturl);
    });
  }

  // ---------------------------------------------------------------------------
  public static Init({corsOptions, publicPath, packageJson}: any)
  {
    g_ExpressApp = express();
    g_ExpressApp.use(cors(corsOptions || _CORS_OPTIONS_DEFAULT));

    // Middleware
    g_ExpressApp.use(express.json());

    // Logger
    SetupHttpLogger(g_ExpressApp);

    // Others
    SetupHeathCheckRoutes(
      g_ExpressApp, {packageJson, env : process.env}, "/api");

    SetupServiceInfoPage(g_ExpressApp, path.join(publicPath, "index.html"));
  }

  // ---------------------------------------------------------------------------
  public static PrintRoutes(base: string = "")
  {
    Logger.Debug("------------------------");
    Logger.Info("Api Routes:");

    for (let i = 0; i < g_ExpressApp._router.stack.length; i++) {
      let middleware = g_ExpressApp._router.stack[i];

      //
      if (middleware.route) {
        let route   = middleware.route;
        let methods = Object.keys(route.methods).join(', ').toUpperCase();

        Logger.Info(methods + ' ' + base + route.path);
      }
      //
      else if (middleware.name === 'router') {
        let stack = middleware.handle.stack;

        for (let j = 0; j < stack.length; j++) {
          let handler = stack[j];
          let route   = handler.route;

          if (route) {
            let methods = Object.keys(route.methods).join(', ').toUpperCase();
            Logger.Info(methods + ' ' + base + route.path);
          }
        }
      }
    }
  }
}
