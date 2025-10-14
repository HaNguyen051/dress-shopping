import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";

interface UserAttributes {
    id: number;
    fullName: string;
    email: string;
    password: string;
    phone: string;
    address: string;
    role: 'admin' | 'user';
    isEmailVerified: boolean;
    emailVerificationToken?: string | null;
    emailVerificationTokenExpiry?: Date | null;
    passwordResetToken?: string | null;
    passwordResetTokenExpiry?: Date | null;
    createdAt: Date;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id' | 'createdAt' | 'isEmailVerified' | 'role'> { }

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public id!: number;
    public fullName!: string;
    public email!: string;
    public password!: string;
    public phone!: string;
    public address!: string;
    public role!: 'admin' | 'user';
    public isEmailVerified!: boolean;
    public emailVerificationToken?: string | null;
    public emailVerificationTokenExpiry?: Date | null;
    public passwordResetToken?: string | null;
    public passwordResetTokenExpiry?: Date | null;
    public createdAt!: Date;
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        fullName: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        phone: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        address: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        role: {
            type: DataTypes.ENUM('admin', 'user'),
            allowNull: false,
            defaultValue: 'user',
        },
        isEmailVerified: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        emailVerificationToken: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        emailVerificationTokenExpiry: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        passwordResetToken: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        passwordResetTokenExpiry: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        sequelize,
        tableName: 'Users',
        timestamps: false,
    }
);

// Export type alias để backward compatible
export type UserInstance = User;

// Export interface để dùng trong code
export type { UserAttributes, UserCreationAttributes };

export default User;