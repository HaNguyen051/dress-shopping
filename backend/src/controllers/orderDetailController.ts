import { Request, Response } from 'express';
import { OrderDetail } from '../models';

export const getAllOrderDetails = async (req: Request, res: Response): Promise<void> => {
    try {
        const orderDetails = await OrderDetail.findAll();
        res.status(200).json({
            success: true,
            data: orderDetails
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching order details',
            error: error
        });
    }
};

export const getOrderDetailById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const orderDetail = await OrderDetail.findByPk(id);
        if (!orderDetail) {
            res.status(404).json({
                success: false,
                message: 'Order detail not found'
            });
            return;
        }
        res.status(200).json({
            success: true,
            data: orderDetail
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching order detail',
            error: error
        });
    }
};

export const createOrderDetail = async (req: Request, res: Response): Promise<void> => {
    try {
        const { OrderId, ProductId, Quantity, UnitPrice } = req.body;
        const orderDetail = await OrderDetail.create({
            OrderId,
            ProductId,
            Quantity,
            UnitPrice
        });
        res.status(201).json({
            success: true,
            data: orderDetail
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error creating order detail',
            error: error
        });
    }
};

export const updateOrderDetail = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { OrderId, ProductId, Quantity, UnitPrice } = req.body;
        const orderDetail = await OrderDetail.findByPk(id);
        if (!orderDetail) {
            res.status(404).json({
                success: false,
                message: 'Order detail not found'
            });
            return;
        }
        orderDetail.OrderId = OrderId || orderDetail.OrderId;
        orderDetail.ProductId = ProductId || orderDetail.ProductId;
        orderDetail.Quantity = Quantity || orderDetail.Quantity;
        orderDetail.UnitPrice = UnitPrice || orderDetail.UnitPrice;
        await orderDetail.save();
        res.status(200).json({
            success: true,
            data: orderDetail
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating order detail',
            error: error
        });
    }
};

export const deleteOrderDetail = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const orderDetail = await OrderDetail.findByPk(id);
        if (!orderDetail) {
            res.status(404).json({
                success: false,
                message: 'Order detail not found'
            });
            return;
        }
        await orderDetail.destroy();
        res.status(200).json({
            success: true,
            message: 'Order detail deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting order detail',
            error: error
        });
    }
};