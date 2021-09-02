import { Recent } from "../data/internal/recentUser"
import * as userService from "../service/userService"

jest.mock('../service/userService', () => ({
    ...jest.requireActual('../service/userService'),
    getRecentUserList: (): Recent => ({
        "recent": [{
            "id": 1,
            "titletower": "",
            "name": "TESTUSER",
            "gskill": 0.0,
            "dskill": 0.0,
            "updatetime": 1629689929000,
            "uptimelong": 1629689929000,
            "opencount": "Y"
        }]
    })
}))

describe('UserService', () => {
    it('최근 유저 목록 받아오기', async () => {
        const list = await userService.getRecentUserList()
        expect(list.recent[0].name).toEqual('TESTUSER')
    })
})