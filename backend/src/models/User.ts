import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";


interface UserAttributes {
    id: number;
    fullName: string;
    email: string;
    password: string;
    phone: string;
    address: string;
    role?: 'admin' | 'user';
    isEmailVerified?: boolean;
    emailVerificationToken?: string | null;
    emailVerificationTokenExpiry?: Date | null;
    passwordResetToken?: string | null;
    passwordResetTokenExpiry?: Date | null;
    createdAt?: Date;


}

export interface UserInstance extends Model<UserAttributes, Optional<UserAttributes, "id">> {
    readonly id: number;
    fullName: string;
    email: string;
    password: string;
    phone: string;
    address: string;
    role: 'admin' | 'user';
    isEmailVerified?: boolean;
    emailVerificationToken?: string | null;
    emailVerificationTokenExpiry?: Date | null;
    passwordResetToken?: string | null;
    passwordResetTokenExpiry?: Date | null;
    readonly createdAt: Date;

}

const User = sequelize.define<UserInstance>('User', {
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
    },
}, {
    timestamps: true,
    tableName: 'Users'
});

export default User;
