import DBConnector from "../data/database/dbConnector"
import QueryType from "../data/database/queryType"

const db = new DBConnector()

export const getSkillRanking = (gtype: string, page: string) => {
    // 페이지로 나누어진 스킬랭킹 데이터 가져오기
    const query = db.queryGen(QueryType.SkillRanking, [gtype, page])
    return db.runQuery(query)
}