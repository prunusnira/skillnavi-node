import express from 'express'
import * as userService from '../service/userService'

const RecentController = () => {
    const router = express.Router()

    router.get('/recent', (req, res) => {
        const recentUserList = userService.getRecentUserList()
        res.send(JSON.stringify(recentUserList))
    })

    return router
}

export default RecentController