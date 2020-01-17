import { ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    intercept(
        context: ExecutionContext,
        call$: Observable<any>,
    ): Observable<any> {
        const now = Date.now();
        return call$.pipe(
            tap(() => console.log(`${Date.now() - now}ms | ${context.getArgs()[0].method} => ${context.getArgs()[0].originalUrl}`)),
        );
    }
}