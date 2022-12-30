import * as skillService from './skillService'

jest.mock('./patternService', () => ({
    esModule: true,
    getSkillRanking: (gtype: string, page: string) => ({
        "allUserList": [{
            id: 0,
            titletower: 'sweetfeeling',
            name: 'TESTUSER',
            gskill: 1234.56,
            dskill: 6543.21,
            opencount: 'Y',
            uptimelong: Date.now(),
        }]
    })
}))

describe('PatternService', () => {
    it('스킬 랭킹', async () => {
        const ranking = await skillService.getSkillRanking('dm', '1')
        expect(ranking.allUserList).toHaveLength(1)
    })
})