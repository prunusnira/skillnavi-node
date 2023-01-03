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
