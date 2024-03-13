import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";

export const GetUserId = createParamDecorator((data: undefined, context: ExecutionContext): string => {
    const request = context.switchToHttp().getRequest();
    return request.user["sub"]; //I don't understand what this does
},
);

// export const GraphqlGetUserId = createParamDecorator(
//     (data: undefined, context: ExecutionContext): string => {
//         const ctx = GqlExecutionContext.create(context).getContext()
//         return ctx.req.user["sub"];
//     }
// );

export const GraphqlGetUserId = createParamDecorator(
    (data: unknown, context: ExecutionContext) => {
        const ctx = GqlExecutionContext.create(context);
        return ctx.getContext().req.user["sub"];
    },
);
