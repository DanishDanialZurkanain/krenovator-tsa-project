var appointmentController = require('../controller/appointment');
var express = require('express');
var router = express.Router();

router.get('/', appointmentController.getAppointments);
router.get('/:id', appointmentController.findAppointment);
router.post('/', appointmentController.createAppointment);
router.patch('/:id', appointmentController.updateAppointment);
router.delete('/:id', appointmentController.deleteAppointment);

module.exports = router;