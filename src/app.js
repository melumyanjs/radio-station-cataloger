const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const errorHandler = require('./middelware/errorHandlingMiddelware')
const swaggerUi = require('swagger-ui-express')
const cookieParser = require('cookie-parser')
const options = require('./config/swagger')
const swaggerJsDoc = require('swagger-jsdoc')
const specs = swaggerJsDoc(options);
const path = require('path')
const routerAuth = require('./routes/auth')
const routerRadiostation = require('./routes/radiostation')
const routerTypes = require('./routes/types')
const routerFilter = require('./routes/filter')
const fileUpload = require('express-fileupload')
const app = new express()

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
app.use('/api/auth', routerAuth)
app.use('/api/radiostation', routerRadiostation)
app.use('/api/filter', routerFilter)
app.use('/api/type', routerTypes)

// Обработка ошибок, последний Middelware
app.use(errorHandler)

module.exports = app