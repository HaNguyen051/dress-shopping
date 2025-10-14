import { Request, Response } from 'express';
import { Category } from '../models';

export const getAllCategories = async (req: Request, res: Response): Promise<void> => {
    try {
        const categories = await Category.findAll();
        res.status(200).json({
            success: true,
            data: categories
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching categories',
            error: error
        });
    }

}

export const getCategoryById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const category = await Category.findByPk(id);
        if (!category) {
            res.status(404).json({
                success: false,
                message: 'Category not found'
            });
            return;
        }
        res.status(200).json({
            success: true,
            data: category
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching category',
            error: error
        });
    }
}

export const createCategory = async (req: Request, res: Response): Promise<void> => {
    try {
        const { Name, Description } = req.body;
        const category = await Category.create({
            Name,
            Description
        });
        res.status(201).json({
            success: true,
            data: category
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error creating category',
            error: error
        });
    }
}
export const updateCategory = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { Name, Description } = req.body;
        const category = await Category.findByPk(id);
        if (!category) {
            res.status(404).json({
                success: false,
                message: 'Category not found'
            });
            return;
        }
        category.Name = Name || category.Name;
        category.Description = Description || category.Description;
        await category.save();
        res.status(200).json({
            success: true,
            data: category
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating category',
            error: error
        });
    }
}

export const deleteCategory = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const category = await Category.findByPk(id);
        if (!category) {
            res.status(404).json({
                success: false,
                message: 'Category not found'
            });
            return;
        }
        await category.destroy();
        res.status(200).json({
            success: true,
            message: 'Category deleted successfully'
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting category',
            error: error
        });
    }
}