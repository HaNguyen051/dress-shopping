import { Request, Response } from 'express';
import { CartItem } from '../models';

export const getAllCartItems = async (req: Request, res: Response): Promise<void> => {
    try {
        const cartItems = await CartItem.findAll();
        res.status(200).json({
            success: true,
            data: cartItems
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching cart items',
            error: error
        });
    }
};

export const getCartItemById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const cartItem = await CartItem.findByPk(id);
        if (!cartItem) {
            res.status(404).json({
                success: false,
                message: 'Cart item not found'
            });
            return;
        }
        res.status(200).json({
            success: true,
            data: cartItem
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching cart item',
            error: error
        });
    }
};

export const createCartItem = async (req: Request, res: Response): Promise<void> => {
    try {
        const { UserId, ProductId, Quantity } = req.body;
        const cartItem = await CartItem.create({
            UserId,
            ProductId,
            Quantity
        });
        res.status(201).json({
            success: true,
            data: cartItem
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error creating cart item',
            error: error
        });
    }
};

export const updateCartItem = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { UserId, ProductId, Quantity } = req.body;
        const cartItem = await CartItem.findByPk(id);
        if (!cartItem) {
            res.status(404).json({
                success: false,
                message: 'Cart item not found'
            });
            return;
        }
        cartItem.UserId = UserId || cartItem.UserId;
        cartItem.ProductId = ProductId || cartItem.ProductId;
        cartItem.Quantity = Quantity || cartItem.Quantity;
        await cartItem.save();
        res.status(200).json({
            success: true,
            data: cartItem
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating cart item',
            error: error
        });
    }
};

export const deleteCartItem = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const cartItem = await CartItem.findByPk(id);
        if (!cartItem) {
            res.status(404).json({
                success: false,
                message: 'Cart item not found'
            });
            return;
        }
        await cartItem.destroy();
        res.status(200).json({
            success: true,
            message: 'Cart item deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting cart item',
            error: error
        });
    }
};