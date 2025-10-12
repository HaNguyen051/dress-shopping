// src/models/ordersModel.ts
import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
import User from './User';

interface OrderAttributes {
  OrderId: number;
  UserId: string;
  TotalAmount: number;
  OrderStatus: string;
  CreatedAt: Date;
}

interface OrderCreationAttributes extends Optional<OrderAttributes, 'OrderId' | 'CreatedAt'> {}

class Order extends Model<OrderAttributes, OrderCreationAttributes> implements OrderAttributes {
  public OrderId!: number;
  public UserId!: string;
  public TotalAmount!: number;
  public OrderStatus!: string;
  public CreatedAt!: Date;
}

Order.init(
  {
    OrderId: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    UserId: { type: DataTypes.UUID, allowNull: false },
    TotalAmount: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    OrderStatus: { type: DataTypes.STRING, defaultValue: 'pending' },
    CreatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  { sequelize, tableName: 'Orders' }
);

Order.belongsTo(User, { foreignKey: 'UserId' });
User.hasMany(Order, { foreignKey: 'UserId' });

export default Order;