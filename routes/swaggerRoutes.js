const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../config/swagger.json');
router.use('/api-docs', swaggerUi.serve);
router.use('/api-docs', swaggerUi.setup(swaggerDocument));


module.exports = router;