const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Stock Management API',
            version: '1.0.0',
            description: 'API documentation for Stock Management project' },
        servers: [
            {
                url: 'http://localhost:3000/api',
             },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'}
                }
},
security: [{ bearerAuth: [] }]
},
apis: ['./src/routes/*.js', './src/models/*.js'], // files containing annotations
};

const specs = swaggerJsdoc(options);
module.exports = { swaggerUi, specs };

