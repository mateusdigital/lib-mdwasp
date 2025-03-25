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
//  File      : RouteUtils.ts                                                 //
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
import {Request, Response, NextFunction} from 'express';
import Joi from 'joi';
// -----------------------------------------------------------------------------
import {Assert} from "../Assert";
import {Error_RequestValidationError} from '../ErrorUtils/Exceptions';

//
// Public Functions
//

// -----------------------------------------------------------------------------
export function SetupCrudRoutesWithModel(modelObject: any, app: any)
{
  const model_name = modelObject.modelName;

  // --- Create ----------------------------------------------------------------
  app.post(`/crud/${model_name}`, async (req: any, res: any) => {
    try {
      const model = await modelObject.create(req.body);
      res.status(201).json(model);
    }
    catch (err: any) {
      res.status(400).json({error : err.message});
    }
  });

  // --- Get All --------------------------------------------------------------
  app.get(`/crud/${model_name}`, async (req: any, res: any) => {
    try {
      const models = await modelObject.find();
      res.json(models);
    }
    catch (err: any) {
      res.status(500).json({error : err.message});
    }
  });

  // --- Get By Id ------------------------------------------------------------
  app.get(`/crud/${model_name}/:id`, async (req: any, res: any) => {
    try {
      const models = await modelObject.findById(req.params.id);
      if (!models)
        return res.status(404).json({error : `${model_name} not found`});
      res.json(models);
    }
    catch (err: any) {
      res.status(500).json({error : err.message});
    }
  });

  // --- Update ---------------------------------------------------------------
  app.put(`/crud/${model_name}/:id`, async (req: any, res: any) => {
    try {
      const models = await modelObject.findByIdAndUpdate(
        req.params.id, req.body, {new : true});
      if (!models)
        return res.status(404).json({error : `${model_name} not found`});
      res.json(models);
    }
    catch (err: any) {
      res.status(400).json({error : err.message});
    }
  });

  // --- Delete ----------------------------------------------------------------
  app.delete(`/crud/${model_name}/:id`, async (req: any, res: any) => {
    try {
      const models = await modelObject.findByIdAndDelete(req.params.id);
      if (!models)
        return res.status(404).json({error : `${model_name} not found`});
      res.json({message : `${model_name} deleted successfully`});
    }
    catch (err: any) {
      res.status(500).json({error : err.message});
    }
  });
}

// -----------------------------------------------------------------------------
export function SetupRoutesWithController(controller: any, app: any)
{
  Assert(controller, "Controller is null");
  Assert(
    controller.routes,
    "Controller routes are null - Did set them as static on the controller?");

  const async_handler  = (fn: any) =>
    (req: any,
     res: any,
     next: any)       => { Promise.resolve(fn(req, res, next)).catch(next); };

  for (const route of controller.routes) {
    if (route.method === 'post') {
      if (route.schema) {
        app.post(`/api${route.route}`,
                 _ValidateRequest({body : route.schema}),
                 async_handler(route.handler));
      }
      else {
        app.post(`/api${route.route}`, async_handler(route.handler));
      }
    }
    else if (route.method === 'get') {
      if (route.schema) {
        app.get(`/api${route.route}`,
                _ValidateRequest({params : route.schema}),
                async_handler(route.handler));
      }
      else {
        app.get(`/api${route.route}`, async_handler(route.handler));
      }
    }
    else if (route.method === 'delete') {
      if (route.schema) {
        app.delete(`/api${route.route}`,
                   _ValidateRequest({params : route.schema}),
                   async_handler(route.handler));
      }
      else {
        app.delete(`/api${route.route}`, async_handler(route.handler));
      }
    }
  }
}

//
// Private Functions
//

// -----------------------------------------------------------------------------
function _ValidateRequest(schemas: {
  body?: Joi.ObjectSchema,
  params?: Joi.ObjectSchema,
  query?: Joi.ObjectSchema
})
{
  return (req: Request, res: Response, next: NextFunction) => {
    const validation_errors: string[] = [];

    if (schemas.body) {
      const {error} = schemas.body.validate(req.body, {abortEarly : false});
      if (error) {
        validation_errors.push(...error.details.map((e: any) => e.message))
      };
    }

    if (schemas.params) {
      const {error} = schemas.params.validate(req.params, {abortEarly : false});
      if (error) {
        validation_errors.push(...error.details.map((e: any) => e.message))
      };
    }

    if (schemas.query) {
      const {error} = schemas.query.validate(req.query, {abortEarly : false});
      if (error)
        validation_errors.push(...error.details.map((e: any) => e.message));
    }

    if (validation_errors.length > 0) {
      throw new Error_RequestValidationError(validation_errors);
    }

    next();
  };
}
