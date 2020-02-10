import { Response } from 'express';
import HTTPStatus from 'http-status';

import { Responder, ResponderOptions, triggerResponder } from './Responder';
import { Settings } from './settings';

export class ApiUnauthorized implements Responder {
  public static status: string = 'error';
  public static code: number = HTTPStatus.UNAUTHORIZED;

  public static respond(
    res: Response,
    message?: string,
    opt: ResponderOptions = {}
  ) {
    const { responseFormat = Settings.responseFormat, meta } = opt;
    const instance = new ApiUnauthorized(res, message, meta);
    return triggerResponder(instance, responseFormat);
  }

  private message: string;

  public meta: any;
  public res: Response;

  constructor(res: Response, message: string = 'Unauthorized', meta: any = {}) {
    this.message = message;
    this.meta = meta;
    this.res = res;
  }

  public get status() {
    return ApiUnauthorized.status;
  }

  public get code() {
    return ApiUnauthorized.code;
  }

  public raw() {
    this.res.status(this.code).send(this.message);
  }

  public jsend() {
    this.res.status(this.code).json({
      ...this.meta,
      status: this.status,
      message: this.message
    });
  }
}
