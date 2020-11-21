const app = require('../app');
const model = require('../models');

const bcrypt = require('bcrypt');

const staff = {
    authenticate: async (req, res) => {
        let staff = await model.staff.findOne({
            where: {
                identityCard: req.body.identityCard
            }
        });

        if (!staff) {
            return res.status(400).send("Cannot Find Staff")
        }
        try {
            if (await bcrypt.compare(req.body.password, staff.password)) {
                res.json(staff)
            }
        } catch {
            res.status(500).send();
        }
    },
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
            let hashedPassword = await bcrypt.hash(req.body.password, 10)

            staff = await model.staff.create({
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