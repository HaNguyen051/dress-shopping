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
        console.log('✅ Email server is ready to take messages');
        return true;
    } catch (error) {
        console.error('❌ Error with email server:', error);
        return false;
    }
}

// 1. Email xác thực tài khoản
export const sendVerificationEmail = async (email: string, token: string) => {
    const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;

    const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: email,
        subject: 'Verify Your Email - Dress Shopping',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
                    <h1 style="color: white; margin: 0;">👗 Dress Shopping</h1>
                </div>
                <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
                    <h2 style="color: #333;">Email Verification</h2>
                    <p style="color: #666; font-size: 16px; line-height: 1.6;">
                        Thank you for registering! Please verify your email address by clicking the button below:
                    </p>
                    <div style="text-align: center; margin: 30px 0;">
                        <a href="${verificationUrl}" 
                           style="background-color: #667eea; color: white; padding: 14px 40px; 
                                  text-decoration: none; border-radius: 50px; display: inline-block;
                                  font-weight: bold; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                            Verify Email
                        </a>
                    </div>
                    <p style="color: #999; font-size: 14px;">
                        Or copy and paste this link in your browser:<br>
                        <a href="${verificationUrl}" style="color: #667eea; word-break: break-all;">${verificationUrl}</a>
                    </p>
                    <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
                    <p style="color: #999; font-size: 12px; text-align: center;">
                        This link will expire in 24 hours.<br>
                        If you didn't create an account, please ignore this email.
                    </p>
                </div>
            </div>
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('✅ Verification email sent to', email);
        return true;
    } catch (error) {
        console.error('❌ Error sending verification email:', error);
        throw error;
    }
};

// 2. Email reset mật khẩu
export const sendResetPasswordEmail = async (email: string, token: string) => {
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;

    const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: email,
        subject: 'Password Reset Request - Dress Shopping',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                <div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
                    <h1 style="color: white; margin: 0;">🔐 Password Reset</h1>
                </div>
                <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
                    <h2 style="color: #333;">Reset Your Password</h2>
                    <p style="color: #666; font-size: 16px; line-height: 1.6;">
                        You requested to reset your password. Click the button below to proceed:
                    </p>
                    <div style="text-align: center; margin: 30px 0;">
                        <a href="${resetUrl}" 
                           style="background-color: #f5576c; color: white; padding: 14px 40px; 
                                  text-decoration: none; border-radius: 50px; display: inline-block;
                                  font-weight: bold; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                            Reset Password
                        </a>
                    </div>
                    <p style="color: #999; font-size: 14px;">
                        Or copy and paste this link in your browser:<br>
                        <a href="${resetUrl}" style="color: #f5576c; word-break: break-all;">${resetUrl}</a>
                    </p>
                    <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
                    <p style="color: #999; font-size: 12px; text-align: center;">
                        This link will expire in 1 hour.<br>
                        If you didn't request a password reset, please ignore this email and your password will remain unchanged.
                    </p>
                </div>
            </div>
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('✅ Password reset email sent to', email);
        return true;
    } catch (error) {
        console.error('❌ Error sending password reset email:', error);
        throw error;
    }
};

