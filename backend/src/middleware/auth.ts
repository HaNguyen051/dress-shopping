import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import User, { UserInstance } from "../models/User";


interface AuthRequest extends Request {
    user?: UserInstance;
}
interface JWTPayload {
    type: string;
    id: number;
    iat: number;
    exp: number;
}

const auth = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ err: "No token provided" });
        }
        const token = authHeader.substring(7); // Remove "Bearer " prefix

        const decode = jwt.verify(token, process.env.JWT_SECRET as string) as JWTPayload;
        if (decode.type !== 'access') {
            return res.status(401).json({ err: "Invalid token type" });
        }
        const user = await User.findByPk(decode.id);
        if (!user) {
            return res.status(401).json({ err: "User not found" });
        }
        req.user = user;
        next();

    }
    catch (err) {
        res.status(401).json({ err: "Unauthorized" });
    }
}
export const isAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
    if (req.user?.role !== 'admin') {
        return res.status(403).json({ err: "Forbidden" });
    }
    next();
}
export const isEmailVerified = (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user?.isEmailVerified) {
        return res.status(403).json({ err: "Email not verified" });
    }
    next();
}
export default auth;