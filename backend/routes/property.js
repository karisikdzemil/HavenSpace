const express = require('express');
const propertyController = require('../controllers/property');

const router = express.Router();

router.get('/', propertyController.getHome);

router.get('/properties', propertyController.getProperties);

router.get('/property/:id', propertyController.getProperty);

router.post('/property', propertyController.postProperty);

router.put('/property/:id', propertyController.editProperty);

router.delete('/property/:id', propertyController.deleteProperty);

module.exports = router;