import express from 'express'
import * as userService from '../service/userService'

const RecentController = () => {
    const router = express.Router()

    router.get('/', async (req, res) => {
        const recentUserList = await userService.getRecentUserList()
        res.setHeader('Content-Type', 'application/json')
        res.send(JSON.stringify({"recent": recentUserList}))
    })

    return router
}

export default RecentController