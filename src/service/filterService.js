const { Op, QueryTypes } = require("sequelize");
const { Sequelize } = require("../config/db");
const seq = require("../config/db");
const { RadiostationBattery, RadiostationReceiver,
    Radiostation, RadiostationType, StationType, 
    Manufactor, EnvironmentType, Media, RadiostationProduction } = require("../models/radiostation");
class FilterService {
    async strainer(options, page=1, pageSize=10){
        let whereConditionBattery = {}
        let whereConditionReceiver = {}
        let whereConditionProduction = {}
        let whereConditionRadiostation = {}

        for (const [key, value] of Object.entries(options)) {
            switch (key) {
                case "radiostaion":
                    if(value.station_type){
                        whereConditionRadiostation.stationTypeId = {[Op.or]: [{[Op.in]: value.station_type}, null]}
                    }
                    if(value.radiostaion_type) {
                        whereConditionRadiostation.radiostationTypeId = {[Op.or]: [{[Op.in]: value.radiostaion_type}, null]}
                    }
                    if(value.environment_type){
                        whereConditionRadiostation.environmentTypeId = {[Op.or]: [{[Op.in]: value.environment_type}, null]}
                    }   
                    if(value.cost_per_piece){
                        whereConditionRadiostation.cost_per_piece = {[Op.or]: [{[Op.between]: [Number(value.cost_per_piece.min) || -1,
                             Number(value.cost_per_piece.max) || 999999999]}, null]}
                    }
                    break
                case "receiver":
                    if(value.channel_type != undefined){
                        whereConditionReceiver.channelTypeId = {[Op.or]: [{[Op.in]: value.channel_type}, null]}
                    }
                    if(value.frequency_range != undefined){
                        whereConditionReceiver.min_frequency_range = {[Op.or]: [{[Op.gte]: Number(value.frequency_range.min) || -1}, null]}
                        whereConditionReceiver.max_frequency_range = {[Op.or]: [{[Op.lte]: Number(value.frequency_range.max) || 999999999}, null]}
                    }
                    if(value.communication_range != undefined){
                        whereConditionReceiver.communication_range = {[Op.or]: [{[Op.between]: [Number(value.communication_range.min) || -1,
                            Number(value.communication_range.max) || 999999999]}, null]}
                    }
                    if(value.receiver_power_range != undefined){
                        whereConditionReceiver.receiver_power = {[Op.or]: [{[Op.between]: [Number(value.receiver_power_range.min) || -1,
                            Number(value.receiver_power_range.max) || 999999999]}, null]}
                    }
                    if(value.temperature_range != undefined){
                        whereConditionReceiver.min_temperature_range = {[Op.or]: [{[Op.gte]: Number(value.temperature_range.min) || -1}, null]}
                        whereConditionReceiver.max_temperature_range = {[Op.or]: [{[Op.lte]: Number(value.temperature_range.max) || 999999999}, null]}
                    }
                    
                    if(value.channel_general_count != undefined){
                        whereConditionReceiver.channel_general_count = {[Op.or]: [{[Op.between]: [Number(value.channel_general_count.min) || -1,
                            Number(value.channel_general_count.max) || 999999999]}, null]}
                    }
                    if(value.is_mesh_net_function != undefined){
                        whereConditionReceiver.is_mesh_net_function =  {[Op.or]: [value.is_mesh_net_function, null]}
                    }
                    if(value.is_support_PPRCH != undefined){
                        whereConditionReceiver.is_support_PPRCH =  {[Op.or]: [value.is_support_PPRCH, null]}
                    }
                    break
                case "battery":
                    if(value.battery_type!= undefined){
                        whereConditionBattery.batterTypeId =  {[Op.or]: [{[Op.in]: value.battery_type}, null]}
                    }
                    if(value.capacity_range != undefined){
                        whereConditionReceiver.battery_capacity = {[Op.or]: [{[Op.between]: [Number(value.capacity_range.min) || -1,
                            Number(value.capacity_range.max) || 999999999]}, null]}
                    }
                    if(value.power_supply_range != undefined){
                        whereConditionReceiver.power_supply = {[Op.or]: [{[Op.between]: [Number(value.power_supply_range.min) || -1,
                            Number(value.power_supply_range.max) || 999999999]}, null]}
                    }
                    if(value.offline_work_range != undefined){
                        whereConditionReceiver.battery_offline_work = {[Op.or]: [{[Op.between]: [Number(value.offline_work_range.min) || -1,
                            Number(value.offline_work_range.max) || 999999999]}, null]}
                    }
                    if(value.time_transfer_mode_range != undefined){
                        whereConditionReceiver.battery_time_transfer_mode = {[Op.or]: [{[Op.between]: [Number(value.time_transfer_mode_range.min) || -1,
                            Number(value.time_transfer_mode_range.max) || 999999999]}, null]}
                    }
                    if(value.time_receiving_mode_range != undefined){
                        whereConditionReceiver.battery_time_receiving_mode = {[Op.or]: [{[Op.between]: [Number(value.time_receiving_mode_range.min) || -1,
                            Number(value.time_receiving_mode_range.max) || 999999999]}, null]}
                    }
                    if(value.reliability_range != undefined){
                        whereConditionReceiver.reliability = {[Op.or]: [{[Op.between]: [Number(value.reliability_range.min) || -1,
                            Number(value.reliability_range.max) || 999999999]}, null]}
                    }
                    break
                case "production":
                    if(value.own_production_facilities != undefined){
                        whereConditionProduction.own_production_facilities = {[Op.or]: [value.own_production_facilities, null]}
                    }
                    break
                }
        }

        const paginate = (query, { p, ps }) => {
            const offset = p * ps;
            const limit = ps;
            return {
                ...query,
                offset,
                limit
            }
        }
             let opt = paginate({
                   include: [
                    {model: RadiostationBattery, where: whereConditionBattery, required: false},
                    {model: RadiostationReceiver, where: whereConditionReceiver, required: false},
                    {model: StationType, required: false},
                    {model: Manufactor, required: false},
                    {model: RadiostationType, required: false},
                    {model: EnvironmentType, required: false},
                    {model: Media, required: false},
                    {model: RadiostationProduction, where: whereConditionProduction, required: false}],
                    where: whereConditionRadiostation
                }, {p: page-1, ps: pageSize})

            let r
            try{
                r = await Radiostation.findAndCountAll(opt)
                return {data: r}

            }catch(e){
                console.log(e)
            }
            return {data: r}
    }

    async search(query, page = 1, pageSize = 10) {
        const paginate = (q, { p, ps }) => {
            const offset = p * ps;
            const limit = ps;
          
            return {
              ...q,
              offset,
              limit,
            };
          };

        let r = await Radiostation.findAndCountAll(
            paginate({
                where: { 
                    name: {
                        [Op.iLike]: `%${query}%`
                    }
                },
                include: [ {model: RadiostationBattery},
                    {model: RadiostationReceiver},
                    {model: StationType},
                    {model: Manufactor},
                    {model: RadiostationType},
                    {model: EnvironmentType},
                    {model: Media},
                    {model: RadiostationProduction} ]
                }, { p:page-1, ps:pageSize }))

        return {data: r}
    }
}

module.exports = new FilterService()