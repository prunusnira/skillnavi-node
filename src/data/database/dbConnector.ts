import mariadb from 'mariadb'
import { SecretData } from '../secret/SecretData'
import QueryType from './queryType'

class DBConnector {
    dbpool = mariadb.createPool({
        host: SecretData.dbAccessData.url,
        port: SecretData.dbAccessData.port,
        user: SecretData.dbAccessData.accessId,
        password: SecretData.dbAccessData.accessHid,
        connectionLimit: 5,
    })

    runQuery = async (
        queryType: QueryType,
        parameters: [],
    ) => {
        let dbconn, result
        try {
            dbconn = await this.dbpool.getConnection()
            dbconn.query(`USE ${SecretData.dbAccessData.dbname}`)
            
        }
        catch (error) {

        }
        finally {
            dbconn?.end()
        }
    }
}

export default DBConnector