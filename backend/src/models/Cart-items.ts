// src/models/cartItemsModel.ts
import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
import User from './User';
import Product from './Product';

interface CartItemAttributes {
  CartItemId: number;
  UserId: string;
  ProductId: number;
  Quantity: number;
  CreatedAt: Date;
}

interface CartItemCreationAttributes extends Optional<CartItemAttributes, 'CartItemId' | 'CreatedAt'> {}

class CartItem extends Model<CartItemAttributes, CartItemCreationAttributes>
  implements CartItemAttributes {
  public CartItemId!: number;
  public UserId!: string;
  public ProductId!: number;
  public Quantity!: number;
  public CreatedAt!: Date;
}

CartItem.init(
  {
    CartItemId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    UserId: {
      type: DataTypes.UUID,
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
    CreatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: 'CartItems',
  }
);

// Quan hệ
CartItem.belongsTo(User, { foreignKey: 'UserId' });
User.hasMany(CartItem, { foreignKey: 'UserId' });
CartItem.belongsTo(Product, { foreignKey: 'ProductId' });
Product.hasMany(CartItem, { foreignKey: 'ProductId' });

export default CartItem;