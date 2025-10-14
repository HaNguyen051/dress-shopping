import { Request, Response } from 'express';
import { Payment } from '../models';

export const getAllPayments = async (req: Request, res: Response): Promise<void> => {
    try {
        const payments = await Payment.findAll();
        res.status(200).json({
            success: true,
            data: payments
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching payments',
            error: error
        });
    }
};

export const getPaymentById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const payment = await Payment.findByPk(id);
        if (!payment) {
            res.status(404).json({
                success: false,
                message: 'Payment not found'
            });
            return;
        }
        res.status(200).json({
            success: true,
            data: payment
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching payment',
            error: error
        });
    }
};

export const createPayment = async (req: Request, res: Response): Promise<void> => {
    try {
        const { OrderId, Amount, PaymentMethod, PaymentStatus } = req.body;
        const payment = await Payment.create({
            OrderId,
            Amount,
            PaymentMethod,
            PaymentStatus
        });
        res.status(201).json({
            success: true,
            data: payment
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error creating payment',
            error: error
        });
    }
};

export const updatePayment = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { OrderId, Amount, PaymentMethod, PaymentStatus } = req.body;
        const payment = await Payment.findByPk(id);
        if (!payment) {
            res.status(404).json({
                success: false,
                message: 'Payment not found'
            });
            return;
        }
        payment.OrderId = OrderId || payment.OrderId;
        payment.Amount = Amount || payment.Amount;
        payment.PaymentMethod = PaymentMethod || payment.PaymentMethod;
        payment.PaymentStatus = PaymentStatus || payment.PaymentStatus;
        await payment.save();
        res.status(200).json({
            success: true,
            data: payment
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating payment',
            error: error
        });
    }
};

export const deletePayment = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const payment = await Payment.findByPk(id);
        if (!payment) {
            res.status(404).json({
                success: false,
                message: 'Payment not found'
            });
            return;
        }
        await payment.destroy();
        res.status(200).json({
            success: true,
            message: 'Payment deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting payment',
            error: error
        });
    }
};