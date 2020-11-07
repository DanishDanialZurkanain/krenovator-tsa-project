const app = require('../app');
var model = require('../models');

const staff = {
    getStaffs: async (req, res) => {
        let staffs = [];

        try {
            staffs = await model.staff.findAll();
        } catch (e) {
            console.log(e);
        }

        res.json(staffs);
    },
    findStaff: async (req, res) => {
        let staff = [];

        try {
            staff = await model.staff.findOne({
                where: {
                    id: req.params.id
                }
            })
        } catch (e) {
            console.log(e);
        }

        res.json(staff);
    },
    createStaff: async (req, res) => {
        let staff = {};

        try {
            staff = await model.staff.create({
                email: req.body.email,
                fullName: req.body.fullName,
                role: req.body.role,
                password: req.body.password,
                phoneNumber: req.body.phoneNumber
            })
        } catch (e) {
            console.log(e);
        }

        res.json(staff);
    },
    updateStaff: async (req, res) => {
        let staff = {};

        try {
            staff = await model.staff.update(
                req.body, {
                where: {
                    id: req.params.id
                }
            }
            )
        } catch (e) {
            console.log(e);
        }

        res.json(staff);
    },
    deleteStaff: async (req, res) => {
        await model.staff.destroy({
            where: {
                id: req.params.id
            }
        })

        res.status(204).json({
            status: 'Success'
        })
    }
}

module.exports = staff;