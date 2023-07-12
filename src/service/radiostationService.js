const { Radiostation, RadiostationBattery, 
    RadiostationProduction, 
    RadiostationReceiver, 
    Manufactor, 
    StationType,
    RadiostationType,
    EnvironmentType,
    Media
 } = require("../models/radiostation")
const sequelize = require('../config/db');
const apiError = require("../handler/apiError");
const uuid = require('uuid')
const path = require('path');

class RadiostationService {

    async create(data, files) {
        const radiostationBattery = data.radiostationBattery
        const radiostationReceiver = data.radiostationReceiver
        const radiostation = data.radiostation
        const manufactor = data.manufactor
        const radiostationProduction = data.radiostationProduction
      
        let m, b, rc, r, f = null
        let t = await sequelize.transaction()
        try {
            b = await RadiostationBattery.create(radiostationBattery, {transaction: t})   
            rc = await RadiostationReceiver.create(radiostationReceiver, {transaction: t}) 
            m = await Manufactor.create(manufactor, {transaction: t})
            r = await Radiostation.create({
                ...radiostation, 
                radiostationBatteryId: b.id,
                radiostationReceiverId: rc.id,
                manufactorId: m.id
            },{transaction: t})
 
            const {img} = files
            let fileName = `${uuid.v4()}.${img.mimetype.split('/')[1]}`
            let fullFileName = path.resolve(__dirname, '..', 'static', fileName) 

            await img.mv(fullFileName)
            await Media.create({
                uri: fileName, 
                media_type: "PHOTO", 
                radiostationId: r.id
            },{transaction: t})

            await RadiostationProduction.create({
                ...radiostationProduction,
                radiostationId: r.id
            },{transaction: t})

            await t.commit();
          } catch (error) {
            await t.rollback();
            throw apiError.internal(error)
          }

        const newRadiostation = await this.getOne(r.id)

        return {data: newRadiostation}
    }

    async getAll(page = 1, pageSize = 10) {

        const paginate = (query, { p, ps }) => {
            const offset = p * ps;
            const limit = ps;
          
            return {
              ...query,
              offset,
              limit,
            };
          };

        let r = await Radiostation.findAndCountAll( paginate({ include: [
                    {model: RadiostationBattery}, {model: RadiostationReceiver},
                    {model: StationType}, {model: Manufactor}, {model: RadiostationType},
                    {model: EnvironmentType}, {model: Media},{model: RadiostationProduction}]}, { p:page-1, ps:pageSize }))



        return {data: r}
    }

    async getOne(id){   
      let r = await Radiostation.findOne({
            where: {id},
            include: [
                {model: RadiostationBattery},
                {model: RadiostationReceiver},
                {model: StationType},
                {model: Manufactor},
                {model: RadiostationType},
                {model: EnvironmentType},
                {model: Media},
                {model: RadiostationProduction}
            ]})
            
        return {data: r}
    }
    
    async deleteById(data){
        let isDelete = false
        isDelete = await Radiostation.destroy({where: {id: data.id}})
        return {id: data.id, isDelete: Boolean(isDelete)}
    }

    async update(data){
        let stationEdit = await Radiostation.findOne({where: {id: data.id}}) 
        stationEdit.set(data)
        return stationEdit.save()
    }
}



module.exports = new RadiostationService()