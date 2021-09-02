import express from 'express'
import * as patternService from '../service/patternService'
import * as userService from '../service/userService'

const PatternController = () => {
    const router = express.Router()

    // Skill Ranking
    router.get('/rank/:gtype/:page', async (req, res) => {
        const gtype = req.params.gtype
        const page = req.params.page
        const ranking = await patternService.getSkillRanking(gtype, page)
        const usercnt = await userService.getUserCount()
        const checkPage = usercnt % 30 === 0
        res.setHeader('Content-Type', 'application/json')
        res.send({
            "allUserList": ranking,
            "gtype": gtype,
            "page": page,
            "pages": checkPage ? usercnt / 30 : usercnt / 30 + 1
        })
    })

    return router
}

export default PatternController