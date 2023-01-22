export const queryNoticeList = (params: Array<string>) =>
    `select * from notice order by id desc limit 10 offset ${params[0]}`;

export const queryTopNotice = () =>
    `select * from notice order by id desc limit 3`;
