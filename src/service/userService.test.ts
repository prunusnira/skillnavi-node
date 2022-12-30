import { Recent } from "../data/type/recentUserType"
import * as userService from "./userService"

jest.mock('../service/userService', () => ({
    esModule: true,
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
    }),
    getUserCount: () => 1
}))

describe('UserService', () => {
    it('최근 유저 목록 받아오기', async () => {
        const list = await userService.getRecentUserList()
        expect(list.recent[0].name).toEqual('TESTUSER')
    })

    it('전체 유저 수 받아오기', async () => {
        const number = await userService.getUserCount()
        expect(number).toEqual(1)
    })
})