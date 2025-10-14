import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface ProductAttributes {
    ProductId: number;
    Name: string;
    Description?: string;
    Price: number;
    Stock: number;
    ImageUrl?: string;
    CategoryId?: number;
    CreatedAt?: Date;
}

interface ProductCreationAttributes extends Optional<ProductAttributes, 'ProductId'> { }

class Product extends Model<ProductAttributes, ProductCreationAttributes>
    implements ProductAttributes {
    public ProductId!: number;
    public Name!: string;
    public Description?: string;
    public Price!: number;
    public Stock!: number;
    public ImageUrl?: string;
    public CategoryId?: number;
    public CreatedAt?: Date;
}

Product.init(
    {
        ProductId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        Name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Description: {
            type: DataTypes.STRING(500),
            allowNull: true,
        },
        Price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        Stock: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        ImageUrl: {
            type: DataTypes.STRING,
        },
        CategoryId: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        CreatedAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        sequelize,
        tableName: 'Products',
        timestamps: false,
    }
);

export default Product;