import dotenv from 'dotenv';
import { Router } from 'express';
import { createPayment, deletePayment, getAllPayments, getPaymentById, updatePayment } from '../controllers/paymentController';

const router: Router = Router();
export default router;
dotenv.config();

/**
 * @swagger
 * /api/payments:
 *   get:
 *     summary: Get all payments
 *     tags: [Payments]
 *     security: []
 *     responses:
 *       200:
 *         description: Successfully retrieved all payments
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Payment'
 *       500:
 *         description: Server error
 */
router.get('/', getAllPayments);

/**
 * @swagger
 * /api/payments:
 *   post:
 *     summary: Create a new payment
 *     tags: [Payments]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - OrderId
 *               - Amount
 *               - PaymentMethod
 *             properties:
 *               OrderId:
 *                 type: integer
 *                 example: 1
 *               Amount:
 *                 type: number
 *                 example: 99.99
 *               PaymentMethod:
 *                 type: string
 *                 example: "Credit Card"
 *               PaymentStatus:
 *                 type: string
 *                 example: "pending"
 *     responses:
 *       201:
 *         description: Payment created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Payment'
 *       400:
 *         description: Error creating payment
 *       500:
 *         description: Server error
 */
router.post('/', createPayment);

/**
 * @swagger
 * /api/payments/{id}:
 *   get:
 *     summary: Get a payment by ID
 *     tags: [Payments]
 *     security: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Payment ID
 *     responses:
 *       200:
 *         description: Successfully retrieved payment
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Payment'
 *       404:
 *         description: Payment not found
 *       500:
 *         description: Server error
 */
router.get('/:id', getPaymentById);

/**
 * @swagger
 * /api/payments/{id}:
 *   put:
 *     summary: Update a payment by ID
 *     tags: [Payments]
 *     security: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Payment ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               OrderId:
 *                 type: integer
 *                 example: 1
 *               Amount:
 *                 type: number
 *                 example: 149.99
 *               PaymentMethod:
 *                 type: string
 *                 example: "Debit Card"
 *               PaymentStatus:
 *                 type: string
 *                 example: "completed"
 *     responses:
 *       200:
 *         description: Payment updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Payment'
 *       400:
 *         description: Error updating payment
 *       404:
 *         description: Payment not found
 *       500:
 *         description: Server error
 */
router.put('/:id', updatePayment);

/**
 * @swagger
 * /api/payments/{id}:
 *   delete:
 *     summary: Delete a payment by ID
 *     tags: [Payments]
 *     security: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Payment ID
 *     responses:
 *       200:
 *         description: Payment deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Payment deleted successfully"
 *       404:
 *         description: Payment not found
 *       500:
 *         description: Server error
 */
router.delete('/:id', deletePayment);