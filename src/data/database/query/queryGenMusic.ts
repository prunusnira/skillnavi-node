export const queryTotalPatternCountGF = (
    params: Array<string>
) => `SELECT A.gb+B.ga+C.ge+D.gm+E.bb+F.ba+G.be+H.bm FROM
(
    SELECT count(*) as gb FROM music
    WHERE <![CDATA[ gbsc >= ${params[0]} AND gbsc < ${params[0]}+50 ]]>
) as A,
(
    SELECT count(*) as ga FROM music
    WHERE <![CDATA[ gadv >= ${params[0]} AND gadv < ${params[0]}+50 ]]>
) as B,
(
    SELECT count(*) as ge FROM music
    WHERE <![CDATA[ gext >= ${params[0]} AND gext < ${params[0]}+50 ]]>
) as C,
(
    SELECT count(*) as gm FROM music
    WHERE <![CDATA[ gmas >= ${params[0]} AND gmas < ${params[0]}+50 ]]>
) as D,
(
    SELECT count(*) as bb FROM music
    WHERE <![CDATA[ bbsc >= ${params[0]} AND bbsc < ${params[0]}+59 ]]>
) as E,
(
    SELECT count(*) as ba FROM music
    WHERE <![CDATA[ badv >= ${params[0]} AND badv < ${params[0]}+50 ]]>
) as F,
(
    SELECT count(*) as be FROM music
    WHERE <![CDATA[ bext >= ${params[0]} AND bext < ${params[0]}+50 ]]>
) as G,
(
    SELECT count(*) as bm FROM music
    WHERE <![CDATA[ bmas >= ${params[0]} AND bmas < ${params[0]}+50 ]]>
) as H`;

export const queryTotalPatternCountDM = (
    params: Array<string>
) => `SELECT A.db+B.da+C.de+D.dm FROM
(
    SELECT count(*) as db FROM music
    WHERE <![CDATA[ dbsc >= ${params[0]} AND dbsc < ${params[0]}+50 ]]>
) as A,
(
    SELECT count(*) as da FROM music
    WHERE <![CDATA[ dadv >= ${params[0]} AND dadv < ${params[0]}+50 ]]>
) as B,
(
    SELECT count(*) as de FROM music
    WHERE <![CDATA[ dext >= ${params[0]} AND dext < ${params[0]}+50 ]]>
) as C,
(
    SELECT count(*) as dm FROM music
    WHERE <![CDATA[ dmas >= ${params[0]} AND dmas < ${params[0]}+50 ]]>
) as D`;

export const queryNonPlay = (params: Array<string>) => {
    const lv = JSON.parse(params[3]) as Array<number>;
    const version = JSON.parse(params[4]) as Array<number>;
    return `select * from
			(select id, name, hurigana, 1 as ptcode, gbsc as lv, version, hot from music where gbsc > 0 and removed=0 union
			select id, name, hurigana, 2 as ptcode, gadv as lv, version, hot from music where gadv > 0 and removed=0 union
			select id, name, hurigana, 3 as ptcode, gext as lv, version, hot from music where gext > 0 and removed=0 union
			select id, name, hurigana, 4 as ptcode, gmas as lv, version, hot from music where gmas > 0 and removed=0 union
			select id, name, hurigana, 5 as ptcode, bbsc as lv, version, hot from music where bbsc > 0 and removed=0 union
			select id, name, hurigana, 6 as ptcode, badv as lv, version, hot from music where badv > 0 and removed=0 union
			select id, name, hurigana, 7 as ptcode, bext as lv, version, hot from music where bext > 0 and removed=0 union
			select id, name, hurigana, 8 as ptcode, bmas as lv, version, hot from music where bmas > 0 and removed=0 union
			select id, name, hurigana, 9 as ptcode, dbsc as lv, version, hot from music where dbsc > 0 and removed=0 union
			select id, name, hurigana, 10 as ptcode, dadv as lv, version, hot from music where dadv > 0 and removed=0 union
			select id, name, hurigana, 11 as ptcode, dext as lv, version, hot from music where dext > 0 and removed=0 union
			select id, name, hurigana, 12 as ptcode, dmas as lv, version, hot from music where dmas > 0 and removed=0
		) as a
		
		where
            ${params[0] === "gf" && "ptcode <= 8"}
            ${params[0] === "dm" && "ptcode >= 9"}
            ${version.length > 0 && genNonPlayVersion(version)}
            ${params[6] === "h" && `AND hot="Y"`}
            ${params[6] === "o" && `AND hot="N"`}
            ${lv.length > 0 && genNonPlayLv(lv)}
			and
				(id, ptcode)
			not in
			(
				select musicid as id, patterncode as ptcode
				from skill
				where
					userid=${params[1]}
                    ${
                        params[2] === "0"
                            ? `and (rank != "none" or meter != "")`
                            : `and rate > 0`
                    }
					and
                    ${
                        params[0] === "gf"
                            ? "patterncode <= 8"
                            : "patterncode >= 9"
                    }
			)
		ORDER BY
            ${params[6] === "titleasc" && "hurigana ASC"}
            ${params[6] === "titledesc" && "hurigana DESC"}
            ${params[6] === "verasc" && "version ASC"}
            ${params[6] === "verdesc" && "version DESC"}
            ${params[6] === "lvasc" && "lv ASC"}
            ${params[6] === "lvdesc" && "lv DESC"}`;
};

const genNonPlayVersion = (version: Array<number>) => {
    let query = "AND (";
    version.forEach((x, i) => {
        query += `version=${x}`;
        if (i < version.length) query += " OR ";
    });
    query += ")";
    return query;
};

const genNonPlayLv = (lv: Array<number>) => {
    let query = "AND (";
    lv.forEach((x, i) => {
        query += `(lv >= ${x} AND lv < ${x}+50)`;
        if (i < lv.length) query += " OR ";
    });
    query += ")";
    return query;
};
