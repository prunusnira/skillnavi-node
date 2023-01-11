import DBConnector from "../data/database/dbConnector";
import QueryType from "../data/database/queryType";
import { SkillType } from "../data/type/skillType";
import { TowerType } from "../data/type/towerType";

const db = new DBConnector();

export const getTowerList = () => {
    const query = db.queryGen(QueryType.TowerList, []);
    return db.runQuery(query);
};

export const getTowerInfo = (name: string) => {
    const query = db.queryGen(QueryType.TowerInfo, [name]);
    return db.runQuery(query);
};

export const getTowerData = (name: string) => {
    const query = db.queryGen(QueryType.TowerData, [name]);
    return db.runQuery(query);
};

export const towerCheck = (s: string) => {
    if (
        s == "towerSample" ||
        s == "towerManage" ||
        s == "towerTest" ||
        s == "towerStatusClear" ||
        s == "towerStatusFloor"
    )
        return false;
    else return true;
};

export const clearCheck = (d: TowerType, skill: SkillType) => {
    let clear = true;
    if (skill) {
        if (
            d.rate > 0 &&
            d.rate > skill.rate &&
            d.rate > skill.ratetb &&
            d.rate > skill.ratetbre &&
            d.rate > skill.ratemx &&
            d.rate > skill.rateex &&
            d.rate > skill.ratenx
        ) {
            clear = false;
        }
        if (d.fc == true) {
            if (skill.checkfc == "N") {
                clear = false;
            }
        }
    } else clear = false;
    return clear;
};
