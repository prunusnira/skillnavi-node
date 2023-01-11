export const queryTowerList = () =>
    `SELECT table_name FROM information_schema.tables WHERE table_name LIKE "tower%"`;

export const queryTowerInfo = (params: Array<string>) =>
    `SELECT * FROM towerManage where name="${params[0]}"`;

export const queryRemoveTowerFloor = (params: Array<string>) =>
    `DELETE FROM towerStatusFloor where uid=${params[0]}`;

export const queryRemoveTowerClear = (params: Array<string>) =>
    `DELETE FROM towerStatusClear where uid=${params[0]}`;

export const queryTowerData = (params: Array<string>) =>
    `SELECT
    t.floor,
    t.musicid,
    m.name as mname,
    t.ptcode,
    CASE
        WHEN t.ptcode = 1 THEN m.gbsc
        WHEN t.ptcode = 2 THEN m.gadv
        WHEN t.ptcode = 3 THEN m.gext
        WHEN t.ptcode = 4 THEN m.gmas
        WHEN t.ptcode = 5 THEN m.bbsc
        WHEN t.ptcode = 6 THEN m.badv
        WHEN t.ptcode = 7 THEN m.bext
        WHEN t.ptcode = 8 THEN m.bmas
        WHEN t.ptcode = 9 THEN m.dbsc
        WHEN t.ptcode = 10 THEN m.dadv
        WHEN t.ptcode = 11 THEN m.dext
        WHEN t.ptcode = 12 THEN m.dmas
    END AS level,
    t.rate,
    t.fc,
    t.description
FROM
    ${params[0]} as t, music as m
WHERE
    t.musicid = m.id`;
