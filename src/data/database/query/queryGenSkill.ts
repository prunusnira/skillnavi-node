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

export const querySkillData = (params: Array<string>) =>
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

export const queryPlayCount = (params: Array<string>) =>
    `SELECT SUM(playtime) as cnt
    FROM skill
    WHERE userid=${params[0]}
    AND
        ${params[1] === "gf" ? "patterncode <= 8" : "patterncode >= 9"}`;
