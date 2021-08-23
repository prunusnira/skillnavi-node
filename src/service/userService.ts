import DBConnector from "../data/database/dbConnector"
import QueryType from "../data/database/queryType"
import { Recent } from "../data/internal/recentUser"

const db = new DBConnector()

// Recent User List
export const getRecentUserList = (): Recent => {
    db.runQuery(QueryType.Recent, [])
    return {
        "recent": []
    }
}