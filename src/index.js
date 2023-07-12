require('dotenv').config({path: './config/.env'})
const app = require('./app')
const sequelize = require('./config/db')

const PORT = process.env.PORT || 5000

const start = async () => {
    try { 
        await sequelize.authenticate()
        await sequelize.sync({alter: true})

        app.listen(PORT, () => console.log(`Server has been started on ${PORT} ...`))
    } catch(e){
        console.log(e)
    }
}

start()