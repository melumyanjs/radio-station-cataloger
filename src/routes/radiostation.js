const Router = require('express')
const controller = require('../controller/radiostationController')
const router = new Router() 
const checkRoleMiddleware = require('../middelware/checkRoleMiddleware')
const {body} = require('express-validator')


// localhost/api/radiostation/create
router.post('/create', checkRoleMiddleware("Admin"), controller.create)
// localhost/api/radiostation/update
router.post('/update', checkRoleMiddleware("Admin"), controller.update)
// localhost/api/radiostation/delete/:id
router.post('/delete/:id', checkRoleMiddleware("Admin"), controller.deleteById)
// localhost/api/radiostation/get/:id
router.get('/get/:id', controller.getOne)
// localhost/api/radiostation/list
router.get('/list', controller.getAll)


module.exports = router