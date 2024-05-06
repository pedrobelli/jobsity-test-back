import { HttpException, HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';

import { NextFunction, Request, Response } from 'express';

import { decode } from '../shared/handlers/token-handler';

const NOT_AUTHORIZED = 'Not authorized.';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const authHeaders = req.headers.authorization;

    if (authHeaders && (authHeaders as string).split(' ')[1]) {
      const token = (authHeaders as string).split(' ')[1];
      let decoded: any;

      try {
        decoded = decode(token, process.env.AUTH_SECRET_KEY);
      } catch (error) {
        throw new HttpException(NOT_AUTHORIZED, HttpStatus.UNAUTHORIZED);
      }

      next();
    } else {
      throw new HttpException(NOT_AUTHORIZED, HttpStatus.UNAUTHORIZED);
    }
  }
}
