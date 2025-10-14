// src/models/orderDetailsModel.ts
import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
import Order from './Order';
import Product from './Product';

interface OrderDetailAttributes {
  OrderDetailId: number;
  OrderId: number;
  ProductId: number;
  Quantity: number;
  UnitPrice: number;
  CreatedAt: Date;
}

interface OrderDetailCreationAttributes extends Optional<OrderDetailAttributes, 'OrderDetailId' | 'CreatedAt'> {}

class OrderDetail extends Model<OrderDetailAttributes, OrderDetailCreationAttributes>
  implements OrderDetailAttributes {
  public OrderDetailId!: number;
  public OrderId!: number;
  public ProductId!: number;
  public Quantity!: number;
  public UnitPrice!: number;
  public CreatedAt!: Date;
}

OrderDetail.init(
  {
    OrderDetailId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    OrderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ProductId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    UnitPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    CreatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: 'OrderDetails',
  }
);

// Quan hệ
OrderDetail.belongsTo(Order, { foreignKey: 'OrderId' });
Order.hasMany(OrderDetail, { foreignKey: 'OrderId' });
OrderDetail.belongsTo(Product, { foreignKey: 'ProductId' });
Product.hasMany(OrderDetail, { foreignKey: 'ProductId' });

export default OrderDetail;