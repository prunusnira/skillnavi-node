export const getPatternCount = (params: Array<string>) =>
    `SELECT count(*) FROM
(
    SELECT
        s.userid,
        s.rank,
        CASE
            WHEN s.patterncode = 1 THEN m.gbsc
            WHEN s.patterncode = 2 THEN m.gadv
            WHEN s.patterncode = 3 THEN m.gext
            WHEN s.patterncode = 4 THEN m.gmas
            WHEN s.patterncode = 5 THEN m.bbsc
            WHEN s.patterncode = 6 THEN m.badv
            WHEN s.patterncode = 7 THEN m.bext
            WHEN s.patterncode = 8 THEN m.bmas
            WHEN s.patterncode = 9 THEN m.dbsc
            WHEN s.patterncode = 10 THEN m.dadv
            WHEN s.patterncode = 11 THEN m.dext
            WHEN s.patterncode = 12 THEN m.dmas
        END AS level
    FROM skill AS s
    INNER JOIN (
        SELECT * FROM music
    ) AS m
    WHERE
        s.musicid = m.id AND
        s.userid = ${params[0]} AND
        s.rank = ${params[1]} AND
        ${params[3] === "gf" && "s.patterncode <= 8"}
        ${params[3] === "dm" && "s.patterncode >= 9"}
) AS r

WHERE
    r.level >= ${params[2]} AND r.level < ${params[2]}+50`;

export const queryResetSkill = (params: Array<string>) =>
    `DELETE FROM skill WHERE userid=${params[0]}`;

export const querySkillDataOne = (params: Array<string>) =>
    `SELECT
        userid,
        musicid,
        version,
        patterncode,
        playtime,
        cleartime,
        rank,
        rate,
        ratehv,
        ratenx,
        rateex,
        ratemx,
        ratetbre,
        ratetb,
        score,
        combo,
        checkfc,
        meter
    FROM skill
    WHERE musicid = ${params[1]} AND userid = ${params[0]} AND patterncode = ${params[2]}`;

export const querySkillDataMid = (params: Array<string>) =>
    `SELECT
        s.userid as userid,
        m.id as musicid,
        m.version as version,
        s.patterncode as patterncode,
        s.playtime as playtime,
        s.cleartime as cleartime,
        s.rank as rank,
        s.rate as rate,
        s.ratehv as ratehv,
        s.ratenx as ratenx,
        s.rateex as rateex,
        s.ratemx as ratemx,
        s.ratetbre as ratetbre,
        s.ratetb as ratetb,
        s.score as score,
        s.combo as combo,
        s.checkfc as checkfc,
        s.meter as meter,
        CASE
            WHEN s.patterncode = 1 THEN m.gbsc
            WHEN s.patterncode = 2 THEN m.gadv
            WHEN s.patterncode = 3 THEN m.gext
            WHEN s.patterncode = 4 THEN m.gmas
            WHEN s.patterncode = 5 THEN m.bbsc
            WHEN s.patterncode = 6 THEN m.badv
            WHEN s.patterncode = 7 THEN m.bext
            WHEN s.patterncode = 8 THEN m.bmas
            WHEN s.patterncode = 9 THEN m.dbsc
            WHEN s.patterncode = 10 THEN m.dadv
            WHEN s.patterncode = 11 THEN m.dext
            WHEN s.patterncode = 12 THEN m.dmas
        END AS level
    FROM skill as s, music as m
    WHERE s.musicid = m.id AND s.musicid = ${params[0]} AND s.userid = ${params[1]}`;

