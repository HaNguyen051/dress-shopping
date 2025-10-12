import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";

interface UserAttributes {
    id: number;
    fullName: string;
    email: string;
    password: string;
    phone: number;
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
    phone: number;
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
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
    },
}, {
    timestamps: true,
    tableName: 'Users'
});

export default User;