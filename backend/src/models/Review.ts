import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface ReviewAttributes {
    ReviewId: number;
    UserId: number; // ← Đổi từ string sang number
    ProductId: number;
    Rating: number;
    Comment: string;
    CreatedAt: Date;
}

interface ReviewCreationAttributes extends Optional<ReviewAttributes, 'ReviewId' | 'CreatedAt'> { }

class Review extends Model<ReviewAttributes, ReviewCreationAttributes>
    implements ReviewAttributes {
    public ReviewId!: number;
    public UserId!: number; // ← Đổi từ string sang number
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
            type: DataTypes.INTEGER, // ← Đổi từ UUID sang INTEGER
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
        timestamps: false,
    }
);

export default Review;