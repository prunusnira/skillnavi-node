import express from 'express'
import config from '../server-config.json'
import PatternController from './controller/patternController'
import RecentController from './controller/recentController'

const app = express()

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use('/recent', RecentController())
app.use('/', PatternController())

app.listen(config.server.port, () => {
    console.log(
        `
        Skill Navigator Server - Convert to NodeJS
        --------------------------------------
        Listening at PORT ${config.server.port}
        `
    )
})

export default app