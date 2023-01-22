import DBConnector from "../data/database/dbConnector";
import QueryType from "../data/database/queryType";

const db = new DBConnector();

export const getTopNotice = () => {
    const query = db.queryGen(QueryType.TopNotice, []);
    return db.runQuery(query);
};

export const getNotice = (start: number) => {
    const query = db.queryGen(QueryType.NoticeList, [start.toString()]);
    return db.runQuery(query);
};
