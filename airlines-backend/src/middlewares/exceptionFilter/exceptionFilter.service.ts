import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { AppLogger } from '../logger/logger.service';

@Catch()
export class CustomExceptionFilter implements ExceptionFilter {
  constructor(private logger: AppLogger) {}

  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const statusCode =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const errorMessage =
      exception instanceof HttpException
        ? (exception.getResponse() as { message: string })
        : 'Internal server error';

    if (!(exception instanceof HttpException)) {
      this.logger.error(`Internal server error stack: ${exception.stack}`);
    }

    response.status(statusCode).json({
      statusCode,
      errorMessage,
    });
  }
}
