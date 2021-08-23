import express from 'express'
import config from '../server-config.json'

import RecentController from './controller/recentController'

const startServer = () => {
    const app = express()

    app.use('/recent', RecentController())

    app.listen(config.server.port, () => {
        console.log(
            `
            Skill Navigator Server - Convert to NodeJS
            --------------------------------------
            Listening at PORT ${config.server.port}
            `
        )
    })
}

startServer()