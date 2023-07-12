const Router = require('express')
const router = new Router() 
const controller = require('../controller/filterController')

// localhost:5000/api/filter/search?q=&page=&pageSize=
router.get('/search', controller.search)
// localhost:5000/api/filter/strainer
router.post('/strainer', controller.strainer)

 
module.exports = router