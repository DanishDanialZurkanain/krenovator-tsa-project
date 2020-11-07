const app = require('../app');
var model = require('../models');

const patient = {
    getPatients: async (req, res) => {
        let patients = [];

        try {
            patients = await model.patient.findAll();
        } catch (e) {
            console.log(e);
        }

        res.json(patients);
    },
    findPatient: async (req, res) => {
        let patient = [];

        try {
            patient = await model.patient.findOne({
                where: {
                    id: req.params.id
                }
            })
        } catch (e) {
            console.log(e);
        }

        res.json(patient);
    },
    createPatient: async (req, res) => {
        let patient = {};

        try {
            patient = await model.patient.create({
                email: req.body.email,
                fullName: req.body.fullName,
                identityCard: req.body.identityCard,
                role: req.body.role,
                password: req.body.password,
                phoneNumber: req.body.phoneNumber
            })
        } catch (e) {
            console.log(e);
        }

        res.json(patient);
    },
    updatePatient: async (req, res) => {
        let patient = {};

        try {
            patient = await model.patient.update(
                req.body, {
                where: {
                    id: req.params.id
                }
            }
            )
        } catch (e) {
            console.log(e);
        }

        res.json(patient);
    },
    deletePatient: async (req, res) => {
        await model.patient.destroy({
            where: {
                id: req.params.id
            }
        })

        res.status(204).json({
            status: 'Success'
        })
    }
}

module.exports = patient;