const express = require('express');
const propertyController = require('../controllers/property');

const router = express.Router();

router.get('/', propertyController.getHome);

// router.get('/properties');

// router.get('/property');

// router.post('/property');

// router.put('/property');

// router.delete('/property');

module.exports = router;