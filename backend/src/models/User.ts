import { before } from "node:test";
import { authorize } from "passport";
import { DataTypes } from "sequelize";
import { Model, Optional } from "sequelize";
import bcrypt from "bcrypt";
import sequelize from "../config/database";
interface UserAttributes {
    id: number;
    fullName: string;
    email: string;
    password: string;
    phone: number
    address: string;
    role?: 'admin' | 'user';
    createdAt?: Date;
    updatedAt?: Date;
}

export interface UserInstance extends Model<UserAttributes, Optional<UserAttributes, "id">> {
    readonly id: number;
    fullName: string;
    email: string;
    password: string;
    phone: number
    address: string;
    role: 'admin' | 'user';
    readonly createdAt: Date;
    readonly updatedAt: Date;
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
        validate: {
            len: [8, 100], // mat khau it nhat 8 ki tu
        },
    },
    phone: {
        type: DataTypes.INTEGER,
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
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
}, {
    hooks: {
        beforeCreate: async (user: UserAttributes) => {
            // để hash password vào database
            if (user.password) {
                user.password = await bcrypt.hash(user.password, 10);
            }
        },
        beforeUpdate: async (user: UserAttributes) => {
            if (user.password) {
                user.password = await bcrypt.hash(user.password, 10);
            }
        }
    }
});

export default User;