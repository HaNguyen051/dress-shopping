import express, { Application } from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { sequelize } from './models'; // Import từ models/index.ts
import userRoutes from './routes/userRoutes';

const app: Application = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Swagger definition
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
                    description: 'Enter your JWT token (without "Bearer" prefix)'
                }
            },
        },
        security: [
            {
                bearerAuth: []
            }
        ]
    },
    apis: ['./src/routes/*.ts'],
};

const specs = swaggerJsdoc(swaggerOptions);

const swaggerUiOptions = {
    swaggerOptions: {
        persistAuthorization: true,
        displayRequestDuration: true,
        docExpansion: 'none',
        filter: true,
        requestInterceptor: (req: any) => {
            if (req.headers.Authorization && !req.headers.Authorization.startsWith('Bearer ')) {
                req.headers.Authorization = `Bearer ${req.headers.Authorization}`;
            }
            return req;
        }
    },
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'Dress Shopping API'
};

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, swaggerUiOptions));

// Routes
app.use('/api/users', userRoutes);

// Start server function
const startServer = async () => {
    try {
        // Test database connection
        await sequelize.authenticate();
        console.log('✓ Database connected successfully');

        // Sync all models with database
        // Sử dụng { alter: true } để update schema mà không mất data
        // Sử dụng { force: true } nếu muốn xóa và tạo lại tables (CHÚ Ý: sẽ mất hết data)
        await sequelize.sync({ alter: true });
        console.log('✓ All models synchronized successfully');

        // Start listening
        app.listen(PORT, () => {
            console.log(`✓ Server running on port ${PORT}`);
            console.log(`✓ Swagger docs at http://localhost:${PORT}/api-docs`);
        });
    } catch (error) {
        console.error('✗ Unable to start server:', error);
        process.exit(1);
    }
};

// Start the server
startServer();

export default app;