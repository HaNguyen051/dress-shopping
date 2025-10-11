import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { Request, Response } from 'express';
import User, { UserInstance } from '../models/User';


interface LoginRequest {
    email: string;
    password: string;
}
interface RegisterRequest {
    fullName: string;
    email: string;
    password: string;
    phone: number
    address: string;



}


// phat trien sau


// interface RefreshTokenRequest {
//     refreshToken: string;
// }
// interface ChangePasswordRequest {
//     userId: string;
//     oldPassword: string;
//     newPassword: string;
// }
// interface ResetPasswordRequest {
//     email: string;
//     newPassword: string;
//     resetToken: string;
//}
// interface VerifyEmailRequest {
//     email: string;
//     verificationCode: string;
// }
// interface DeleteAccountRequest {
//     userId: string;
//     password: string;
// }



// PORT / api/users/register
export const register = async (req: Request<{}, {}, RegisterRequest>, res: Response) => {
    try {
        const { fullName, email, password, phone, address } = req.body;
        // kiem tra email da ton tai chua trong database 
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use' });
        }
        // tao nguoi dung moi
        const newUser = await User.create(
            {
                fullName,
                email,
                password,
                phone,
                address,
            }
        );
        const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
        res.status(200).json({ user: { id: newUser.id, name: newUser.fullName, email: newUser.email }, token });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Server error' });
    }

}

// PORT / api/users/login
export const login = async (req: Request<{}, {}, LoginRequest>, res: Response) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
        res.json({ user: { id: user.id, name: user.fullName, email: user.email }, token });
    } catch (error) {
        console.error('Login error:   ', error);
        res.status(500).json({ message: 'Server error' });
    }
}
// GET / api/users/getUserById
export const getUserById = async (req: AuthRequest, res: Response) => {
    try {
        const userId = await User.findByPk(req.params.id, { attributes: ['id', 'fullName', 'email', 'phone', 'address', 'role'] });
        if (!userId) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(userId);
    }
    catch (error) {
        console.error('Get user error:   ', error);
        res.status(500).json({ message: 'Server error' });
    }
}
//GET/ api/users/getAllUsers
export const getAllUsers = async (req: AuthRequest, res: Response) => {
    try {
        const users = await User.findAll({ attributes: ['id', 'fullName', 'email', 'phone', 'address', 'role'] });
        res.status(200).json(users);
    }
    catch (error) {
        console.error('Get all users error:   ', error);
        res.status(500).json({ message: 'Server error' });
    }
}
// PUT / api/users/updateUser
// export const updateUser = async (req: AuthRequest, res: Response) => {
//   try {
//     const user = await User.findByPk(req.params.id);
//     if (!user) {
//       return res.status(404).json({ error: 'User not found' });
//     }
//     if (req.user?.id !== user.id) {
//       return res.status(403).json({ error: 'Not authorized' });
//     }

//     await user.update(req.body);
//     res.json({ 
//       message: 'User updated', 
//       user: { id: user.id, name: user.fullName, email: user.email } 
//     });
//   } catch (error: any) {
//     res.status(500).json({ error: error.message });
//   }
// };
// export const deleteUser = async (req: AuthRequest, res: Response) => {
//   try {
//     const user = await User.findByPk(req.params.id);
//     if (!user) {
//       return res.status(404).json({ error: 'User not found' });
//     }
//     if (req.user?.id !== user.id) {
//       return res.status(403).json({ error: 'Not authorized' });
//     }

//     await user.destroy();
//     res.json({ message: 'User deleted' });
//   } catch (error: any) {
//     res.status(500).json({ error: error.message });
//   }
// };
interface AuthRequest extends Request {
    user?: UserInstance;
}