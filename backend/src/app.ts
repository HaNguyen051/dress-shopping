import express, { Application } from 'express';
import sequelize from './config/database';
import userRoutes from './routes/userRoutes';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const app: Application = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Swagger config (giữ nguyên, TS hỗ trợ tốt)
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'User API with JWT Auth (TypeScript)',
            version: '1.0.0',
            description: 'API quản lý User với authentication JWT, viết bằng TypeScript',
        },
        servers: [
            {
                url: `http://localhost:${PORT}`,
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [{ bearerAuth: [] }],
    },
    apis: ['./routes/*.ts'],  // Scan .ts files
};

const specs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Routes
app.use('/api/users', userRoutes);

// Sync DB và start server
sequelize.sync({ force: false })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
            console.log(`Swagger docs at http://localhost:${PORT}/api-docs`);
        });
    })
    .catch((error: Error) => console.error('DB sync error:', error));