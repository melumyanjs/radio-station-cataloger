const { StationType, 
        BatterType,
        ChannelType,
        EnvironmentType,
        RadiostationType, 
        BrandType} = require("../models/radiostation");

class TypeService {
    async create(type, data) {
        switch (type) {
            case 'station':
                return StationType.create(data)
            case 'batter':
                return BatterType.create(data)
            case 'channel':
                return ChannelType.create(data)
            case 'environment':
                return EnvironmentType.create(data)
            case 'radiostation':
                return RadiostationType.create(data)
            case 'brand': 
                return BrandType.create(data)
        }
    }

    async getAll(type) {
        switch (type) {
            case 'station':
                return StationType.findAll()
            case 'batter':
                return BatterType.findAll()
            case 'channel':
                return ChannelType.findAll()
            case 'environment':
                return EnvironmentType.findAll()
            case 'radiostation':
                return RadiostationType.findAll()
            case 'brand': 
                return BrandType.findAll()
        }
    }

    async getOne(type, data){
        switch (type) {
            case 'station':
                return StationType.findOne({where: {id: data.id}})
            case 'batter':
                return BatterType.findOne({where: {id: data.id}})
            case 'channel':
                return ChannelType.findOne({where: {id: data.id}})
            case 'environment':
                return EnvironmentType.findOne({where: {id: data.id}})
            case 'radiostation':
                return RadiostationType.findOne({where: {id: data.id}})
            case 'brand': 
                return BrandType.findOne({where: {id: data.id}})
        }
    }

    async deleteById(type, data){
        let isDelete = false
        switch (type) {
            case 'station':
                isDelete = await StationType.destroy({where: {id: data.id}})
                return {id: data.id, isDelete: Boolean(isDelete)}
            case 'batter':
                isDelete = await BatterType.destroy({where: {id: data.id}})
                return {id: data.id, isDelete: Boolean(isDelete)}
            case 'channel':
                isDelete = await ChannelType.destroy({where: {id: data.id}})
                return {id: data.id, isDelete: Boolean(isDelete)}
            case 'environment':
                isDelete = await EnvironmentType.destroy({where: {id: data.id}})
                return {id: data.id, isDelete: Boolean(isDelete)}
            case 'radiostation':
                isDelete = await RadiostationType.destroy({where: {id: data.id}})
                return {id: data.id, isDelete: Boolean(isDelete)}
            case 'brand': 
                isDelete = await BrandType.destroy({where: {id: data.id}})
                return {id: data.id, isDelete: Boolean(isDelete)}
        }
    }

    async update(type, data){
        switch (type) {
            case 'station':
                let stationEdit = await StationType.findOne({where: {id: data.id}}) 
                stationEdit.set(data)
                return stationEdit.save()
            case 'batter':
                let batterEdit = await BatterType.findOne({where: {id: data.id}}) 
                batterEdit.set(data)
                return batterEdit.save()
            case 'channel':
                let channelEdit = await ChannelType.findOne({where: {id: data.id}}) 
                channelEdit.set(data)
                return channelEdit.save()
            case 'environment':
                let environmentEdit = await EnvironmentType.findOne({where: {id: data.id}}) 
                environmentEdit.set(data)
                return environmentEdit.save()
            case 'radiostation':
                let radiostationEdit = await RadiostationType.findOne({where: {id: data.id}}) 
                radiostationEdit.set(data)
                return radiostationEdit.save()
            case 'brand':   
                let brandEdit = await BrandType.findOne({where: {id: data.id}}) 
                brandEdit.set(data)
                return brandEdit.save()
        }
    }
}

module.exports = new TypeService();