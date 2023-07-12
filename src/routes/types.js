const Router = require('express')
const { stationType,
        radiostationType,
        environmentType,
        channelType,
        batterType, 
        brandType} = require('../controller/typesConstroller')
const router = new Router() 
const checkRoleMiddleware = require('../middelware/checkRoleMiddleware')
const {body} = require('express-validator')

// StationType
// localhost/api/type/station/create
router.post('/station/create', checkRoleMiddleware("Admin"), stationType.create)
// localhost/api/type/station/update
router.put('/station/update', checkRoleMiddleware("Admin"), stationType.update)
// localhost/api/type/station/delete
router.delete('/station/delete', checkRoleMiddleware("Admin"), stationType.deleteById)
// localhost/api/type/station/:id
router.get('/station/get/:id', stationType.getOne)
// localhost/api/type/station/list
router.get('/station/list', stationType.getAll)
// ===================================

// RadiostationType
/// localhost/api/type/radiostation/create
router.post('/radiostation/create', checkRoleMiddleware("Admin"), radiostationType.create)
// localhost/api/type/radiostation/update
router.put('/radiostation/update', checkRoleMiddleware("Admin"), radiostationType.update)
// localhost/api/type/radiostation/delete/
router.delete('/radiostation/delete/', checkRoleMiddleware("Admin"), radiostationType.deleteById)
// localhost/api/type/radiostation/:id
router.get('/radiostation/get/:id', radiostationType.getOne)
// localhost/api/type/radiostation/list
router.get('/radiostation/list', radiostationType.getAll)
// ===================================


// EnvironmentType
/// localhost/api/type/environment/create
router.post('/environment/create', checkRoleMiddleware("Admin"), environmentType.create)
// localhost/api/type/environment/update
router.put('/environment/update', checkRoleMiddleware("Admin"), environmentType.update)
// localhost/api/type/environment/delete/
router.delete('/environment/delete/', checkRoleMiddleware("Admin"), environmentType.deleteById)
// localhost/api/type/environment/:id
router.get('/environment/get/:id', environmentType.getOne)
// localhost/api/type/environment/list
router.get('/environment/list', environmentType.getAll)
// ====================================

// ChannelType
/// localhost/api/type/channel/create
router.post('/channel/create', checkRoleMiddleware("Admin"), channelType.create)
// localhost/api/type/channel/update
router.put('/channel/update', checkRoleMiddleware("Admin"), channelType.update)
// localhost/api/type/channel/delete/
router.delete('/channel/delete/', checkRoleMiddleware("Admin"), channelType.deleteById)
// localhost/api/type/channel/:id
router.get('/channel/get/:id', channelType.getOne)
// localhost/api/type/channel/list
router.get('/channel/list', channelType.getAll)
// ====================================

// BatterType
/// localhost/api/type/batter/create
router.post('/batter/create', checkRoleMiddleware("Admin"), batterType.create)
// localhost/api/type/batter/update
router.put('/batter/update', checkRoleMiddleware("Admin"), batterType.update)
// localhost/api/type/batter/delete/
router.delete('/batter/delete/', checkRoleMiddleware("Admin"), batterType.deleteById)
// localhost/api/type/batter/:id
router.get('/batter/get/:id', batterType.getOne)
// localhost/api/type/batter/list
router.get('/batter/list', batterType.getAll)
// ====================================

// BrandType
/// localhost/api/type/brand/create
router.post('/brand/create', checkRoleMiddleware("Admin"), brandType.create)
// localhost/api/type/brand/update
router.put('/brand/update', checkRoleMiddleware("Admin"), brandType.update)
// localhost/api/type/brand/delete/
router.delete('/brand/delete/', checkRoleMiddleware("Admin"), brandType.deleteById)
// localhost/api/type/brand/:id
router.get('/brand/get/:id', brandType.getOne)
// localhost/api/type/brand/list
router.get('/brand/list', brandType.getAll)
// ====================================

module.exports = router