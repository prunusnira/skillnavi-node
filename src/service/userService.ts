import DBConnector from "../data/database/dbConnector";
import QueryType from "../data/database/queryType";

const db = new DBConnector();

// Recent User List
export const getRecentUserList = () => {
    const query = db.queryGen(QueryType.Recent, []);
    return db.runQuery(query);
};

// 전체 유저 수 (page 계산용)
export const getUserCount = () => {
    const query = db.queryGen(QueryType.UserCount, []);
    return db.runQuery(query);
};

// 토큰에서 사용자 정보 가져오기
export const getUserByToken = (token: string) => {
    const query = db.queryGen(QueryType.UserByToken, [token]);
    return db.runQuery(query);
};
