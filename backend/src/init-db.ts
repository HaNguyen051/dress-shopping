import sequelize from './config/database';  // Sửa: './' vì config cùng level trong src/
import User from './models/User';           // Sửa: './' vì models cùng level trong src/

// Sync DB để tạo bảng User
sequelize.sync({ alter: true })
    .then(async () => {
        console.log('✅ Bảng User đã tạo thành công!');

        // Tạo user test (optional)
        try {
            const newUser = await User.create({
                fullName: 'Test User',
                email: 'test@example.com',
                password: 'password123',
                phone: 1234567890,
                address: 'Test Address',
                role: 'user'
            });
            console.log('✅ User test đã tạo:', newUser.toJSON());
        } catch (error) {
            console.error('Lỗi tạo user test:', (error as Error).message);
        }
    })
    .catch((error: unknown) => {  // Fix type 'unknown' để tránh TS7006
        console.error('❌ Lỗi tạo bảng:', error);
    })
    .finally(() => {
        process.exit(0);
    });