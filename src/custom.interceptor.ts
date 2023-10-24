import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { map } from 'rxjs';

export class CustomInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, handler: CallHandler) {
    return handler.handle().pipe(
      map((data) => {
        console.log('THIS IS INTERCEPTING THE RESPONSE');

        const response = {
          ...data,
          createdAt: data.created_at,
        };
        console.log(response);

        delete response.updated_at;
        delete response.created_at;
        return response;
      }),
    );
  }
}
