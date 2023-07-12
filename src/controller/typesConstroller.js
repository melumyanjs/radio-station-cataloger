const typeService = require('../service/typeService')
const ApiError = require('../handler/apiError')

class StationType {
    async create (req, res, next) {
        try {
            const data = await typeService.create('station', req.body.data)
            if (!data){
                return next(ApiError.badRequest('Не удалось создать station-type!'))
            }

            return res.json(data)
        } catch(e) {
            return next(e)
        }
    }

    async deleteById (req, res, next) {
        try {
            const data = await typeService.deleteById('station', {id: req.body.data.id})
            if (!data){
                return next(ApiError.badRequest(`Не удалось удалить station-type ${req.body.data.id}!`))
            }  

            return res.json(data)
        } catch(e) {
            return next(e)
        }
    }

    async update (req, res, next) {
        try {
            const data = await typeService.update('station', req.body.data)
            if (!data){
                return next(ApiError.badRequest(`Не удалить обновить station-type ${req.body.data.id}!`))
            }

            return res.json(data)
        } catch(e) {
            return next(e)
        }
    }

    async getAll (req, res, next) {
        try { 
            const data = await typeService.getAll('station')
           
            if (!data){
                return next(ApiError.badRequest(`Не удалить получить station-type!`))
            }
            
            return res.json(data)
        } catch(e) {
            return next(e)
        }
    }

    async getOne (req, res, next) {
        try {
            const data = await typeService.getOne('station', {id: req.params.id})
            if (!data){
                return next(ApiError.badRequest(`Не удалить получить station-type ${req.params.id}!`))
            }
            
            return res.json(data)
        } catch(e) {
            return next(e)
        }
    }
}

class RadiostationType {
    async create (req, res, next) {
        try {
            const data = await typeService.create('radiostation', req.body.data)
            if (!data){
                return next(ApiError.badRequest('Не удалось создать radiostation-type!'))
            }

            return res.json(data)
        } catch(e) {
            return next(e)
        }
    }

    async deleteById (req, res, next) {
        try {
            const data = await typeService.deleteById('radiostation', {id: req.body.data.id})
            if (!data){
                return next(ApiError.badRequest(`Не удалось удалить radiostation-type ${req.body.data.id}!`))
            }  

            return res.json(data)
        } catch(e) {
            return next(e)
        }
    }

    async update (req, res, next) {
        try {
            const data = await typeService.update('radiostation', req.body.data)
            if (!data){
                return next(ApiError.badRequest(`Не удалить обновить radiostation-type ${req.body.data.id}!`))
            }

            return res.json(data)
        } catch(e) {
            return next(e)
        }
    }

    async getAll (req, res, next) {
        try { 
            const data = await typeService.getAll('radiostation')
           
            if (!data){
                return next(ApiError.badRequest(`Не удалить получить radiostation-type!`))
            }
            
            return res.json(data)
        } catch(e) {
            return next(e)
        }
    }

    async getOne (req, res, next) {
        try {
            const data = await typeService.getOne('radiostation', {id: req.params.id})
            if (!data){
                return next(ApiError.badRequest(`Не удалить получить radiostation-type ${req.params.id}!`))
            }
            
            return res.json(data)
        } catch(e) {
            return next(e)
        }
    }
}

class EnvironmentType {
    async create (req, res, next) {
        try {
            const data = await typeService.create('environment', req.body.data)
            if (!data){
                return next(ApiError.badRequest('Не удалось создать environment-type!'))
            }

            return res.json(data)
        } catch(e) {
            return next(e)
        }
    }

    async deleteById (req, res, next) {
        try {
            const data = await typeService.deleteById('environment', {id: req.body.data.id})
            if (!data){
                return next(ApiError.badRequest(`Не удалось удалить environment-type ${req.body.data.id}!`))
            }  

            return res.json(data)
        } catch(e) {
            return next(e)
        }
    }

    async update (req, res, next) {
        try {
            const data = await typeService.update('environment', req.body.data)
            if (!data){
                return next(ApiError.badRequest(`Не удалить обновить environment-type ${req.body.data.id}!`))
            }

            return res.json(data)
        } catch(e) {
            return next(e)
        }
    }

    async getAll (req, res, next) {
        try { 
            const data = await typeService.getAll('environment')
           
            if (!data){
                return next(ApiError.badRequest(`Не удалить получить environment-type!`))
            }
            
            return res.json(data)
        } catch(e) {
            return next(e)
        }
    }

    async getOne (req, res, next) {
        try {
            const data = await typeService.getOne('environment', {id: req.params.id})
            if (!data){
                return next(ApiError.badRequest(`Не удалить получить environment-type ${req.params.id}!`))
            }
            
            return res.json(data)
        } catch(e) {
            return next(e)
        }
    }
}

