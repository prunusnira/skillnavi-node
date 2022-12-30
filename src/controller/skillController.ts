import express from "express"
import * as userService from '../service/userService'
import * as skillService from '../service/skillService'

const SkillController = () => {
    const router = express.Router()

    // Skill Ranking
    router.get('/rank/:gtype/:page', async (req, res) => {
        const gtype = req.params.gtype
        const page = req.params.page
        const ranking = await skillService.getSkillRanking(gtype, page)
        const usercnt = await userService.getUserCount()
        const cnt = usercnt[0].count
        res.setHeader('Content-Type', 'application/json')
        res.send({
            "allUserList": ranking,
            "gtype": gtype,
            "page": page,
            "pages": Math.ceil(cnt / 30)
        })
    })

    return router
}

export default SkillController