export const queryRecent = () =>
    `
    SELECT id, titletower, name, gskill, dskill, updatetime, opencount FROM profile
    WHERE NOT gskill = 0 OR NOT dskill = 0 OR NOT gskilltb = 0 OR NOT dskilltb = 0
        OR NOT gskilltbre = 0 OR NOT dskilltbre = 0 OR NOT gskillmx = 0 OR NOT dskillmx = 0
        OR NOT gskillex = 0 OR NOT dskillex = 0 OR NOT gskillnx = 0 OR NOT dskillnx = 0
    ORDER BY updatetime DESC LIMIT 10
`;

export const queryUserCount = () => "select count(*) as count from profile";

export const queryGetUserToken = (params: Array<string>) =>
    `SELECT * FROM profile WHERE token='${params[0]}'`;

export const queryGetUserId = (params: Array<string>) =>
    `SELECT * FROM profile WHERE id=${params[0]}`;

export const queryUpdateDataOpen = (params: Array<string>) =>
    `UPDATE profile SET
        opencount='${params[0]}'
        WHERE id=${params[1]}`;

export const queryUpdateComment = (params: Array<string>) =>
    `UPDATE profile SET
        comment='${params[0]}'
    	WHERE id=${params[1]}`;

export const queryResetUser = (params: Array<string>) =>
    `UPDATE profile SET
        title="",
        name="",
        gskill=0,
        dskill=0,
        gskillhv=0,
        dskillhv=0,
        gskillnx=0,
        dskillnx=0,
        gskillex=0,
        dskillex=0,
        gskillmx=0,
        dskillmx=0,
        gskilltbre=0,
        dskilltbre=0,
        gskilltb=0,
        dskilltb=0,
        gskillall=0,
        dskillall=0,
        gclearlv = 0,
        dclearlv = 0,
        gclearnum = 0,
        dclearnum = 0,
        gfclv = 0,
        dfclv = 0,
        gfcnum = 0,
        dfcnum = 0,
        gexclv = 0,
        dexclv = 0,
        gexcnum = 0,
        dexcnum = 0,
        comment="",
        opencount="N",
        countall=0,
        countgf=0,
        countdm=0
        WHERE id=${params[0]}`;

export const queryUpdatePlayCount = (params: Array<string>) =>
    `UPDATE profile SET
        ${
            params[1] === "gf"
                ? `countgf = ` + params[2]
                : params[1] === "dm"
                ? `countdm = ` + params[2]
                : `countall = ` + params[2]
        }
    WHERE id=${params[0]}`;
