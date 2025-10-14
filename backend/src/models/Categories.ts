// src/models/categoriesModel.ts
import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface CategoryAttributes {
    CategoryId: number;
    Name: string;
    Description: string;
    CreatedAt: Date;
}

interface CategoryCreationAttributes extends Optional<CategoryAttributes, 'CategoryId' | 'CreatedAt'> { }

class Category extends Model<CategoryAttributes, CategoryCreationAttributes> implements CategoryAttributes {
    public CategoryId!: number;
    public Name!: string;
    public Description!: string;
    public CreatedAt!: Date;
}

Category.init({
    CategoryId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    Name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Description: {
        type: DataTypes.STRING,
    },
    CreatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
    sequelize,
    tableName: 'Categories',
    timestamps: false,

});

export default Category;