// 3. Email chào mừng sau khi verify
export const sendWelcomeEmail = async (email: string, fullName: string) => {
    const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: email,
        subject: 'Welcome to Dress Shopping! 🎉',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
                    <h1 style="color: white; margin: 0;">Welcome! 🎉</h1>
                </div>
                <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
                    <h2 style="color: #333;">Hello, ${fullName}! 👗</h2>
                    <p style="color: #666; font-size: 16px; line-height: 1.6;">
                        Thank you for verifying your email and joining <strong>Dress Shopping</strong>. 
                        We're excited to have you as part of our community!
                    </p>
                    <p style="color: #666; font-size: 16px; line-height: 1.6;">
                        Start exploring our exclusive collection and find your perfect dress today.
                    </p>
                    <div style="text-align: center; margin: 30px 0;">
                        <a href="${process.env.FRONTEND_URL}" 
                           style="background-color: #667eea; color: white; padding: 14px 40px; 
                                  text-decoration: none; border-radius: 50px; display: inline-block;
                                  font-weight: bold; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                            Start Shopping
                        </a>
                    </div>
                    <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <h3 style="color: #333; margin-top: 0;">✨ What's Next?</h3>
                        <ul style="color: #666; line-height: 1.8;">
                            <li>Browse our latest collections</li>
                            <li>Add items to your wishlist</li>
                            <li>Get exclusive member discounts</li>
                            <li>Track your orders easily</li>
                        </ul>
                    </div>
                    <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
                    <p style="color: #999; font-size: 12px; text-align: center;">
                        Need help? Contact us at ${process.env.EMAIL_FROM}
                    </p>
                </div>
            </div>
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`✅ Welcome email sent to ${email}`);
        return true;
    } catch (error) {
        console.error('❌ Error sending welcome email:', error);
        throw error;
    }
};

// 4. Email thông báo đổi mật khẩu thành công
export const sendPasswordChangedNotification = async (email: string, fullName: string) => {
    const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: email,
        subject: 'Password Changed Successfully - Dress Shopping',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                <div style="background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
                    <h1 style="color: white; margin: 0;">🔒 Password Changed</h1>
                </div>
                <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
                    <h2 style="color: #333;">Hi ${fullName},</h2>
                    <p style="color: #666; font-size: 16px; line-height: 1.6;">
                        Your password has been successfully changed.
                    </p>
                    <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #38ef7d;">
                        <p style="margin: 0; color: #666;">
                            <strong>Changed at:</strong> ${new Date().toLocaleString('en-US', {
            dateStyle: 'full',
            timeStyle: 'short'
        })}
                        </p>
                    </div>
                    <p style="color: #d32f2f; font-size: 14px; line-height: 1.6;">
                        ⚠️ If you did not make this change, please contact us immediately at 
                        <a href="mailto:${process.env.EMAIL_FROM}" style="color: #d32f2f;">
                            ${process.env.EMAIL_FROM}
                        </a>
                    </p>
                    <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
                    <p style="color: #999; font-size: 12px; text-align: center;">
                        This is an automated security notification from Dress Shopping.
                    </p>
                </div>
            </div>
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`✅ Password change notification sent to ${email}`);
        return true;
    } catch (error) {
        console.error('❌ Error sending password change notification:', error);
        throw error;
    }
};

// 5. Email thông báo reset mật khẩu thành công
export const sendPasswordResetSuccessEmail = async (email: string, fullName: string) => {
    const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: email,
        subject: 'Password Reset Successful - Dress Shopping',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                <div style="background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
                    <h1 style="color: white; margin: 0;">✅ Password Reset</h1>
                </div>
                <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
                    <h2 style="color: #333;">Hi ${fullName},</h2>
                    <p style="color: #666; font-size: 16px; line-height: 1.6;">
                        Your password has been successfully reset. You can now log in with your new password.
                    </p>
                    <div style="text-align: center; margin: 30px 0;">
                        <a href="${process.env.FRONTEND_URL}/login" 
                           style="background-color: #38ef7d; color: white; padding: 14px 40px; 
                                  text-decoration: none; border-radius: 50px; display: inline-block;
                                  font-weight: bold; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                            Login Now
                        </a>
                    </div>
                    <p style="color: #d32f2f; font-size: 14px; line-height: 1.6;">
                        ⚠️ If you did not reset your password, please contact us immediately.
                    </p>
                    <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
                    <p style="color: #999; font-size: 12px; text-align: center;">
                        This is an automated security notification from Dress Shopping.
                    </p>
                </div>
            </div>
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`✅ Password reset success email sent to ${email}`);
        return true;
    } catch (error) {
        console.error('❌ Error sending password reset success email:', error);
        throw error;
    }
};