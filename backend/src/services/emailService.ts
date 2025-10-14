import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});



export const verifyEmailConnection = async () => {
    try {
        await transporter.verify();
        console.log('Email server is ready to take messages');
        return true;
    }
    catch (error) {
        console.error('Error with email server:', error);
        return false;
    }
}

export const sendVerificationEmail = async (email: string, token: string) => {
    const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;
    const mainOptions = {
        from: process.env.EMAIL_FROM,
        to: email,
        subject: 'Verify Your Email - Dress Shopping',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #333;">Email Verification</h2>
                <p>Thank you for registering! Please verify your email address by clicking the button below:</p>
                <div style="text-align: center; margin: 30px 0;">
                    <a href="${verificationUrl}" 
                       style="background-color: #4CAF50; color: white; padding: 12px 30px; 
                              text-decoration: none; border-radius: 5px; display: inline-block;">
                        Verify Email
                    </a>
                </div>
                <p style="color: #666; font-size: 14px;">
                    Or copy and paste this link in your browser:<br>
                    <a href="${verificationUrl}">${verificationUrl}</a>
                </p>
                <p style="color: #999; font-size: 12px; margin-top: 30px;">
                    This link will expire in 24 hours. If you didn't create an account, please ignore this email.
                </p>
            </div>
        `,
    }
    try {
        await transporter.sendMail(mainOptions);
        console.log('Verification email sent to', email);
        return true;
    }
    catch (error) {
        console.error('Error sending verification email:', error);
        return false;
    }

}

export const sendResetPasswordEmail = async (email: string, token: string) => {
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
    const mainOptions = {
        from: process.env.EMAIL_FROM,
        to: email,
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #333;">Password Reset Request</h2>
                <p>You requested to reset your password. Click the button below to proceed:</p>
                <div style="text-align: center; margin: 30px 0;">
                    <a href="${resetUrl}" 
                       style="background-color: #2196F3; color: white; padding: 12px 30px; 
                              text-decoration: none; border-radius: 5px; display: inline-block;">
                        Reset Password
                    </a>
                </div>
                <p style="color: #666; font-size: 14px;">
                    Or copy and paste this link in your browser:<br>
                    <a href="${resetUrl}">${resetUrl}</a>
                </p>
                <p style="color: #999; font-size: 12px; margin-top: 30px;">
                    This link will expire in 1 hour. If you didn't request a password reset, please ignore this email.
                </p>
            </div>
        `,
    }
    try {
        await transporter.sendMail(mainOptions);
        console.log('Password reset email sent to', email);
        return true;
    } catch (error) {
        console.error('Error sending password reset email:', error);
        return false;
    }
}

export const sendWelcomeEmail = async (email: string, fullName: string) => {
    const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: email,
        subject: 'Welcome to Dress Shopping!',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #333;">Welcome, ${fullName}! 👗</h2>
                <p>Thank you for joining Dress Shopping. We're excited to have you!</p>
                <p>Start exploring our collection and find your perfect dress today.</p>
                <div style="text-align: center; margin: 30px 0;">
                    <a href="${process.env.FRONTEND_URL}" 
                       style="background-color: #E91E63; color: white; padding: 12px 30px; 
                              text-decoration: none; border-radius: 5px; display: inline-block;">
                        Start Shopping
                    </a>
                </div>
            </div>
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Welcome email sent to ${email}`);
        return true;
    } catch (error) {
        console.error('Error sending welcome email:', error);
        return false;
    }
};

