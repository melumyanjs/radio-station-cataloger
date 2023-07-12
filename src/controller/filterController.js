const ApiError = require('../handler/apiError')
const filterService = require('../service/filterService')

class FilterController {
    
    async strainer(req, res, next) {
        try {
            const data = await filterService.strainer(req.body.options, req.query.page, req.query.pageSizeы)
            if (!data){
                return next(ApiError.badRequest('Ошибка поиска!'))
            }
     
            return res.json(data)
        } catch(e) {
            return next(e)
        }
    }

    async search (req, res, next) {
        try {
            const data = await filterService.search(req.query.q, req.query.page, req.query.pageSize)
            if (!data){
                return next(ApiError.badRequest('Ошибка поиска!'))
            }
     
            return res.json(data)
        } catch(e) {
            return next(e)
        }
    }

    
}

module.exports = new FilterController()