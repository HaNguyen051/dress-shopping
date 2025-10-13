import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import User, { UserInstance } from '../models/User';
import crypto from 'crypto';
import { isEmailVerified } from '../middleware/auth';
import { AuthRequest } from '../types';
import dotenv from 'dotenv';
dotenv.config()

interface LoginRequest {
    email: string;
    password: string;
}
interface RegisterRequest {
    fullName: string;
    email: string;
    password: string;
    phone: string
    address: string;
}

interface RefreshTokenRequest {
    refreshToken: string;
}
interface ChangePasswordRequest {
    oldPassword: string;
    newPassword: string;
}
interface ResetPasswordRequest {
    email: string;
}
interface VerifyEmailRequest {
    verificationToken: string;
}
interface DeleteAccountRequest {
    userId: string;
    password: string;
}
interface ConfirmResetPasswordRequest {
    token: string;
    newPassword: string;
    confirmPassword: string;
}
const generateAccessToken = (userId: number) => {
    return jwt.sign({ id: userId, type: 'access' }, process.env.JWT_SECRET!, { expiresIn: '15m' });
}
const generateRefreshToken = (userId: number) => {
    return jwt.sign({ id: userId, type: 'refresh' }, process.env.JWT_SECRET!, { expiresIn: '7d' });
}
const generateResetToken = (): string => {
    return crypto.randomBytes(32).toString('hex');
}
const generateEmailVerificationToken = (): string => {
    return crypto.randomBytes(32).toString('hex');
}
// POST /api/users/refresh-token
export const refreshToken = async (req: Request<{}, {}, RefreshTokenRequest>, res: Response) => {
    try {
        const { refreshToken } = req.body;

        if (!refreshToken) {
            return res.status(401).json({ message: 'Refresh token required' });
        }

        // Verify refresh token
        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET!) as { id: number, type: string };

        if (decoded.type !== 'refresh') {
            return res.status(401).json({ message: 'Invalid token type' });
        }

        // Check if user exists
        const user = await User.findByPk(decoded.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Generate new tokens
        const newAccessToken = generateAccessToken(user.id);
        const newRefreshToken = generateRefreshToken(user.id);

        res.json({
            accessToken: newAccessToken,
            refreshToken: newRefreshToken
        });
    } catch (error) {
        console.error('Refresh token error:', error);
        res.status(401).json({ message: 'Invalid or expired refresh token' });
    }
};

export const changePassword = async (req: AuthRequest, res: Response) => {
    try {
        const { oldPassword, newPassword } = req.body as ChangePasswordRequest;
        const userId = req.user?.id;

        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Verify old password
        const isValidPassword = await bcrypt.compare(oldPassword, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ message: 'Current password is incorrect' });
        }

        // Validate new password
        if (newPassword.length < 6) {
            return res.status(400).json({ message: 'New password must be at least 6 characters' });
        }

        // Hash and update password
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await user.update({ password: hashedPassword });

        res.json({ message: 'Password changed successfully' });
    } catch (error) {
        console.error('Change password error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
export const forgotPassword = async (req: Request<{}, {}, ResetPasswordRequest>, res: Response) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ where: { email } });
        if (!user) {
            // Don't reveal if user exists for security
            return res.json({ message: 'If the email exists, a reset link will be sent' });
        }

        // Generate reset token
        const resetToken = generateResetToken();
        const resetExpires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

        await user.update({
            passwordResetToken: resetToken,
            passwordResetTokenExpiry: resetExpires
        });

        // TODO: Send reset email with token
        // sendResetPasswordEmail(email, resetToken);

        res.json({
            message: 'If the email exists, a reset link will be sent',
            // Remove in production - only for testing
            resetToken: process.env.NODE_ENV === 'development' ? resetToken : undefined
        });
    } catch (error) {
        console.error('Forgot password error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
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
        const hashedPassword = await bcrypt.hash(password, 10);
        const verificationToken = generateEmailVerificationToken();
        const newUser = await User.create(
            {
                fullName,
                email,
                password: hashedPassword,
                phone,
                address,
                emailVerificationToken: verificationToken,
                emailVerificationTokenExpiry: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours from now
                isEmailVerified: false,
            }
        );
        const accessToken = generateAccessToken(newUser.id);
        const refreshToken = generateRefreshToken(newUser.id);
        res.status(200).json({
            user: {
                id: newUser.id,
                fullName: newUser.fullName,
                email: newUser.email,
                isEmailVerified: newUser.isEmailVerified,
            }, accessToken, refreshToken, message: 'User registered successfully. Please verify your email.'
        });
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
        const accessToken = generateAccessToken(user.id);
        const refreshToken = generateRefreshToken(user.id);
        res.json({
            user: {
                id: user.id,
                name: user.fullName,
                email: user.email,
                isEmailVerified: user.isEmailVerified
            }, accessToken, refreshToken
        });
    } catch (error) {
        console.error('Login error:   ', error);
        res.status(500).json({ message: 'Server error' });
    }
}
export const resetPassword = async (req: Request<{}, {}, ConfirmResetPasswordRequest>, res: Response) => {
    try {
        const { token, newPassword } = req.body;

        const user = await User.findOne({
            where: {
                passwordResetToken: token
            }
        });

        if (!user || !user.passwordResetTokenExpiry || user.passwordResetTokenExpiry < new Date()) {
            return res.status(400).json({ message: 'Invalid or expired reset token' });
        }

        // Validate new password
        if (newPassword.length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters' });
        }

        // Hash and update password
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await user.update({
            password: hashedPassword,
            passwordResetToken: null,
            passwordResetTokenExpiry: null
        });

        res.json({ message: 'Password has been reset successfully' });
    } catch (error) {
        console.error('Reset password error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
export const verifyEmail = async (req: Request<{}, {}, VerifyEmailRequest>, res: Response) => {
    try {
        const { verificationToken } = req.body;

        const user = await User.findOne({
            where: {
                emailVerificationToken: verificationToken
            }
        });

        if (!user || !user.emailVerificationTokenExpiry || user.emailVerificationTokenExpiry < new Date()) {
            return res.status(400).json({ message: 'Invalid or expired verification token' });
        }

        await user.update({
            isEmailVerified: true,
            emailVerificationToken: null,
            emailVerificationTokenExpiry: null
        });

        res.json({ message: 'Email verified successfully' });
    } catch (error) {
        console.error('Verify email error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const resendVerification = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.user?.id;

        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.isEmailVerified) {
            return res.status(400).json({ message: 'Email already verified' });
        }

        const verificationToken = generateEmailVerificationToken();
        await user.update({
            emailVerificationToken: verificationToken,
            emailVerificationTokenExpiry: new Date(Date.now() + 24 * 60 * 60 * 1000)
        });

        // TODO: Send verification email
        // sendVerificationEmail(user.email, verificationToken);

        res.json({
            message: 'Verification email sent',
            // Remove in production
            verificationToken: process.env.NODE_ENV === 'development' ? verificationToken : undefined
        });
    } catch (error) {
        console.error('Resend verification error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

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
export const updateUser = async (req: AuthRequest, res: Response) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        if (req.user?.id !== user.id) {
            return res.status(403).json({ error: 'Not authorized' });
        }

        await user.update(req.body);
        res.json({
            message: 'User updated',
            user: { id: user.id, name: user.fullName, email: user.email }
        });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};


// DELETE / api/users/deleteUser
export const deleteUser = async (req: AuthRequest, res: Response) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        if (req.user?.id !== user.id) {
            return res.status(403).json({ error: 'Not authorized' });
        }

        await user.destroy();
        res.json({ message: 'User deleted' });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

//