export const querySkillDataTarget = (params: Array<string>) =>
    `SELECT
    sa.musicid,
    sa.mname,
    sa.hurigana,
    sa.ishot,
    sa.patterncode,
    sa.rank,
    sa.rate,
    sa.ratehv,
    sa.ratenx,
    sa.rateex,
    sa.ratemx,
    sa.ratetbre,
    sa.ratetb,
    sa.version,
    sa.combo,
    sa.playtime,
    sa.level,
    sa.checkfc,
    sa.meter
    FROM
    (SELECT
        *,
        ${params[0] === "0" ? "a.level*a.rate*20 AS skill" : ""}
        ${params[0] === "1" ? "a.level*a.ratetb*20 AS skill" : ""}
        ${params[0] === "2" ? "a.level*a.ratetbre*20 AS skill" : ""}
        ${params[0] === "3" ? "a.level*a.ratemx*20 AS skill" : ""}
        ${params[0] === "4" ? "a.level*a.rateex*20 AS skill" : ""}
        ${params[0] === "5" ? "a.level*a.ratenx*20 AS skill" : ""}
        ${params[0] === "6" ? "a.level*a.ratehv*20 AS skill" : ""}

        FROM
        (SELECT
            m.name as mname,
            m.hurigana as hurigana,
            m.id as musicid,
            m.hot as ishot,
            s.patterncode as patterncode,
            s.rank as rank,
            s.rate as rate,
            s.ratehv as ratehv,
            s.ratenx as ratenx,
            s.rateex as rateex,
            s.ratemx as ratemx,
            s.ratetbre as ratetbre,
            s.ratetb as ratetb,
            m.version as version,
            s.playtime as playtime,
            s.cleartime as cleartime,
            s.combo as combo,
            CASE
                WHEN s.patterncode = 1 THEN m.gbsc
                WHEN s.patterncode = 2 THEN m.gadv
                WHEN s.patterncode = 3 THEN m.gext
                WHEN s.patterncode = 4 THEN m.gmas
                WHEN s.patterncode = 5 THEN m.bbsc
                WHEN s.patterncode = 6 THEN m.badv
                WHEN s.patterncode = 7 THEN m.bext
                WHEN s.patterncode = 8 THEN m.bmas
                WHEN s.patterncode = 9 THEN m.dbsc
                WHEN s.patterncode = 10 THEN m.dadv
                WHEN s.patterncode = 11 THEN m.dext
                WHEN s.patterncode = 12 THEN m.dmas
            END AS level,
            s.checkfc as checkfc,
            s.meter as meter
        FROM
            skill as s,
            ${params[0] === "0" ? "music as m" : ""}
            ${params[0] === "1" ? "music_tb as m" : ""}
            ${params[0] === "2" ? "music_tbre as m" : ""}
            ${params[0] === "3" ? "music_mx as m" : ""}
            ${params[0] === "4" ? "music_ex as m" : ""}
            ${params[0] === "5" ? "music_nx as m" : ""}
            ${params[0] === "6" ? "music_hv as m" : ""}
        WHERE
            s.musicid = m.id
            ${
                params[0] === "0"
                    ? "AND m.removed < 1"
                    : "AND (m.removed < 1 OR m.removed > " + params[0] + ")"
            }
            AND s.userid = ${params[1]}
            
            ${params[2] === "h" ? 'AND m.hot = "Y"' : ""}
            ${params[2] === "o" ? 'AND m.hot = "N"' : ""}
            
            ${params[3] === "gf" ? "AND s.patterncode <= 8" : ""}
            ${params[3] === "dm" ? "AND s.patterncode >= 9" : ""}
            
            ${params[0] === "0" ? "AND s.rate > 0" : ""}
            ${params[0] === "1" ? "AND s.ratetb > 0" : ""}
            ${params[0] === "2" ? "AND s.ratetbre > 0" : ""}
            ${params[0] === "3" ? "AND s.ratemx > 0" : ""}
            ${params[0] === "4" ? "AND s.rateex > 0" : ""}
            ${params[0] === "5" ? "AND s.ratenx > 0" : ""}
            ${params[0] === "6" ? "AND s.ratehv > 0" : ""}
        ) a
    ) sa
    INNER JOIN
    (SELECT
    a.musicid,
    ${params[0] === "0" ? "MAX(a.level*a.rate*20) AS skill" : ""}
    ${params[0] === "1" ? "MAX(a.level*a.ratetb*20) AS skill" : ""}
    ${params[0] === "2" ? "MAX(a.level*a.ratetbre*20) AS skill" : ""}
    ${params[0] === "3" ? "MAX(a.level*a.ratemx*20) AS skill" : ""}
    ${params[0] === "4" ? "MAX(a.level*a.rateex*20) AS skill" : ""}
    ${params[0] === "5" ? "MAX(a.level*a.ratenx*20) AS skill" : ""}
    ${params[0] === "6" ? "MAX(a.level*a.ratehv*20) AS skill" : ""}
    
    FROM
    (SELECT
        m.id as musicid,
        m.hot as ishot,
        s.patterncode as patterncode,
        s.rank as rank,
        s.rate as rate,
        s.ratehv as ratehv,
        s.ratenx as ratenx,
        s.rateex as rateex,
        s.ratemx as ratemx,
        s.ratetbre as ratetbre,
        s.ratetb as ratetb,
        m.version as version,
        s.playtime as playtime,
        s.cleartime as cleartime,
        s.combo as combo,
        CASE
            WHEN s.patterncode = 1 THEN m.gbsc
            WHEN s.patterncode = 2 THEN m.gadv
            WHEN s.patterncode = 3 THEN m.gext
            WHEN s.patterncode = 4 THEN m.gmas
            WHEN s.patterncode = 5 THEN m.bbsc
            WHEN s.patterncode = 6 THEN m.badv
            WHEN s.patterncode = 7 THEN m.bext
            WHEN s.patterncode = 8 THEN m.bmas
            WHEN s.patterncode = 9 THEN m.dbsc
            WHEN s.patterncode = 10 THEN m.dadv
            WHEN s.patterncode = 11 THEN m.dext
            WHEN s.patterncode = 12 THEN m.dmas
        END AS level,
        s.checkfc as checkfc,
        s.meter as meter
    FROM
        skill as s,
        ${params[0] === "0" ? "music as m" : ""}
        ${params[0] === "1" ? "music_tb as m" : ""}
        ${params[0] === "2" ? "music_tbre as m" : ""}
        ${params[0] === "3" ? "music_mx as m" : ""}
        ${params[0] === "4" ? "music_ex as m" : ""}
        ${params[0] === "5" ? "music_nx as m" : ""}
        ${params[0] === "6" ? "music_hv as m" : ""}
    WHERE
        s.musicid = m.id
        ${
            params[0] === "0"
                ? "AND m.removed < 1"
                : "AND (m.removed < 1 OR m.removed > " + params[0] + ")"
        }
        
        AND s.userid = ${params[1]}

        ${params[2] === "h" ? 'AND m.hot = "Y"' : ""}
        ${params[2] === "o" ? 'AND m.hot = "N"' : ""}
        
        ${params[3] === "gf" ? "AND s.patterncode <= 8" : ""}
        ${params[3] === "dm" ? "AND s.patterncode >= 9" : ""}
        
        ${params[0] === "0" ? "AND s.rate > 0" : ""}
        ${params[0] === "1" ? "AND s.ratetb > 0" : ""}
        ${params[0] === "2" ? "AND s.ratetbre > 0" : ""}
        ${params[0] === "3" ? "AND s.ratemx > 0" : ""}
        ${params[0] === "4" ? "AND s.rateex > 0" : ""}
        ${params[0] === "5" ? "AND s.ratenx > 0" : ""}
        ${params[0] === "6" ? "AND s.ratehv > 0" : ""}
        ) a
        GROUP BY musicid
    ) sb
    WHERE
    sa.skill = sb.skill AND
    sa.musicid = sb.musicid
    GROUP BY sa.musicid
    ORDER BY sa.skill DESC LIMIT 50`;

