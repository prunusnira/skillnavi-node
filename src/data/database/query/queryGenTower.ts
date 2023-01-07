export const queryTowerList = () =>
    `SELECT table_name FROM information_schema.tables WHERE table_name LIKE "tower%"`;

export const queryTowerInfo = (params: Array<string>) =>
    `SELECT * FROM towerManage where name="${params[0]}"`;

export const queryRemoveTowerFloor = (params: Array<string>) =>
    `DELETE FROM towerStatusFloor where uid=${params[0]}`;

export const queryRemoveTowerClear = (params: Array<string>) =>
    `DELETE FROM towerStatusClear where uid=${params[0]}`;
