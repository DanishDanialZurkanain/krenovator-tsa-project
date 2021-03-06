import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Appointment from '../views/Appointment.vue'
import Patient from '../views/Patient.vue'
import Register from '../views/Register.vue'
import Service from '../views/Service.vue'
import Setting from '../views/Setting.vue'
import Staff from '../views/Staff.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/appointment',
        name: 'Appointment',
        component: Appointment
    },
    {
        path: '/about',
        name: 'About',
        component: About
    },
    {
        path: '/patient',
        name: 'Patient',
        component: Patient
    },
    {
        path: '/service',
        name: 'Service',
        component: Service
    },
    {
        path: '/staff',
        name: 'Staff',
        component: Staff
    },
    {
        path: '/register',
        name: 'Register',
        component: Register
    },
    {
        path: '/setting',
        name: 'Setting',
        component: Setting
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
