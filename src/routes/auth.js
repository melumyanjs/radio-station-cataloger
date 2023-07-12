const Router = require('express')
const controller = require('../controller/authController')
const authRoutes = new Router() 
const {body} = require('express-validator')
const checkRoleMiddleware = require('../middelware/checkRoleMiddleware')
const authMiddleware = require('../middelware/authMiddleware')

// localhost:5000/api/auth/login
// TODO Описать все роуты правильно
/**
 * @swagger
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       required:
 *         - title
 *         - author
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the book
 *         title:
 *           type: string
 *           description: The book title
 *         author:
 *           type: string
 *           description: The book author
 *       example:
 *         id: d5fE_asz
 *         title: The New Turing Omnibus
 */
authRoutes.post('/login', 
                body('name').isLength({min: 5, max: 30}),
                body('password').isLength({min:8}),
                controller.login)

// localhost:5000/api/auth/register
authRoutes.post('/register', /*checkRoleMiddleware("Admin"),*/
                body('name').isLength({min: 5, max: 30}),
                body('password').isLength({min:8}),
                body('role').isNumeric(),
                controller.register)

// localhost:5000/api/auth/logout
authRoutes.post('/logout', authMiddleware, controller.logout)

module.exports = authRoutes