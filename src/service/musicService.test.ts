import * as musicService from './musicService'

jest.mock('./musicService', () => ({
    esModule: true,
    getMusicList: (
        verarr: Array<number>,
        order: string,
        page: number,
        hot: string,
    ) => ([{

    }])
}))

describe('MusicService', () => {
    it('음악 목록', () => () => {
        const musiclist = musicService.getMusicList()
        expect(musiclist).toHaveLength(1)
    })
})