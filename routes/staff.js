var staffController = require('../controller/staff');
var express = require('express');
var router = express.Router();

router.get('/', staffController.getStaffs);
router.get('/:id', staffController.findStaff);
router.post('/', staffController.createStaff);
router.post('/authenticate', staffController.authenticate);
router.patch('/:id', staffController.updateStaff);
router.delete('/:id', staffController.deleteStaff);

module.exports = router;