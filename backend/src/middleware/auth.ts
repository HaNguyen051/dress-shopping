import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import User, { UserInstance } from "../models/User";
interface DecodedToken {
    id: number;
}

interface AuthRequest extends Request {
    user?: UserInstance;
}

const auth = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({ err: "Unauthorized" });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;
        const user = await User.findByPk(decoded.id);
        if (!user) {
            return res.status(401).json({ err: "Unauthorized" });
        }
        req.user = user;
        next();
    }
    catch (err) {
        res.status(401).json({ err: "Unauthorized" });
    }
}

export default auth;