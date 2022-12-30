import express from 'express'
import config from '../server-config.json'
import SkillController from './controller/skillController'
import RecentController from './controller/recentController'
import PatternController from './controller/patternController'

const app = express()

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use('/recent', RecentController())
app.use('/skill', SkillController())
app.use('/pattern', PatternController())

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