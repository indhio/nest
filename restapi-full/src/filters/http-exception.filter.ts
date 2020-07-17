import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { BusinessException } from '../exceptions/business.exception';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {

    catch(exception: HttpException, host: ArgumentsHost) {

        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const status = exception.getStatus();

        if (exception instanceof BusinessException && exception.message !== '') {
            response
                .status(status)
                .json({
                    statusCode: status,
                    timestamp: new Date().toISOString(),
                    path: request.url,
                    message: exception.message,
                });
        } else {

            response
                .status(status)
                .json({
                    statusCode: status,
                    timestamp: new Date().toISOString(),
                    path: request.url,
                    message: `Ops! Aconteceu um erro inesperado. Tente novamente mais tarde!`,
                });
        }
    }
}
