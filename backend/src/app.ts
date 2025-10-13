import express, { Application } from 'express';
import sequelize from './config/database';
import userRoutes from './routes/userRoutes';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

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
                    description: 'Enter your JWT token in the format: Bearer <token>'
                }
            },
        },

    },
    apis: ['./src/routes/*.ts'],
};

const specs = swaggerJsdoc(swaggerOptions);


const swaggerUiOptions = {
    swaggerOptions: {
        persistAuthorization: false, // Không lưu token khi refresh page
        displayRequestDuration: true,
        docExpansion: 'none',
        filter: true,
    },
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'Dress Shopping API'
};

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, swaggerUiOptions));

app.use('/api/users', userRoutes);

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
sequelize.sync({ alter: true })  // Update schema theo model mới
    .then(() => {
        console.log('DB synced! Bảng Users updated theo model.');
        app.listen(5000, () => console.log('Server on 5000'));
    })
    .catch(err => console.error('Sync error:', err));
export default app;

