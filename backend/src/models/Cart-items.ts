import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface CartItemAttributes {
    CartItemId: number;
    UserId: number; // ← Đổi từ string sang number để match với User.id
    ProductId: number;
    Quantity: number;
    CreatedAt: Date;
}

interface CartItemCreationAttributes extends Optional<CartItemAttributes, 'CartItemId' | 'CreatedAt'> { }

class CartItem extends Model<CartItemAttributes, CartItemCreationAttributes>
    implements CartItemAttributes {
    public CartItemId!: number;
    public UserId!: number; // ← Đổi từ string sang number
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
            type: DataTypes.INTEGER, // ← Đổi từ UUID sang INTEGER
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
        timestamps: false, // ← THÊM DÒNG NÀY
    }
);

export default CartItem;