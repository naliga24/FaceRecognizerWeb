const bodyParser = require('body-parser')
const express = require('express')
const fileUpload = require('express-fileupload')

const service = require('./service')
const jsxPageLoad = require('./jsxPageLoad')

const PORT = process.env.PORT || 9000
const app = express()

app.use(fileUpload())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/scripts', express.static(`${__dirname}/../node_modules/alertifyjs/build/`))
app.use('/links', express.static(`${__dirname}/../node_modules/alertifyjs/build/css/`))
app.use('/links1', express.static(`${__dirname}/../node_modules/alertifyjs/build/css/themes/`))
app.use(express.static(`${__dirname}/../react-client/dist`))
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}!`)
})
jsxPageLoad(app)
service(app)
