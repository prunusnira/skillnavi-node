import mariadb from "mariadb";
import { SecretData } from "../secret/SecretData";
import { queryLvDiffDM, queryLvDiffGF } from "./query/queryGenBonus";
import {
    queryMusicInfo,
    queryMusicList,
    queryNonPlay,
    queryTotalPatternCountDM,
    queryTotalPatternCountGF,
} from "./query/queryGenMusic";
import {
    queryEXCSkill,
    queryPlayCount,
    queryResetSkill,
    querySkillDataMid,
    querySkillDataOne,
    querySkillDataTarget,
    querySkillRankingForOnePattern,
} from "./query/queryGenSkill";
import {
    queryTowerData,
    queryTowerInfo,
    queryTowerList,
} from "./query/queryGenTower";
import {
    queryGetUserId,
    queryGetUserToken,
    queryPlayCountAll,
    queryRecent,
    queryResetUser,
    queryUpdateComment,
    queryUpdateDataOpen,
    queryUpdatePlayCount,
    queryUserCount,
} from "./query/queryGenUser";
import { querySkillRanking } from "./query/queryGenSkillRanking";
import QueryType from "./queryType";

class DBConnector {
    dbpool = mariadb.createPool({
        host: SecretData.dbAccessData.url,
        port: SecretData.dbAccessData.port,
        user: SecretData.dbAccessData.accessId,
        password: SecretData.dbAccessData.accessHid,
        connectionLimit: 5,
    });

    queryGen = (queryType: QueryType, params: Array<string>): string => {
        switch (queryType) {
            // Bonus
            case QueryType.LvDiffGF:
                return queryLvDiffGF();
            case QueryType.LvDiffDM:
                return queryLvDiffDM();

            // User
            case QueryType.Recent:
                return queryRecent();
            case QueryType.UserCount:
                return queryUserCount();
            case QueryType.UserByToken:
                return queryGetUserToken(params);
            case QueryType.UserById:
                return queryGetUserId(params);
            case QueryType.UpdateDataOpen:
                return queryUpdateDataOpen(params);
            case QueryType.UpdateComment:
                return queryUpdateComment(params);
            case QueryType.ResetUser:
                return queryResetUser(params);
            case QueryType.UpdatePlayCount:
                return queryUpdatePlayCount(params);
            case QueryType.PlayCountAll:
                return queryPlayCountAll();

            // Music
            case QueryType.TotalPatternCountGF:
                return queryTotalPatternCountGF(params);
            case QueryType.TotalPatternCountDM:
                return queryTotalPatternCountDM(params);
            case QueryType.NonPlay:
                return queryNonPlay(params);
            case QueryType.MusicInfo:
                return queryMusicInfo(params);
            case QueryType.MusicList:
                return queryMusicList(params);

            // Skill
            case QueryType.SkillRanking:
                return querySkillRanking(params);
            case QueryType.ResetSkill:
                return queryResetSkill(params);
            case QueryType.SkillDataOne:
                return querySkillDataOne(params);
            case QueryType.SkillDataMid:
                return querySkillDataMid(params);
            case QueryType.SkillDataTarget:
                return querySkillDataTarget(params);
            case QueryType.PlayCount:
                return queryPlayCount(params);
            case QueryType.EXCSkill:
                return queryEXCSkill(params);
            case QueryType.SkillRankingForOnePattern:
                return querySkillRankingForOnePattern(params);

            // Tower
            case QueryType.TowerList:
                return queryTowerList();
            case QueryType.TowerInfo:
                return queryTowerInfo(params);
            case QueryType.TowerData:
                return queryTowerData(params);

            default:
                return "";
        }
    };

    queryMusicList = (
        queryType: QueryType,
        verlist: Array<number>,
        hot: string,
        order: string
    ) => {};

    runQuery = async (query: string) => {
        let dbconn, result;
        try {
            dbconn = await this.dbpool.getConnection();
            dbconn.query(`USE ${SecretData.dbAccessData.dbname}`);
            result = await dbconn.query(query);
        } catch (error) {
            throw error;
        } finally {
            dbconn?.end();
            return result;
        }
    };
}

export default DBConnector;
