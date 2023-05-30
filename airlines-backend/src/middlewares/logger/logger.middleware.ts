import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { getLog } from './utils';
import { AppLogger } from './logger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private logger: AppLogger) {}

  use(req: Request, res: Response, next: NextFunction) {
    const { url, method, body } = req;

    const start = new Date().getTime();

    const oldJson = res.json;

    res.json = (body) => {
      res.locals.body = body;
      return oldJson.call(res, body);
    };

    res.on('finish', () => {
      const message = getLog({
        date: new Date().toUTCString(),
        duration: `${(new Date().getTime() - start).toString()} ms`,
        url,
        method,
        queryParams: JSON.stringify(req.params),
        body: JSON.stringify(body),
        statusCode: res.statusCode,
        resBody: JSON.stringify(res.locals.body),
      });

      if (res.statusCode === 500) {
        this.logger.error(message);
        return;
      }

      this.logger.log(message);
    });

    next();
  }
}