export const queryPlayCount = (params: Array<string>) =>
    `SELECT SUM(playtime) as cnt
    FROM skill
    WHERE userid=${params[0]}
    AND
        ${params[1] === "gf" ? "patterncode <= 8" : "patterncode >= 9"}`;

export const queryEXCSkill = (params: Array<string>) =>
    `SELECT
        c.id as musicid,
        c.name as mname,
        c.hurigana as hurigana,
        c.hot as ishot,
        c.patterncode as patterncode,
        c.version as version,
        b.level as level
    FROM (
        SELECT id, name, hurigana, hot, version, max(level) as level FROM (
            SELECT id, name, hurigana, hot, version, gbsc as level, 1 as patterncode FROM music WHERE gbsc > 0 AND removed < 1
            UNION SELECT id, name, hurigana, hot, version, gadv as level, 2 as patterncode FROM music WHERE gadv > 0 AND removed < 1
            UNION SELECT id, name, hurigana, hot, version, gext as level, 3 as patterncode FROM music WHERE gext > 0 AND removed < 1
            UNION SELECT id, name, hurigana, hot, version, gmas as level, 4 as patterncode FROM music WHERE gmas > 0 AND removed < 1
            UNION SELECT id, name, hurigana, hot, version, bbsc as level, 5 as patterncode FROM music WHERE bbsc > 0 AND removed < 1
            UNION SELECT id, name, hurigana, hot, version, badv as level, 6 as patterncode FROM music WHERE badv > 0 AND removed < 1
            UNION SELECT id, name, hurigana, hot, version, bext as level, 7 as patterncode FROM music WHERE bext > 0 AND removed < 1
            UNION SELECT id, name, hurigana, hot, version, bmas as level, 8 as patterncode FROM music WHERE bmas > 0 AND removed < 1
            UNION SELECT id, name, hurigana, hot, version, dbsc as level, 9 as patterncode FROM music WHERE dbsc > 0 AND removed < 1
            UNION SELECT id, name, hurigana, hot, version, dadv as level, 10 as patterncode FROM music WHERE dadv > 0 AND removed < 1
            UNION SELECT id, name, hurigana, hot, version, dext as level, 11 as patterncode FROM music WHERE dext > 0 AND removed < 1
            UNION SELECT id, name, hurigana, hot, version, dmas as level, 12 as patterncode FROM music WHERE dmas > 0 AND removed < 1
        ) a
        WHERE a.hot = "${params[1]}" AND
        ${params[0] === "gf" ? "a.patterncode <= 8" : "a.patterncode >= 9"}
        GROUP BY id ORDER BY level DESC LIMIT 25
    ) b
    INNER JOIN (
        SELECT id, name, hurigana, hot, version, gbsc as level, 1 as patterncode FROM music WHERE gbsc > 0 AND removed < 1
        UNION SELECT id, name, hurigana, hot, version, gadv as level, 2 as patterncode FROM music WHERE gadv > 0 AND removed < 1
        UNION SELECT id, name, hurigana, hot, version, gext as level, 3 as patterncode FROM music WHERE gext > 0 AND removed < 1
        UNION SELECT id, name, hurigana, hot, version, gmas as level, 4 as patterncode FROM music WHERE gmas > 0 AND removed < 1
        UNION SELECT id, name, hurigana, hot, version, bbsc as level, 5 as patterncode FROM music WHERE bbsc > 0 AND removed < 1
        UNION SELECT id, name, hurigana, hot, version, badv as level, 6 as patterncode FROM music WHERE badv > 0 AND removed < 1
        UNION SELECT id, name, hurigana, hot, version, bext as level, 7 as patterncode FROM music WHERE bext > 0 AND removed < 1
        UNION SELECT id, name, hurigana, hot, version, bmas as level, 8 as patterncode FROM music WHERE bmas > 0 AND removed < 1
        UNION SELECT id, name, hurigana, hot, version, dbsc as level, 9 as patterncode FROM music WHERE dbsc > 0 AND removed < 1
        UNION SELECT id, name, hurigana, hot, version, dadv as level, 10 as patterncode FROM music WHERE dadv > 0 AND removed < 1
        UNION SELECT id, name, hurigana, hot, version, dext as level, 11 as patterncode FROM music WHERE dext > 0 AND removed < 1
        UNION SELECT id, name, hurigana, hot, version, dmas as level, 12 as patterncode FROM music WHERE dmas > 0 AND removed < 1
    ) c ON b.id = c.id AND b.level = c.level AND
    ${params[0] === "gf" ? "c.patterncode <= 8" : "c.patterncode >= 9"}
    GROUP BY musicid ORDER BY level DESC`;

