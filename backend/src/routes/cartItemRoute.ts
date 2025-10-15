import dotenv from 'dotenv';
import { Router } from 'express';
import { createCartItem, deleteCartItem, getAllCartItems, getCartItemById, updateCartItem } from '../controllers/cartItemController';

const router: Router = Router();
export default router;
dotenv.config();

/**
 * @swagger
 * /api/cartitems:
 *   get:
 *     summary: Get all cart items
 *     tags: [CartItems]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved all cart items
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
 *                     $ref: '#/components/schemas/CartItem'
 *       500:
 *         description: Server error
 */
router.get('/', getAllCartItems);

/**
 * @swagger
 * /api/cartitems:
 *   post:
 *     summary: Create a new cart item
 *     tags: [CartItems]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - UserId
 *               - ProductId
 *               - Quantity
 *             properties:
 *               UserId:
 *                 type: string
 *                 format: uuid
 *                 example: "123e4567-e89b-12d3-a456-426614174000"
 *               ProductId:
 *                 type: integer
 *                 example: 1
 *               Quantity:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Cart item created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/CartItem'
 *       400:
 *         description: Error creating cart item
 *       500:
 *         description: Server error
 */
router.post('/', createCartItem);

/**
 * @swagger
 * /api/cartitems/{id}:
 *   get:
 *     summary: Get a cart item by ID
 *     tags: [CartItems]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Cart item ID
 *     responses:
 *       200:
 *         description: Successfully retrieved cart item
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/CartItem'
 *       404:
 *         description: Cart item not found
 *       500:
 *         description: Server error
 */
router.get('/:id', getCartItemById);

/**
 * @swagger
 * /api/cartitems/{id}:
 *   put:
 *     summary: Update a cart item by ID
 *     tags: [CartItems]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Cart item ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               UserId:
 *                 type: string
 *                 format: uuid
 *                 example: "123e4567-e89b-12d3-a456-426614174000"
 *               ProductId:
 *                 type: integer
 *                 example: 1
 *               Quantity:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       200:
 *         description: Cart item updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/CartItem'
 *       400:
 *         description: Error updating cart item
 *       404:
 *         description: Cart item not found
 *       500:
 *         description: Server error
 */
router.put('/:id', updateCartItem);

/**
 * @swagger
 * /api/cartitems/{id}:
 *   delete:
 *     summary: Delete a cart item by ID
 *     tags: [CartItems]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Cart item ID
 *     responses:
 *       200:
 *         description: Cart item deleted successfully
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
 *                   example: "Cart item deleted successfully"
 *       404:
 *         description: Cart item not found
 *       500:
 *         description: Server error
 */
router.delete('/:id', deleteCartItem);