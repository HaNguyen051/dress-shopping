import { Request, Response } from 'express';
import { Review } from '../models';

export const getAllReviews = async (req: Request, res: Response): Promise<void> => {
    try {
        const reviews = await Review.findAll();
        res.status(200).json({
            success: true,
            data: reviews
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching reviews',
            error: error
        });
    }
};

export const getReviewById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const review = await Review.findByPk(id);
        if (!review) {
            res.status(404).json({
                success: false,
                message: 'Review not found'
            });
            return;
        }
        res.status(200).json({
            success: true,
            data: review
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching review',
            error: error
        });
    }
};

export const createReview = async (req: Request, res: Response): Promise<void> => {
    try {
        const { UserId, ProductId, Rating, Comment } = req.body;
        const review = await Review.create({
            UserId,
            ProductId,
            Rating,
            Comment
        });
        res.status(201).json({
            success: true,
            data: review
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error creating review',
            error: error
        });
    }
};

export const updateReview = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { UserId, ProductId, Rating, Comment } = req.body;
        const review = await Review.findByPk(id);
        if (!review) {
            res.status(404).json({
                success: false,
                message: 'Review not found'
            });
            return;
        }
        review.UserId = UserId || review.UserId;
        review.ProductId = ProductId || review.ProductId;
        review.Rating = Rating || review.Rating;
        review.Comment = Comment || review.Comment;
        await review.save();
        res.status(200).json({
            success: true,
            data: review
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating review',
            error: error
        });
    }
};

export const deleteReview = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const review = await Review.findByPk(id);
        if (!review) {
            res.status(404).json({
                success: false,
                message: 'Review not found'
            });
            return;
        }
        await review.destroy();
        res.status(200).json({
            success: true,
            message: 'Review deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting review',
            error: error
        });
    }
};