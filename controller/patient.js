const app = require('../app');
const model = require('../models');

const bcrypt = require('bcrypt');

const patient = {
    authenticate: async (req, res) => {
        let patient = await model.patient.findOne({
            where: {
                identityCard: req.body.identityCard
            }
        });

        if (!patient) {
            return res.status(400).send("Cannot Find Patient")
        }
        try {
            if (await bcrypt.compare(req.body.password, patient.password)) {
                res.json(patient)
            }
        } catch {
            res.status(500).send();
        }
    },
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
            let hashedPassword = await bcrypt.hash(req.body.password, 10)

            patient = await model.patient.create({
                email: req.body.email,
                fullName: req.body.fullName,
                identityCard: req.body.identityCard,
                role: req.body.role,
                password: hashedPassword,
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