const app = require('../app');
var model = require('../models');

const appointment = {
    getAppointments: async (req, res) => {
        let appointments = [];

        try {
            appointments = await model.appointment.findAll();
        } catch (e) {
            console.log(e);
        }

        res.json(appointments);
    },
    findAppointment: async (req, res) => {
        let appointment = [];

        try {
            appointment = await model.appointment.findOne({
                where: {
                    id: req.params.id
                }
            })
        } catch (e) {
            console.log(e);
        }

        res.json(appointment);
    },
    createAppointment: async (req, res) => {
        let appointment = {};

        try {
            appointment = await model.appointment.create({
                date: req.body.date,
                time: req.body.time,
                patientId: req.body.patientId,
                serviceId: req.body.serviceId,
                status: req.body.status
            })
        } catch (e) {
            console.log(e);
        }

        res.json(appointment);
    },
    updateAppointment: async (req, res) => {
        let appointment = {};

        try {
            appointment = await model.appointment.update(
                req.body, {
                where: {
                    id: req.params.id
                }
            }
            )
        } catch (e) {
            console.log(e);
        }

        res.json(appointment);
    },
    deleteAppointment: async (req, res) => {
        await model.appointment.destroy({
            where: {
                id: req.params.id
            }
        })

        res.status(204).json({
            status: 'Success'
        })
    }
}

module.exports = appointment;