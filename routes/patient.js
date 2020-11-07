var patientController = require('../controller/patient');
var express = require('express');
var router = express.Router();

router.get('/', patientController.getPatients);
router.get('/:id', patientController.findPatient);
router.post('/', patientController.createPatient);
router.patch('/:id', patientController.updatePatient);
router.delete('/:id', patientController.deletePatient);

module.exports = router;