class ChannelType {
    async create (req, res, next) {
        try {
            const data = await typeService.create('channel', req.body.data)
            if (!data){
                return next(ApiError.badRequest('Не удалось создать channel-type!'))
            }

            return res.json(data)
        } catch(e) {
            return next(e)
        }
    }

    async deleteById (req, res, next) {
        try {
            const data = await typeService.deleteById('channel', {id: req.body.data.id})
            if (!data){
                return next(ApiError.badRequest(`Не удалось удалить channel-type ${req.body.data.id}!`))
            }  

            return res.json(data)
        } catch(e) {
            return next(e)
        }
    }

    async update (req, res, next) {
        try {
            const data = await typeService.update('channel', req.body.data)
            if (!data){
                return next(ApiError.badRequest(`Не удалить обновить channel-type ${req.body.data.id}!`))
            }

            return res.json(data)
        } catch(e) {
            return next(e)
        }
    }

    async getAll (req, res, next) {
        try { 
            const data = await typeService.getAll('channel')
           
            if (!data){
                return next(ApiError.badRequest(`Не удалить получить channel-type!`))
            }
            
            return res.json(data)
        } catch(e) {
            return next(e)
        }
    }

    async getOne (req, res, next) {
        try {
            const data = await typeService.getOne('channel', {id: req.params.id})
            if (!data){
                return next(ApiError.badRequest(`Не удалить получить channel-type ${req.params.id}!`))
            }
            
            return res.json(data)
        } catch(e) {
            return next(e)
        }
    }
}

class BatterType {
    async create (req, res, next) {
        try {
            const data = await typeService.create('batter', req.body.data)
            if (!data){
                return next(ApiError.badRequest('Не удалось создать batter-type!'))
            }

            return res.json(data)
        } catch(e) {
            return next(e)
        }
    }

    async deleteById (req, res, next) {
        try {
            const data = await typeService.deleteById('batter', {id: req.body.data.id})
            if (!data){
                return next(ApiError.badRequest(`Не удалось удалить batter-type ${req.body.data.id}!`))
            }  

            return res.json(data)
        } catch(e) {
            return next(e)
        }
    }

    async update (req, res, next) {
        try {
            const data = await typeService.update('batter', req.body.data)
            if (!data){
                return next(ApiError.badRequest(`Не удалить обновить batter-type ${req.body.data.id}!`))
            }

            return res.json(data)
        } catch(e) {
            return next(e)
        }
    }

    async getAll (req, res, next) {
        try { 
            const data = await typeService.getAll('batter')
           
            if (!data){
                return next(ApiError.badRequest(`Не удалить получить batter-type!`))
            }
            
            return res.json(data)
        } catch(e) {
            return next(e)
        }
    }

    async getOne (req, res, next) {
        try {
            const data = await typeService.getOne('batter', {id: req.params.id})
            if (!data){
                return next(ApiError.badRequest(`Не удалить получить batter-type ${req.params.id}!`))
            }
            
            return res.json(data)
        } catch(e) {
            return next(e)
        }
    }
}


class BrandType {
    async create (req, res, next) {
        try {
            const data = await typeService.create('brand', req.body.data)
            if (!data){
                return next(ApiError.badRequest('Не удалось создать brand-type!'))
            }

            return res.json(data)
        } catch(e) {
            return next(e)
        }
    }

    async deleteById (req, res, next) {
        try {
            const data = await typeService.deleteById('brand', {id: req.body.data.id})
            if (!data){
                return next(ApiError.badRequest(`Не удалось удалить brand-type ${req.body.data.id}!`))
            }  

            return res.json(data)
        } catch(e) {
            return next(e)
        }
    }

    async update (req, res, next) {
        try {
            const data = await typeService.update('brand', req.body.data)
            if (!data){
                return next(ApiError.badRequest(`Не удалить обновить brand-type ${req.body.data.id}!`))
            }

            return res.json(data)
        } catch(e) {
            return next(e)
        }
    }

    async getAll (req, res, next) {
        try { 
            const data = await typeService.getAll('brand')
           
            if (!data){
                return next(ApiError.badRequest(`Не удалить получить brand-type!`))
            }
            
            return res.json(data)
        } catch(e) {
            return next(e)
        }
    }

    async getOne (req, res, next) {
        try {
            const data = await typeService.getOne('brand', {id: req.params.id})
            if (!data){
                return next(ApiError.badRequest(`Не удалить получить brand-type ${req.params.id}!`))
            }
            
            return res.json(data)
        } catch(e) {
            return next(e)
        }
    }
}

const stationType = new StationType()
const radiostationType = new RadiostationType()
const environmentType = new EnvironmentType()
const channelType = new ChannelType()
const batterType = new BatterType()
const brandType = new BrandType()


module.exports = { 
    stationType, 
    radiostationType, 
    environmentType, 
    channelType, 
    batterType,
    brandType
}