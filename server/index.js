import express from 'express'
import path from 'path'
import sequelize from './db.js'
import { getDirName } from './helpers/dirnameHelper.js'
import * as model from './models/models.js'
import fileUpload from 'express-fileupload'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import router from './routes/index.js'
import errorHandler from './middleware/ErrorHandlingMiddleware.js'

const PORT = process.env.PORT || 5050
const app = express()
const dirname = getDirName(import.meta.url)

app.use(cors({
	credentials: true,
	origin: process.env.CLIENT_URL
}))
app.use(express.json())
app.use(cookieParser())
app.use(express.static(path.resolve(dirname, 'static')))
app.use(fileUpload({}))
app.use('/api', router)

//error processing, last Middleware
app.use(errorHandler)

const start = async () => {
	try {
		await sequelize.authenticate()
		await sequelize.sync()
		app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
	} catch (e) {
		console.log(e)
	}
}

start()
