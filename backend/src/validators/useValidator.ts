import { Request, Response, NextFunction } from 'express';

const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

const isValidPhone = (phone: string): boolean => {
    const phoneRegex = /^[0-9]{10,11}$/;
    return phoneRegex.test(phone);
};

export const validateRegister = (req: Request, res: Response, next: NextFunction): void => {
    const { fullName, email, password, phone, address } = req.body;

    if (!fullName || !email || !password || !phone || !address) {
        res.status(400).json({
            success: false,
            message: 'All fields are required (fullName, email, password, phone, address)'
        });
        return;
    }

    if (fullName.trim().length < 2) {
        res.status(400).json({
            success: false,
            message: 'Full name must be at least 2 characters'
        });
        return;
    }

    if (!isValidEmail(email)) {
        res.status(400).json({
            success: false,
            message: 'Invalid email format'
        });
        return;
    }

    if (password.length < 6) {
        res.status(400).json({
            success: false,
            message: 'Password must be at least 6 characters'
        });
        return;
    }

    if (!isValidPhone(phone)) {
        res.status(400).json({
            success: false,
            message: 'Phone number must be 10-11 digits'
        });
        return;
    }

    if (address.trim().length < 5) {
        res.status(400).json({
            success: false,
            message: 'Address must be at least 5 characters'
        });
        return;
    }

    next();
};

export const validateLogin = (req: Request, res: Response, next: NextFunction): void => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({
            success: false,
            message: 'Email and password are required'
        });
        return;
    }

    if (!isValidEmail(email)) {
        res.status(400).json({
            success: false,
            message: 'Invalid email format'
        });
        return;
    }

    next();
};

export const validateChangePassword = (req: Request, res: Response, next: NextFunction): void => {
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
        res.status(400).json({
            success: false,
            message: 'Old password and new password are required'
        });
        return;
    }

    if (newPassword.length < 6) {
        res.status(400).json({
            success: false,
            message: 'New password must be at least 6 characters'
        });
        return;
    }

    if (oldPassword === newPassword) {
        res.status(400).json({
            success: false,
            message: 'New password must be different from current password'
        });
        return;
    }

    next();
};

export const validateForgotPassword = (req: Request, res: Response, next: NextFunction): void => {
    const { email } = req.body;

    if (!email) {
        res.status(400).json({
            success: false,
            message: 'Email is required'
        });
        return;
    }

    if (!isValidEmail(email)) {
        res.status(400).json({
            success: false,
            message: 'Invalid email format'
        });
        return;
    }

    next();
};

export const validateResetPassword = (req: Request, res: Response, next: NextFunction): void => {
    const { token, newPassword, confirmPassword } = req.body;

    if (!token || !newPassword) {
        res.status(400).json({
            success: false,
            message: 'Token and new password are required'
        });
        return;
    }

    if (newPassword.length < 6) {
        res.status(400).json({
            success: false,
            message: 'Password must be at least 6 characters'
        });
        return;
    }

    if (confirmPassword && newPassword !== confirmPassword) {
        res.status(400).json({
            success: false,
            message: 'Passwords do not match'
        });
        return;
    }

    next();
};


export const validateUpdateUser = (req: Request, res: Response, next: NextFunction): void => {
    const { fullName, phone, address, email, password, role } = req.body;

    // Prevent updating sensitive fields
    if (email || password || role) {
        res.status(400).json({
            success: false,
            message: 'Cannot update email, password, or role through this endpoint'
        });
        return;
    }


    if (fullName && fullName.trim().length < 2) {
        res.status(400).json({
            success: false,
            message: 'Full name must be at least 2 characters'
        });
        return;
    }

    // Validate phone if provided
    if (phone && !isValidPhone(phone)) {
        res.status(400).json({
            success: false,
            message: 'Invalid phone number format (10-11 digits)'
        });
        return;
    }

    // Validate address if provided
    if (address && address.trim().length < 5) {
        res.status(400).json({
            success: false,
            message: 'Address must be at least 5 characters'
        });
        return;
    }

    next();
};


export const validateVerifyEmail = (req: Request, res: Response, next: NextFunction): void => {
    const { verificationToken } = req.body;

    if (!verificationToken) {
        res.status(400).json({
            success: false,
            message: 'Verification token is required'
        });
        return;
    }

    if (verificationToken.length !== 64) { // crypto.randomBytes(32).toString('hex') = 64 chars
        res.status(400).json({
            success: false,
            message: 'Invalid token format'
        });
        return;
    }

    next();
};
export const validateUpdateProfile = (req: Request, res: Response, next: NextFunction): void => {
    const { fullName, phone, address, bio, dateOfBirth } = req.body;

    // Validate fullName
    if (fullName && (typeof fullName !== 'string' || fullName.trim().length < 2)) {
        res.status(400).json({
            success: false,
            message: 'Tên phải có ít nhất 2 ký tự'
        });
        return;
    }

    // Validate phone
    if (phone && !/^[0-9]{10,11}$/.test(phone)) {
        res.status(400).json({
            success: false,
            message: 'Số điện thoại không hợp lệ (10-11 số)'
        });
        return;
    }

    // Validate address
    if (address && (typeof address !== 'string' || address.trim().length < 5)) {
        res.status(400).json({
            success: false,
            message: 'Địa chỉ phải có ít nhất 5 ký tự'
        });
        return;
    }

    // Validate bio
    if (bio && bio.length > 500) {
        res.status(400).json({
            success: false,
            message: 'Bio không được quá 500 ký tự'
        });
        return;
    }

    // Validate dateOfBirth
    if (dateOfBirth) {
        const date = new Date(dateOfBirth);
        const now = new Date();
        const age = now.getFullYear() - date.getFullYear();

        if (isNaN(date.getTime()) || age < 0 || age > 150) {
            res.status(400).json({
                success: false,
                message: 'Ngày sinh không hợp lệ'
            });
            return;
        }
    }

    next();
};