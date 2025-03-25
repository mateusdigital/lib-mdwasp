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
//  File      : ResponseStatus.ts                                             //
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
import {Request, Response} from "express";
import {StatusCodes} from "http-status-codes";
// -----------------------------------------------------------------------------
import {BaseResponse} from "./Request/BaseResponseModel";
import {Error_Base} from "../ErrorUtils/Exceptions";
import {IS_PRODUCTION_ENVIRONMENT} from "../Environments";

//
// Class
//

// -----------------------------------------------------------------------------
export class ResponseStatus
{
  // ---------------------------------------------------------------------------
  static OK(req: Request,
            res: Response,
            responsePayload: any,
            baseResponseMessage: string = "")
  {
    return _MakeResponse(
      res,
      responsePayload,
      {statusCode : StatusCodes.OK, message : baseResponseMessage});
  }

  // ---------------------------------------------------------------------------
  static Created(req: Request,
                 res: Response,
                 responsePayload: any,
                 baseResponseMessage: string = "")
  {
    return _MakeResponse(
      res,
      responsePayload,
      {statusCode : StatusCodes.CREATED, message : baseResponseMessage});
  }

  // ---------------------------------------------------------------------------
  static Forbidden(req: Request, res: Response, errorMessage: string)
  {
    return _MakeResponse(
      res,
      {}, // responsePayload
      {success : false, statusCode : StatusCodes.FORBIDDEN, errorMessage});
  }

  // ---------------------------------------------------------------------------
  static NotFound(req: Request,
                  res: Response,
                  errorMessage: string,
                  responsePayload: any = {})
  {
    return _MakeResponse(
      res,
      responsePayload,
      {success : false, statusCode : StatusCodes.NOT_FOUND, errorMessage});
  }

  // ---------------------------------------------------------------------------
  static NotImplemented(req: Request,
                        res: Response,
                        errorMessage: string,
                        responsePayload: any = {})
  {
    return _MakeResponse(
      res,
      responsePayload,
      {success : false, statusCode : StatusCodes.NOT_IMPLEMENTED, errorMessage});
  }

  // ---------------------------------------------------------------------------
  static BadRequest(req: Request,
                    res: Response,
                    errorMessage: string,
                    responsePayload: object = {})
  {
    return _MakeResponse(
      res,
      responsePayload,
      {success : false, statusCode : StatusCodes.BAD_REQUEST, errorMessage});
  }

  // ---------------------------------------------------------------------------
  static InternalServerError(req: Request, res: Response, error: Error_Base|any)
  {
    return _MakeResponse(res,
                         // responsePayload
                         {},
                         // baseResponseInitOptions
                         {
                           success : false,
                           statusCode : StatusCodes.INTERNAL_SERVER_ERROR,
                           errorMessage : error.message,
                           errorType : error.errorType,
                           errorPayload : error.errorPayload
                         });
  }

  // ---------------------------------------------------------------------------
  static Unauthorized(req: Request,
                      res: Response,
                      errorMessage: string,
                      responsePayload: any = {})
  {
    return _MakeResponse(
      res,
      responsePayload,
      {success : false, statusCode : StatusCodes.UNAUTHORIZED, errorMessage});
  }
}

// -----------------------------------------------------------------------------
export default ResponseStatus;

//
// Private Functions
//

// -----------------------------------------------------------------------------
function _MakeResponse(
  res: Response, responsePayload: any, baseResponseInitOptions: any)
{
  const base_response = new BaseResponse(baseResponseInitOptions);
  if (IS_PRODUCTION_ENVIRONMENT()) {
    return res.status(baseResponseInitOptions.statusCode);
  }

  return res.status(baseResponseInitOptions.statusCode)
    .json({baseResponse : base_response, payload : responsePayload});
}
