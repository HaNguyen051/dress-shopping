import sequelize from '../config/database';
import User from './User';
import Product from './Product';
import CartItem from './Cart-items';
import Category from './Categories';
import Order from './Order';
import OrderDetail from './Order-detail';
import Payment from './Payment';
import Review from './Review';

const setupAssociations = () => {
    // User - CartItem
    User.hasMany(CartItem, {
        foreignKey: 'UserId',
        sourceKey: 'id', // ← User dùng 'id' làm primary key
        as: 'cartItems'
    });
    CartItem.belongsTo(User, {
        foreignKey: 'UserId',
        targetKey: 'id', // ← User dùng 'id' làm primary key
        as: 'user'
    });

    // Product - CartItem
    Product.hasMany(CartItem, {
        foreignKey: 'ProductId',
        sourceKey: 'ProductId',
        as: 'cartItems'
    });
    CartItem.belongsTo(Product, {
        foreignKey: 'ProductId',
        targetKey: 'ProductId',
        as: 'product'
    });

    // Category - Product
    Category.hasMany(Product, {
        foreignKey: 'CategoryId',
        sourceKey: 'CategoryId',
        as: 'products'
    });
    Product.belongsTo(Category, {
        foreignKey: 'CategoryId',
        targetKey: 'CategoryId',
        as: 'category'
    });

    // User - Order
    User.hasMany(Order, {
        foreignKey: 'UserId',
        sourceKey: 'id', // ← User dùng 'id'
        as: 'orders'
    });
    Order.belongsTo(User, {
        foreignKey: 'UserId',
        targetKey: 'id', // ← User dùng 'id'
        as: 'user'
    });

    // Order - OrderDetail
    Order.hasMany(OrderDetail, {
        foreignKey: 'OrderId',
        sourceKey: 'OrderId',
        as: 'orderDetails'
    });
    OrderDetail.belongsTo(Order, {
        foreignKey: 'OrderId',
        targetKey: 'OrderId',
        as: 'order'
    });

    // Product - OrderDetail
    Product.hasMany(OrderDetail, {
        foreignKey: 'ProductId',
        sourceKey: 'ProductId',
        as: 'orderDetails'
    });
    OrderDetail.belongsTo(Product, {
        foreignKey: 'ProductId',
        targetKey: 'ProductId',
        as: 'product'
    });

    // Order - Payment (One-to-One)
    Order.hasOne(Payment, {
        foreignKey: 'OrderId',
        sourceKey: 'OrderId',
        as: 'payment'
    });
    Payment.belongsTo(Order, {
        foreignKey: 'OrderId',
        targetKey: 'OrderId',
        as: 'order'
    });

    // Product - Review
    Product.hasMany(Review, {
        foreignKey: 'ProductId',
        sourceKey: 'ProductId',
        as: 'reviews'
    });
    Review.belongsTo(Product, {
        foreignKey: 'ProductId',
        targetKey: 'ProductId',
        as: 'product'
    });

    // User - Review
    User.hasMany(Review, {
        foreignKey: 'UserId',
        sourceKey: 'id', // ← User dùng 'id'
        as: 'reviews'
    });
    Review.belongsTo(User, {
        foreignKey: 'UserId',
        targetKey: 'id', // ← User dùng 'id'
        as: 'user'
    });
};

setupAssociations();

export {
    sequelize,
    User,
    Product,
    CartItem,
    Category,
    Order,
    OrderDetail,
    Payment,
    Review,
};

export default {
    sequelize,
    User,
    Product,
    CartItem,
    Category,
    Order,
    OrderDetail,
    Payment,
    Review,
};