import mariadb from 'mariadb'
import { SecretData } from '../secret/SecretData'
import { queryRecent } from './query/queryGenUser'
import QueryType from './queryType'

class DBConnector {
    dbpool = mariadb.createPool({
        host: SecretData.dbAccessData.url,
        port: SecretData.dbAccessData.port,
        user: SecretData.dbAccessData.accessId,
        password: SecretData.dbAccessData.accessHid,
        connectionLimit: 5,
    })

    queryGen = (queryType: QueryType, params: Array<string>) => {
        switch(queryType) {
            case QueryType.Recent:
                return queryRecent()
        }
    }

    runQuery = async (query: string) => {
        let dbconn, result
        try {
            dbconn = await this.dbpool.getConnection()
            dbconn.query(`USE ${SecretData.dbAccessData.dbname}`)
            result = await dbconn.query(query)
        }
        catch (error) {
            throw error
        }
        finally {
            dbconn?.end()
            return result
        }
    }
}

export default DBConnector