import mariadb from "mariadb";
import { SecretData } from "../secret/SecretData";
import {
    queryNonPlay,
    queryTotalPatternCountDM,
    queryTotalPatternCountGF,
} from "./query/queryGenMusic";
import {
    queryGetUserId,
    queryGetUserToken,
    queryRecent,
    queryUpdateComment,
    queryUpdateDataOpen,
    queryUserCount,
} from "./query/queryGenUser";
import { querySkillRanking } from "./query/querySkillRanking";
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
            // Profile
            case QueryType.UserByToken:
                return queryGetUserToken(params);
            case QueryType.UserById:
                return queryGetUserId(params);
            case QueryType.UpdateDataOpen:
                return queryUpdateDataOpen(params);
            case QueryType.UpdateComment:
                return queryUpdateComment(params);

            // Music
            case QueryType.TotalPatternCountGF:
                return queryTotalPatternCountGF(params);
            case QueryType.TotalPatternCountDM:
                return queryTotalPatternCountDM(params);
            case QueryType.NonPlay:
                return queryNonPlay(params);

            case QueryType.Recent:
                return queryRecent();
            case QueryType.UserCount:
                return queryUserCount();
            case QueryType.SkillRanking:
                return querySkillRanking(params);
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