export const querySkillRankingForOnePattern = (params: Array<string>) =>
    `SELECT
    p.id as userid,
    p.name as name,

    ${params[2] === "30" ? "s.rate as rate," : ""}
    ${params[2] === "29" ? "s.ratehv as rate," : ""}
    ${params[2] === "28" ? "s.ratenx as rate," : ""}
    ${params[2] === "27" ? "s.rateex as rate," : ""}
    ${params[2] === "26" ? "s.ratemx as rate," : ""}
    ${params[2] === "25" ? "s.ratetbre as rate," : ""}
    ${params[2] === "24" ? "s.ratetb as rate," : ""}

    s.checkfc as checkfc,
    s.rank as rank
    FROM
    skill as s
    ${params[2] === "30" ? "USE INDEX(ptrank_fuzzup)" : ""}
    ${params[2] === "29" ? "USE INDEX(ptrank_hv)" : ""}
    ${params[2] === "28" ? "USE INDEX(ptrank_nextage)" : ""}
    ${params[2] === "27" ? "USE INDEX(ptrank_exchain)" : ""}
    ${params[2] === "26" ? "USE INDEX(ptrank_matixx)" : ""}
    ${params[2] === "25" ? "USE INDEX(ptrank_tbre)" : ""}
    ${params[2] === "24" ? "USE INDEX(ptrank_tb)" : ""}
    ,
    profile as p USE INDEX (id_name)
    WHERE s.musicid=${params[0]}
    AND s.patterncode=${params[1]}
    AND s.userid=p.id
    ${params[2] === "30" ? "AND s.rate > 0" : ""}
    ${params[2] === "29" ? "AND s.ratehv > 0" : ""}
    ${params[2] === "28" ? "AND s.ratenx > 0" : ""}
    ${params[2] === "27" ? "AND s.rateex > 0" : ""}
    ${params[2] === "26" ? "AND s.ratemx > 0" : ""}
    ${params[2] === "25" ? "AND s.ratetbre > 0" : ""}
    ${params[2] === "24" ? "AND s.ratetb > 0" : ""}
    ORDER BY
    ${params[2] === "30" ? "s.rate" : ""}
    ${params[2] === "29" ? "s.ratehv" : ""}
    ${params[2] === "28" ? "s.ratenx" : ""}
    ${params[2] === "27" ? "s.rateex" : ""}
    ${params[2] === "26" ? "s.ratemx" : ""}
    ${params[2] === "25" ? "s.ratetbre" : ""}
    ${params[2] === "24" ? "s.ratetb" : ""}
    DESC`;
