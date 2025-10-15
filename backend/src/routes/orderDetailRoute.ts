import dotenv from 'dotenv';
import { Router } from 'express';
import { createOrderDetail, deleteOrderDetail, getAllOrderDetails, getOrderDetailById, updateOrderDetail } from '../controllers/orderDetailController';

const router: Router = Router();
export default router;
dotenv.config();

/**
 * @swagger
 * /api/orderdetails:
 *   get:
 *     summary: Get all order details
 *     tags: [OrderDetails]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved all order details
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
 *                     $ref: '#/components/schemas/OrderDetail'
 *       500:
 *         description: Server error
 */
router.get('/', getAllOrderDetails);

/**
 * @swagger
 * /api/orderdetails:
 *   post:
 *     summary: Create a new order detail
 *     tags: [OrderDetails]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - OrderId
 *               - ProductId
 *               - Quantity
 *               - UnitPrice
 *             properties:
 *               OrderId:
 *                 type: integer
 *                 example: 1
 *               ProductId:
 *                 type: integer
 *                 example: 1
 *               Quantity:
 *                 type: integer
 *                 example: 2
 *               UnitPrice:
 *                 type: number
 *                 example: 99.99
 *     responses:
 *       201:
 *         description: Order detail created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/OrderDetail'
 *       400:
 *         description: Error creating order detail
 *       500:
 *         description: Server error
 */
router.post('/', createOrderDetail);

/**
 * @swagger
 * /api/orderdetails/{id}:
 *   get:
 *     summary: Get an order detail by ID
 *     tags: [OrderDetails]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Order detail ID
 *     responses:
 *       200:
 *         description: Successfully retrieved order detail
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/OrderDetail'
 *       404:
 *         description: Order detail not found
 *       500:
 *         description: Server error
 */
router.get('/:id', getOrderDetailById);

/**
 * @swagger
 * /api/orderdetails/{id}:
 *   put:
 *     summary: Update an order detail by ID
 *     tags: [OrderDetails]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Order detail ID
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
 *               ProductId:
 *                 type: integer
 *                 example: 1
 *               Quantity:
 *                 type: integer
 *                 example: 3
 *               UnitPrice:
 *                 type: number
 *                 example: 149.99
 *     responses:
 *       200:
 *         description: Order detail updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/OrderDetail'
 *       400:
 *         description: Error updating order detail
 *       404:
 *         description: Order detail not found
 *       500:
 *         description: Server error
 */
router.put('/:id', updateOrderDetail);

/**
 * @swagger
 * /api/orderdetails/{id}:
 *   delete:
 *     summary: Delete an order detail by ID
 *     tags: [OrderDetails]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Order detail ID
 *     responses:
 *       200:
 *         description: Order detail deleted successfully
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
 *                   example: "Order detail deleted successfully"
 *       404:
 *         description: Order detail not found
 *       500:
 *         description: Server error
 */
router.delete('/:id', deleteOrderDetail);