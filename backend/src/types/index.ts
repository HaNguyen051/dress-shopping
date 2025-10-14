import { Request } from 'express';
import type { UserInstance } from '../models/User';

export interface AuthRequest extends Request {
    user?: UserInstance;
}