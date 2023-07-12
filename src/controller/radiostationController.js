const radiostationService = require('../service/radiostationService')
const ApiError = require('../handler/apiError')

class RadiostationController {

    async create (req, res, next) {
        try {
            const obj = JSON.parse(req.body.data)
            const data = await radiostationService.create(obj, req.files)
            
            if (!data){
                return next(ApiError.badRequest('Не удалось создать Radiostation!'))
            }

            return res.json(data)
        } catch(e) {
            return next(e)
        }
    }

    async deleteById (req, res, next) {
        try {

        } catch(e) {
            return next(e)
        }
    }

    async update (req, res, next) {
        try {
            const data = await radiostationService.update(req.body.data)
            if (!data){
                return next(ApiError.badRequest(`Не удалить обновить radiostationService ${req.body.data.id}!`))
            }

            return res.json(data)
        } catch(e) {
            return next(e)
        }
    }

    async getAll (req, res, next) {
        try {
            const data = await radiostationService.getAll(req.query.page, req.query.pageSize)
            if (!data){
                return next(ApiError.badRequest('Не удалось создать Radiostation!'))
            }

            return res.json(data)
        } catch(e) {
            return next(e)
        }
    }

    async getOne (req, res, next) {
        try {
            const data = await radiostationService.getOne(req.params.id)
            
            if (!data){
                return next(ApiError.badRequest('Не удалось создать Radiostation!'))
            }

            return res.json(data)
        } catch(e) {
            return next(e)
        }
    }
}

module.exports = new RadiostationController()