import skillService from "../data/database/dbConnector";
import QueryType from "../data/database/queryType";
import { MostPlayedPatternType } from "../data/type/mostPlayedType";

const db = new skillService();

export const getSkill = (id: string, mid: number, ptcode: number) => {
    const query = db.queryGen(QueryType.SkillData, [
        id,
        mid.toString(),
        ptcode.toString(),
    ]);
    return db.runQuery(query);
};

export const getSkillRanking = (gtype: string, page: string) => {
    // 페이지로 나누어진 스킬랭킹 데이터 가져오기
    const query = db.queryGen(QueryType.SkillRanking, [gtype, page]);
    return db.runQuery(query);
};

export const getPatternCount = async (gtype: string, id: string) => {
    const table = new Map<string, Array<number>>();

    for (let i = 0; i < 7; i++) {
        let rank = "";
        switch (i) {
            case 0:
                rank = "EXC";
                break;
            case 1:
                rank = "SS";
                break;
            case 2:
                rank = "S";
                break;
            case 3:
                rank = "A";
                break;
            case 4:
                rank = "B";
                break;
            case 5:
                rank = "C";
                break;
            case 6:
                rank = "F";
                break;
        }

        const row = new Array<number>();
        for (let i = 0; i < 17; i++) {
            const key = i * 50 + 100;
            const query = db.queryGen(QueryType.PatternCount, [
                id,
                rank,
                key.toString(),
                gtype,
            ]);
            const data = await db.runQuery(query);
            table.set(rank, data);
        }
    }

    return table;
};

// mybest
export const getMybestPattern = (id: string, type: number) => {
    const list = new Array<MostPlayedPatternType>();
    let query = "";

    switch (type) {
        case 0:
            query = db.queryGen(QueryType.MybestPattern, [id]);
            break;
        case 1:
            query = db.queryGen(QueryType.MybestPattern, [id]);
            break;
        case 2:
            query = db.queryGen(QueryType.MybestPattern, [id]);
            break;
    }

    return db.runQuery(query);
};

// mybest music
export const getMybestMusic = (id: string) => {
    const query = db.queryGen(QueryType.MybestMusic, [id]);
    return db.runQuery(query);
};

export const resetSkill = (id: string) => {
    const query = db.queryGen(QueryType.ResetSkill, [id]);
    db.runQuery(query);
};

export const getPlayCount = (id: string, gtype: string) => {
    const query = db.queryGen(QueryType.PlayCount, [id, gtype]);
    return db.runQuery(query);
};
