import * as jwt from "jsonwebtoken";

export interface AuthTokenPayload {
    userId: number;
}

export const decodeAuthHeader = (authHeader: String): AuthTokenPayload => {
    const token = authHeader.replace("Bearer ", "");

    if(!token) {
        throw new Error("No Token found or Incorrect Token");
    }

    return jwt.verify(token, process.env.APP_SECRET as jwt.Secret) as AuthTokenPayload;
}