// src/middleware/user-allowed.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class UserAllowedMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const isUserAllowed = req.headers['x-user-allowed'];
    console.log(req.body);
    if (isUserAllowed !== 'true') {
      res
        .status(403)
        .json({ message: 'User is not allowed to use this service.' });
    } else {
      next();
    }
  }
}
@Injectable()
export class createUserMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log(`Request logged: ${req.method} - ${req.url}`);
    next();
  }
}
