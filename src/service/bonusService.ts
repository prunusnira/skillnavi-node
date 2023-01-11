import DBConnector from "../data/database/dbConnector";
import QueryType from "../data/database/queryType";

const db = new DBConnector();

export const getLevelDiff = (type: string) => {
    const query =
        type === "gf"
            ? db.queryGen(QueryType.LvDiffGF, [])
            : db.queryGen(QueryType.LvDiffDM, []);
    return db.runQuery(query);
};
