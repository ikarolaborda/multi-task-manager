const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const routes = require('./config/routes');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const PORT = 3001;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({
    origin: 'http://localhost:8081'
}));

// Swagger Doc Routes
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Multi-task Manager API',
            version: '1.0.0',
            description: 'API documentation for the Multi-task Manager application',
        },
        servers: [
            {
                url: `http://localhost:${PORT}/api`,
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
    },
    apis: ['./config/*.js', './controllers/*.js'],
};

const specs = swaggerJsdoc(options);

app.use('/api/docs', swaggerUi.serve);
app.get('/api/docs', swaggerUi.setup(specs));

// App routes
app.use('/api', routes);

//Healthcheck
app.get('/_healthcheck', (req, res) => {
    res.json({ status: "the application is running" });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
