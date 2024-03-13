import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";

export const GetUser = createParamDecorator((data: string | undefined, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    if (!data) return request.user;
    return request.user[data];
},
);

export const GraphqlGetUser = createParamDecorator(
    (data: string | undefined, context: ExecutionContext) => {
        const ctx = GqlExecutionContext.create(context);
        if (!data) return ctx.getContext().req.user;
        return ctx.getContext().req.user[data];
    },
);
