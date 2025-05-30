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
//  File      : DefaultRoutes.ts                                              //
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
import ResponseStatus from "../Net/ResponseStatus";

//
//
//

// -----------------------------------------------------------------------------
export function SetupHeathCheckRoutes(
  app: any, appInfo: any, baseEndpoint: string)
{
  const payload = {
    version : appInfo.packageJson.version,
    commit : appInfo.env.COMMIT_SHA,
    buildType : appInfo.env.BUILD_TYPE,
    documentationUrl : appInfo.packageJson.documentationUrl,
    repositoryUrl : appInfo.packageJson.repositoryUrl,
  }

  const url = `${baseEndpoint}/health-check`;
  app.get(url, (req: any, res: any) => {
    //
    return ResponseStatus.OK(req, res, payload);
  });
}

// -----------------------------------------------------------------------------
export function SetupServiceInfoPage(app: any, filepath: string)
{
  app.get("/", (req: any, res: any) => { res.sendFile(filepath); });
}
