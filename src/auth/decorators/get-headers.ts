import { createParamDecorator, ExecutionContext } from '@nestjs/common';




export const HttpHeaders = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const headers = request.headers;
    const log = {
      xFordwarderFor:headers['x-forwarded-for'],
      aceptLanguage: headers['accept-language'],
      userAgent: headers['user-agent']
    };
    return log;
  },
);