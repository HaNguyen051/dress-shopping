// src/models/paymentsModel.ts
import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
import Order from './Order';

interface PaymentAttributes {
  PaymentId: number;
  OrderId: number;
  Amount: number;
  PaymentMethod: string;
  PaymentStatus: string;
  CreatedAt: Date;
}

interface PaymentCreationAttributes extends Optional<PaymentAttributes, 'PaymentId' | 'CreatedAt'> {}

class Payment extends Model<PaymentAttributes, PaymentCreationAttributes>
  implements PaymentAttributes {
  public PaymentId!: number;
  public OrderId!: number;
  public Amount!: number;
  public PaymentMethod!: string;
  public PaymentStatus!: string;
  public CreatedAt!: Date;
}

Payment.init(
  {
    PaymentId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    OrderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    PaymentMethod: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    PaymentStatus: {
      type: DataTypes.STRING,
      defaultValue: 'pending',
    },
    CreatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: 'Payments',
  }
);

// Quan hệ
Payment.belongsTo(Order, { foreignKey: 'OrderId' });
Order.hasMany(Payment, { foreignKey: 'OrderId' });

export default Payment;