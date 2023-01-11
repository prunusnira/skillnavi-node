import { INFOVER } from "../config/Const";
import skillService from "../data/database/dbConnector";
import QueryType from "../data/database/queryType";
import { MostPlayedPatternType } from "../data/type/mostPlayedType";
import { SkillTableType } from "../data/type/skillTableType";
import { SnapshotDataType } from "../data/type/snapshotDataType";
import { UserType } from "../data/type/userType";

const db = new skillService();

// 단일 항목 스킬 가져오기
export const getSkillOne = (id: string, mid: string, ptcode: string) => {
    const query = db.queryGen(QueryType.SkillDataOne, [id, mid, ptcode]);
    return db.runQuery(query);
};

// mid 전체에 대한 스킬 가져오기
export const getSkillMid = (id: string, mid: string) => {
    const query = db.queryGen(QueryType.SkillDataMid, [id, mid]);
    console.log(query);
    return db.runQuery(query);
};

// 전체 스킬 가져오기
export const getSkillAll = (
    id: number,
    gtype: string,
    page: number,
    levels: Array<number>,
    ranks: Array<string>,
    vers: Array<number>,
    hot: string,
    order: string
) => {
    const query = db.queryGen(QueryType.SkillDataAll, [
        id.toString(),
        gtype,
        page.toString(),
        JSON.stringify(levels),
        JSON.stringify(ranks),
        JSON.stringify(vers),
        hot,
        order,
    ]);
};

// 인스킬 데이터 가져오기
export const getSkillTarget = (
    version: string,
    id: string,
    type: string,
    gtype: string
) => {
    const query = db.queryGen(QueryType.SkillDataTarget, [
        version,
        id,
        type,
        gtype
    ])
    return db.runQuery(query)
}

// PType Table 데이터 가져오기
export const getSkillTablePType = (
    ptype: number,
    user: UserType,
    gtype: string,
    cpage: number,
    levels: Array<number>,
    ranks: Array<string>,
    vers: Array<number>,
    hotv: string,
    order: string
) => {
    const skillMap = new Map<Number, Array<SkillTableType>>();

    const all = new Array<SkillTableType>();
    const hot = new Array<SkillTableType>();
    const other = new Array<SkillTableType>();

    switch (ptype) {
        case 0:
            getSkillAll(
                user.id,
                gtype,
                cpage,
                levels,
                ranks,
                vers,
                hotv,
                order
            );
    }

    return skillMap;
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

export const getEXCData = (gtype: string, ishot: boolean) => {
    const query = db.queryGen(QueryType.EXCSkill, [gtype, ishot ? "Y" : "N"]);
    return db.runQuery(query);
};

const putSnapshotData = (data: SkillTableType) => {
    const snapshotData: SnapshotDataType = {
        mid: data.musicid,
        mname: data.mname,
        ptcode: data.patterncode,
        version: data.version,
        lv: data.level,
        rate: data.rate,
        skill: Math.floor((data.rate*data.level*20/10000)/100),
        rank: data.rank,
        fc: data.checkfc,
        meter: data.meter
    }
    return snapshotData
}

export const createSnapshot = async (id: string, gtype: string, name: string) => {
    const hot: Array<SkillTableType> = await getSkillTarget(INFOVER.CURRENT, id, "h", gtype)
	const oth: Array<SkillTableType> = await getSkillTarget(INFOVER.CURRENT, id, "o", gtype)
	
    const hotList = new Array<SnapshotDataType>()
    const otherList = new Array<SnapshotDataType>()

    hot.forEach(x => {
        hotList.push(putSnapshotData(x))
    })

    oth.forEach(x => {
        otherList.push(putSnapshotData(x))
    })
		for(i in 0..hot.size-1) {
			val cur = hot[i]
			val newobj = JSONObject()
			newobj.put("mid", cur.musicid)
			newobj.put("mname", cur.mname)
			newobj.put("ptcode", cur.patterncode)
			newobj.put("version", cur.version)
			newobj.put("lv", cur.level)
			newobj.put("rate", cur.rate)
			newobj.put("skill", Math.floor((cur.rate*cur.level*20/10000).toDouble())/100)
			newobj.put("rank", cur.rank)
			newobj.put("fc", cur.checkfc)
			newobj.put("meter", cur.meter)
			jsonhot.add(newobj)
		}
		
		for(i in 0..oth.size-1) {
			val cur = oth[i]
			val newobj = JSONObject()
			newobj.put("mid", cur.musicid)
			newobj.put("mname", cur.mname)
			newobj.put("ptcode", cur.patterncode)
			newobj.put("version", cur.version)
			newobj.put("lv", cur.level)
			newobj.put("rate", cur.rate)
			newobj.put("skill", Math.floor((cur.rate*cur.level*20/10000).toDouble())/100)
			newobj.put("rank", cur.rank)
			newobj.put("fc", cur.checkfc)
			newobj.put("meter", cur.meter)
			jsonoth.add(newobj)
		}
		
		val date = Date()
		val df = SimpleDateFormat("yyyyMMdd")
		json.put("uid", uid)
		json.put("uname", uname)
		json.put("date", df.format(date))
		json.put("type", gtype)
		json.put("hot", jsonhot)
		json.put("oth", jsonoth)
		
		// 파일저장
		val path = File(SecretConst.snapshotRealpathServer+uid+"/")
		val file = File(SecretConst.snapshotRealpathServer+uid+"/"+df.format(date)+"_"+gtype+".json")
	//	val path = File(SecretConst.snapshotRealpathLocal+uid+"/")
	//	val file = File(SecretConst.snapshotRealpathLocal+uid+"/"+df.format(date)+"_"+gtype+".json")
		
		path.mkdirs()
		if(file.exists()) file.delete()
		file.createNewFile()
		try {
			val fw = FileWriter(file)
			val bw = BufferedWriter(fw)
			bw.write(json.toJSONString())
			bw.close()
			fw.close()
		} catch(e: FileNotFoundException) {
			e.printStackTrace()
		} catch(e: IOException) {
			e.printStackTrace()
		}
};
