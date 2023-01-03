import DBConnector from "../data/database/dbConnector";
import QueryType from "../data/database/queryType";
import { SecretData } from "../data/secret/SecretData";
import fs from "fs";
import { SkillRecordType } from "../data/type/skillRecordType";

const db = new DBConnector();

// Recent User List
export const getRecentUserList = () => {
    const query = db.queryGen(QueryType.Recent, []);
    return db.runQuery(query);
};

// 전체 유저 수 (page 계산용)
export const getUserCount = () => {
    const query = db.queryGen(QueryType.UserCount, []);
    return db.runQuery(query);
};

// 토큰에서 사용자 정보 가져오기
export const getUserByToken = (token: string) => {
    const query = db.queryGen(QueryType.UserByToken, [token]);
    return db.runQuery(query);
};

// 사용자 아이디에서 사용자 정보 가져오기
export const getUserById = (id: string) => {
    const query = db.queryGen(QueryType.UserById, [id]);
    return db.runQuery(query);
};

// 사용자 아이디에서 사용자 스킬레코드 정보 가져오기
export const getSkillRecord = (id: string) => {
    const dir = fs.existsSync(SecretData.userdataServer);
    if (!dir) fs.mkdirSync(SecretData.userdataServer);

    const filePath = `${SecretData.userdataServer}${id}.dat`;
    const file = fs.existsSync(filePath);
    let content = new Array<SkillRecordType>();

    if (file) {
        const internal = fs.readFileSync(filePath, "utf8");
        const existList = internal.split("\r\n");
        existList.forEach((x) => {
            const data = x.split("_");
            content.push({ date: data[0], gskill: data[1], dskill: data[2] });
        });
    }

    return content;
};

// 정보 공개 설정 변경
export const updateDataOpen = (open: string, id: string) => {
    const query = db.queryGen(QueryType.UpdateDataOpen, [
        open === "true" ? "Y" : "N",
        id,
    ]);
    return db.runQuery(query);
};

// 코멘트 변경
export const updateComment = (comment: string, id: string) => {
    const query = db.queryGen(QueryType.UpdateComment, [comment, id]);
    return db.runQuery(query);
};

// 사용자 스킬레코드 갱신하기
export const updateSkillRecord = (
    id: string,
    gskill: string,
    dskill: string
) => {
    const dir = fs.existsSync(SecretData.userdataServer);
    if (!dir) fs.mkdirSync(SecretData.userdataServer);

    const filePath = `${SecretData.userdataServer}${id}.dat`;
    const file = fs.existsSync(filePath);
    let content = new Array<SkillRecordType>();

    // 파일이 존재한다면 파일을 열고 파일 내의 내용을 리스트에 추가
    if (file) {
        const internal = fs.readFileSync(filePath, "utf8");
        const existList = internal.split("\r\n");
        existList.forEach((x) => {
            const data = x.split("_");
            content.push({ date: data[0], gskill: data[1], dskill: data[2] });
        });
    }

    // 새로운 데이터 추가
    if (content.length === 50) {
        content = content.filter((_, i) => i !== 0);
    }
    // content.push({});
};
