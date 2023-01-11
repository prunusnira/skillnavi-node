import DBConnector from "../data/database/dbConnector";
import QueryType from "../data/database/queryType";
import Filter from "../tool/Filter";

const db = new DBConnector();

// 패턴 개수 가져오는 함수
export const getTotalPatternCount = async (gtype: string) => {
    const count: Array<number> = [];
    for (let i = 0; i < 17; i++) {
        const key = i * 50 + 100;
        const query =
            gtype === "gf"
                ? db.queryGen(QueryType.TotalPatternCountGF, [key.toString()])
                : db.queryGen(QueryType.TotalPatternCountDM, [key.toString()]);
        const data = await db.runQuery(query);
        count.push(data);
    }
    return count;
};

// Non-played pattern
export const getNonPlayed = (
    gtype: string,
    id: string,
    vertype: string,
    lv: Array<number>,
    version: Array<number>,
    hot: string,
    order: string
) => {
    const query = db.queryGen(QueryType.NonPlay, [
        gtype,
        id,
        vertype,
        JSON.stringify(lv),
        JSON.stringify(version),
        hot,
        order,
    ]);
    return db.runQuery(query);
};

export const getMusicInfo = (mid: string) => {
    const query = db.queryGen(QueryType.MusicInfo, [mid]);
    return db.runQuery(query);
};

export const getMusicList = (ver: string, type: string, order: string) => {
    const query = db.queryGen(QueryType.MusicList, [ver, type, order]);
    return db.runQuery(query);
};
