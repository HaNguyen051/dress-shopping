import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface OrderAttributes {
    OrderId: number;
    UserId: number; // ← Đổi từ string sang number
    TotalAmount: number;
    OrderStatus: string;
    CreatedAt: Date;
}

interface OrderCreationAttributes extends Optional<OrderAttributes, 'OrderId' | 'CreatedAt'> { }

class Order extends Model<OrderAttributes, OrderCreationAttributes> implements OrderAttributes {
    public OrderId!: number;
    public UserId!: number;
    public TotalAmount!: number;
    public OrderStatus!: string;
    public CreatedAt!: Date;
}

Order.init(
    {
        OrderId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        UserId: {
            type: DataTypes.INTEGER, // ← Đổi từ UUID sang INTEGER
            allowNull: false
        },
        TotalAmount: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        OrderStatus: {
            type: DataTypes.STRING,
            defaultValue: 'pending'
        },
        CreatedAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
    },
    {
        sequelize,
        tableName: 'Orders',
        timestamps: false,
    }
);

export default Order;