// src/models/reviewsModel.ts
import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
import User from './User';
import Product from './Product';

interface ReviewAttributes {
  ReviewId: number;
  UserId: string;
  ProductId: number;
  Rating: number;
  Comment: string;
  CreatedAt: Date;
}

interface ReviewCreationAttributes extends Optional<ReviewAttributes, 'ReviewId' | 'CreatedAt'> {}

class Review extends Model<ReviewAttributes, ReviewCreationAttributes>
  implements ReviewAttributes {
  public ReviewId!: number;
  public UserId!: string;
  public ProductId!: number;
  public Rating!: number;
  public Comment!: string;
  public CreatedAt!: Date;
}

Review.init(
  {
    ReviewId: {
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
    Rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 5,
      },
    },
    Comment: {
      type: DataTypes.STRING,
    },
    CreatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: 'Reviews',
  }
);

// Quan hệ
Review.belongsTo(User, { foreignKey: 'UserId' });
User.hasMany(Review, { foreignKey: 'UserId' });
Review.belongsTo(Product, { foreignKey: 'ProductId' });
Product.hasMany(Review, { foreignKey: 'ProductId' });

export default Review;