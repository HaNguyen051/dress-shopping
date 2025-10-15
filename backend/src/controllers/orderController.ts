import { Request, Response } from 'express';
import { Order } from '../models';

export const getAllOrders = async (req: Request, res: Response): Promise<void> => {
    try {
        const orders = await Order.findAll();
        res.status(200).json({
            success: true,
            data: orders
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching orders',
            error: error
        });
    }
};

export const getOrderById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const order = await Order.findByPk(id);
        if (!order) {
            res.status(404).json({
                success: false,
                message: 'Order not found'
            });
            return;
        }
        res.status(200).json({
            success: true,
            data: order
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching order',
            error: error
        });
    }
};

export const createOrder = async (req: Request, res: Response): Promise<void> => {
    try {
        const { UserId, TotalAmount, OrderStatus } = req.body;
        const order = await Order.create({
            UserId,
            TotalAmount,
            OrderStatus
        });
        res.status(201).json({
            success: true,
            data: order
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error creating order',
            error: error
        });
    }
};

export const updateOrder = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { UserId, TotalAmount, OrderStatus } = req.body;
        const order = await Order.findByPk(id);
        if (!order) {
            res.status(404).json({
                success: false,
                message: 'Order not found'
            });
            return;
        }
        order.UserId = UserId || order.UserId;
        order.TotalAmount = TotalAmount || order.TotalAmount;
        order.OrderStatus = OrderStatus || order.OrderStatus;
        await order.save();
        res.status(200).json({
            success: true,
            data: order
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating order',
            error: error
        });
    }
};

export const deleteOrder = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const order = await Order.findByPk(id);
        if (!order) {
            res.status(404).json({
                success: false,
                message: 'Order not found'
            });
            return;
        }
        await order.destroy();
        res.status(200).json({
            success: true,
            message: 'Order deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting order',
            error: error
        });
    }
};