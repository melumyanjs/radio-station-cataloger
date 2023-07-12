const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");

const Radiostation = sequelize.define("radiostation", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  radiostation_type_descp: { type: DataTypes.STRING },
  name: { type: DataTypes.STRING },
  size: { type: DataTypes.STRING },
  weight: { type: DataTypes.FLOAT }, // В кг
  elements_base: { type: DataTypes.STRING },
  software: { type: DataTypes.STRING },
  cost_per_piece: { type: DataTypes.DOUBLE }, // В рублях
  ipx: { type: DataTypes.STRING },
  encryption: { type: DataTypes.STRING },
  documentation: { type: DataTypes.STRING },
});

const Manufactor = sequelize.define("manufactor", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  caption: { type: DataTypes.STRING },
  legal_address: { type: DataTypes.STRING },
  physical_address: { type: DataTypes.STRING },
  manufacture_address: { type: DataTypes.STRING },
  tel: { type: DataTypes.STRING },
  mail: { type: DataTypes.STRING },
  official_site: { type: DataTypes.STRING },
  manufactor_city: { type: DataTypes.STRING },
  real_manufactor_city: { type: DataTypes.STRING },
  country: { type: DataTypes.STRING },
});

const BrandType = sequelize.define("brand_type", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  caption: { type: DataTypes.STRING },
  country: { type: DataTypes.STRING },
})

// Тип станции
// Носимая
// Возимый
// Стационарный
// Возимая/стационарная
// Бортовая
const StationType = sequelize.define("station_type", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  caption: { type: DataTypes.STRING },
});

// Тип приёмника
// Цифровой
// Аналоговый
const RadiostationType = sequelize.define("radiostation_type", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  caption: { type: DataTypes.STRING },
});

// Среда эксплуатации
// Наземная
// Воздушная
// Речная
// Морская
// Речная/морская
const EnvironmentType = sequelize.define("environment_type", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  caption: { type: DataTypes.STRING },
});

const RadiostationReceiver = sequelize.define("radiostation_receiver", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  sensitivity: { type: DataTypes.STRING },
  receiver_power: { type: DataTypes.DOUBLE }, // В Вт
  frequency_range: { type: DataTypes.STRING },
  min_frequency_range: { type: DataTypes.DOUBLE },
  max_frequency_range: { type: DataTypes.DOUBLE },
  is_mesh_net_function: { type: DataTypes.BOOLEAN },
  communication_range: { type: DataTypes.DOUBLE }, // В км 
  temperature_range: { type: DataTypes.STRING }, // В цельсиях
  min_temperature_range: { type: DataTypes.INTEGER },
  max_temperature_range: { type: DataTypes.INTEGER },
  is_support_PPRCH: { type: DataTypes.BOOLEAN },
  PPRCH: { type: DataTypes.DOUBLE }, // В МГц
  SHPS: { type: DataTypes.STRING },
  transfer_speed: { type: DataTypes.STRING }, // В Мбит/с
  min_transfer_speed: { type: DataTypes.DOUBLE },
  max_transfer_speed: { type: DataTypes.DOUBLE },
  channel_general_count: { type: DataTypes.INTEGER },
  channel_spec_count: { type: DataTypes.INTEGER },
  noise_proof_modes: { type: DataTypes.STRING },
});

// Тип канала
// Поверхностно волновой
// Тропосферный
// Ионосферный
// Метеорный
// Космический
// Радиорелейный
const ChannelType = sequelize.define("channel_type", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  caption: { type: DataTypes.STRING },
})

const RadiostationProduction = sequelize.define("radiostation_production", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  production_capabilities: { type: DataTypes.STRING }, // В год
  increasing_production: { type: DataTypes.BOOLEAN },
  own_production_facilities: { type: DataTypes.BOOLEAN },
})

const RadiostationBattery = sequelize.define("radiostation_battery", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  battery_capacity: { type: DataTypes.INTEGER }, // В мАм
  battery_offline_work:{ type: DataTypes.INTEGER }, // В часах
  battery_time_transfer_mode:{ type: DataTypes.INTEGER }, // В часах
  battery_time_receiving_mode:{ type: DataTypes.INTEGER },// В часах
  power_supply:{ type: DataTypes.DOUBLE },
  reliability:{ type: DataTypes.INTEGER },// В часах
})

// Тип батареи
// Li-pol
// Li-ion
const BatterType = sequelize.define("batter_type", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  caption: { type: DataTypes.STRING },
})

const Media = sequelize.define("media", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  uri:{ type: DataTypes.STRING },
  media_type: { type: DataTypes.STRING },
})

Radiostation.hasMany(Media)
Media.belongsTo(Radiostation)

BrandType.hasMany(Radiostation)
Radiostation.belongsTo(BrandType)

Manufactor.hasOne(Radiostation)
Radiostation.belongsTo(Manufactor)

StationType.hasOne(Radiostation)
Radiostation.belongsTo(StationType)

RadiostationType.hasOne(Radiostation)
Radiostation.belongsTo(RadiostationType)

EnvironmentType.hasOne(Radiostation)
Radiostation.belongsTo(EnvironmentType)

RadiostationReceiver.hasOne(Radiostation)
Radiostation.belongsTo(RadiostationReceiver)

ChannelType.hasOne(RadiostationReceiver)
RadiostationReceiver.belongsTo(ChannelType)

RadiostationBattery.hasOne(Radiostation)
Radiostation.belongsTo(RadiostationBattery)

Radiostation.hasOne(RadiostationProduction)
RadiostationProduction.belongsTo(Radiostation)

BatterType.hasOne(RadiostationBattery)
RadiostationBattery.belongsTo(BatterType)

module.exports = {
  Radiostation,
  Manufactor,
  StationType,
  RadiostationType,
  BrandType,
  EnvironmentType,
  RadiostationReceiver,
  ChannelType,
  RadiostationProduction,
  RadiostationBattery,
  BatterType,
  Media
};
