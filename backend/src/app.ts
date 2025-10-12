import express, { Application } from 'express';
import sequelize from './config/database';
import userRoutes from './routes/userRoutes';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const app: Application = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Dress Shopping API',
            version: '1.0.0',
            description: 'Keep your registration forms simple. Optimize your conversions and let us determine the gender of your customers.',
        },
        servers: [{ url: `http://localhost:${PORT}` }],
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
    apis: ['./src/routes/*.ts'],
};

const specs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use('/api/users', userRoutes);

// Chỉ test connection, KHÔNG sync
sequelize.authenticate()
    .then(() => {
        console.log('✓ Database connected successfully');
        app.listen(PORT, () => {
            console.log(`✓ Server running on port ${PORT}`);
            console.log(`✓ Swagger docs at http://localhost:${PORT}/api-docs`);
        });
    })
    .catch((error: Error) => {
        console.error('✗ Unable to connect to database:', error);
        process.exit(1);
    });

export default app;