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
//  File      : BaseResponseModel.ts                                          //
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
export class BaseResponse
{
  // ---------------------------------------------------------------------------
  public success:    boolean = false;
  public statusCode: number  = 0;
  public timestamp:  number  = Date.now();
  //
  public errorMessage?: string|undefined = undefined;
  public errorCode?:    number|undefined = undefined;
  public errorPayload?: any|undefined    = undefined;

  // ---------------------------------------------------------------------------
  constructor({
    success      = true,
    timestamp    = Date.now(),
    statusCode   = 0,
    errorMessage = undefined,
    errorCode    = undefined,
    errorPayload = undefined,
  }: Partial<BaseResponse> = {})
  {
    this.success    = success;
    this.statusCode = statusCode;
    this.timestamp  = timestamp;
    //
    this.errorMessage = errorMessage;
    this.errorCode    = errorCode;
    this.errorPayload = errorPayload;
  }
}

// -----------------------------------------------------------------------------
export default BaseResponse;
