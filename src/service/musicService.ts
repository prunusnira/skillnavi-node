import DBConnector from "../data/database/dbConnector"
import QueryType from "../data/database/queryType"
import Filter from "../tool/Filter"

const db = new DBConnector()

const MusicService = () => {
    const getMusicList = (
        vers: Array<number>,
        hot: string,
        order: string
    ) => {
        const query = db.queryMusicList(
            QueryType.PatternList, vers, hot, order
        )
    }
}

export default MusicService