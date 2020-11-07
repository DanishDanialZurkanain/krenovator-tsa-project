const app = require('../app');
const model = require('../models');

const service = {
    getServices: async (req, res) => {
        let services = [];

        try {
            services = await model.service.findAll();
        } catch (e) {
            console.log(e);
        }

        res.json(services)
    },
    createService: async (req, res) => {
        let service = {};

        try {
            service = await model.service.create({
                title: req.body.title,
                description: req.body.description
            })
        } catch (e) {
            console.log(e);
        }

        res.json(service)
    },
    updateService: async (req, res) => {
        let service = {};

        try {
            service = await model.service.update(
                req.body, {
                where: {
                    id: req.params.id
                }
            }
            )
        } catch (e) {
            console.log(e);
        }

        res.json(service)
    },
    deleteService: async (req, res) => {
        await model.service.destroy({
            where: {
                id: req.params.id
            }
        })

        res.status(204).json({
            status: 'Success'
        })
    }
}

module.exports = service;