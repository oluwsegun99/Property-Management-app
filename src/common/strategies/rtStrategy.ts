import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";


@Injectable()
export class RtStrategy extends PassportStrategy(Strategy, "jwt-refresh") {
    constructor(config: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.get("REFRESH_SECRET"),
            passReqToCallback: true,
        });
    };

    validate(req: Request, payload: any) {
        const refreshToken = req.get("authorization").replace("Bearer", "").trim();
        return {
            ...payload,
            refreshToken,
        };
    };
}