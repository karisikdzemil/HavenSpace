const express = require('express');
const propertyController = require('../controllers/property');

const router = express.Router();

router.get('/', propertyController.getHome);

router.get('/properties', propertyController.getProperties);

// router.get('/property');

router.post('/property', propertyController.postProperty);

// router.put('/property');

// router.delete('/property');

module.exports = router;