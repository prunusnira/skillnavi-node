import express, { Request } from "express";
import { ClearTableType } from "../data/type/clearTableType";
import { NonPlayType } from "../data/type/nonPlayType";
import { SkillType } from "../data/type/skillType";
import { TowerManageType } from "../data/type/towerManageType";
import { TowerType } from "../data/type/towerType";
import { UserType } from "../data/type/userType";
import { getNonPlayed, getTotalPatternCount } from "../service/musicService";
import {
    getMybestMusic,
    getMybestPattern,
    getPatternCount,
    getPlayCount,
    getSkill,
    resetSkill,
} from "../service/skillService";
import {
    clearCheck,
    getTowerData,
    getTowerInfo,
    getTowerList,
    resetTower,
    selectFloorStatus,
    selectTowerStatus,
    towerCheck,
    updateFloorStatus,
    updateTowerStatus,
} from "../service/towerService";
import {
    getSkillRecord,
    getUserById,
    getUserByToken,
    resetUser,
    updateComment,
    updateDataOpen,
    updatePlayCount,
} from "../service/userService";
import CommonTools from "../tool/CommonTools";
import Filter from "../tool/Filter";

type NonPlayParams = {
    gtype: string;
    id: string;
    vertype: string;
    page: number;
};

type NonPlayQuery = {
    version?: string;
    order?: string;
    level?: string;
    hot?: string;
};

type ResetBody = {
    id: string;
};

const ProfileController = () => {
    const router = express.Router();

    // 토큰 가져오기
    router.get("/gettoken", async (req, res) => {
        const session = req.session;
        let token = session.token;

        if (!token) token = "";
        res.setHeader("Content-Type", "application/json");
        res.send(`token: ${token}`);
    });

    // 토큰에서 사용자 가져오기
    router.get("/getuser/:token", async (req, res) => {
        const token = req.params.token;
        const result = await getUserByToken(token);
        const user = result as UserType;
        console.log(result);
        console.log(user);

        res.setHeader("Content-Type", "application/json");
        res.send(`mydata: ${JSON.stringify(user)}`);
    });

    // 사용자 아이디에서 사용자 가져오기
    router.get("/getuserid/:id", async (req, res) => {
        const id = req.params.id;
        const token = req.session.token;
        const user = await getUserById(id);

        let rtnData = `mydata: ${JSON.stringify(user)}`;
        if (token) rtnData = rtnData.concat(`, token: '${token}'`);

        res.setHeader("Content-Type", "application/json");
        res.send(rtnData);
    });

    router.get("/skillrecord/:id", (req, res) => {
        const id = req.params.id;
        const record = getSkillRecord(id);

        res.setHeader("Content-Type", "application/json");
        res.send(`record: ${JSON.stringify(record)}`);
    });

    router.get("/cleartable/:gtype/:id", async (req, res) => {
        const id = req.params.id;
        const gtype = req.params.gtype;
        const table: ClearTableType = {
            totalPatternCount: [],
            patternCount: new Map(),
        };

        if (gtype === "gf") {
            table.totalPatternCount = await getTotalPatternCount("gf");
            table.patternCount = await getPatternCount("gf", id);
        } else {
            table.totalPatternCount = await getTotalPatternCount("dm");
            table.patternCount = await getPatternCount("dm", id);
        }

        res.setHeader("Content-Type", "application/json");
        res.send(`ctable: ${JSON.stringify(table)}`);
    });

    // mybest
    router.get("/mybest/:id", async (req, res) => {
        const id = req.params.id;
        const mbp = getMybestPattern(id, 0);
        const mbpg = getMybestPattern(id, 1);
        const mbpd = getMybestPattern(id, 2);
        const mbm = getMybestMusic(id);

        res.setHeader("Content-Type", "application/json");
        res.send(`mybestp: ${JSON.stringify(mbp)},
        mybestpg: ${JSON.stringify(mbpg)},
        mybestpd: ${JSON.stringify(mbpd)},
        mybestm: ${JSON.stringify(mbm)}`);
    });

    // set open data
    router.post("/setopencnt", async (req, res) => {
        const {
            body: { open, id },
        } = req;

        await updateDataOpen(open, id);
        res.send(200);
    });

    // set comment
    router.post("/setcomment", async (req, res) => {
        const {
            body: { comment, id },
        } = req;

        await updateComment(comment, id);
        res.send(200);
    });

    // non-play patterns
    router.get(
        "/notplayed/:gtype/:id/:vertype/:page",
        async (req: Request<NonPlayParams, {}, {}, NonPlayQuery>, res) => {
            const { gtype, id, vertype, page } = req.params;
            const { version, order, level, hot } = req.query;

            let filteredLv: Array<number> = [];
            let filteredVer: Array<number> = [];
            let filteredHot: string = "";
            let filteredOrder: string = "lvdesc";
            if (level) filteredLv = Filter.filterLevel(parseInt(level));
            if (version) filteredVer = Filter.filterVersion(version);
            if (hot) filteredHot = Filter.filterHot(hot);
            if (order) filteredOrder = Filter.filterOrder(order);

            const data: Array<NonPlayType> = await getNonPlayed(
                gtype,
                id,
                vertype,
                filteredLv,
                filteredVer,
                filteredHot,
                filteredOrder
            );

            // 페이지에 맞게 30개만 긁어오기
            const sendList = CommonTools.getPagedList(data, page, 30);
            const pages = CommonTools.getListPages(data, 30);

            res.setHeader("Content-Type", "application/json");
            res.send(`music: ${sendList},
                    page: ${page},
                    pages: ${pages},
                    gtype: ${gtype},
                    order: ${filteredOrder},
                    lv: ${filteredLv},
                    hot: ${filteredHot},
                    ver: ${filteredVer},
                    userid: ${id}`);
        }
    );

    router.post("/resetdata", (req: Request<{}, {}, ResetBody, {}>, res) => {
        const {
            body: { id },
        } = req;
        resetUser(id);
        resetSkill(id);
        res.send(200);
    });

    router.post("/d/profile/towerupdate/:id", async (req, res) => {
        const id = req.params.id;
        resetTower(id);

        const towerList: Array<string> = await getTowerList();

        towerList.forEach(async (x) => {
            if (towerCheck(x)) {
                const info: TowerManageType = await getTowerInfo(x);
                const sizeAll = new Array<number>(info.levels).fill(0);
                const sizeCl = new Array<number>(info.levels).fill(0);
                const towerData: Array<TowerType> = await getTowerData(x);

                towerData.forEach(async (t, i) => {
                    const skill: SkillType = await getSkill(
                        id,
                        t.musicid,
                        t.ptcode
                    );
                    const clear = clearCheck(t, skill);
                    if (clear) {
                        updateFloorStatus(
                            id,
                            x,
                            t.floor,
                            t.musicid,
                            t.ptcode,
                            "Y"
                        );
                        sizeCl[t.floor]++;
                    } else {
                        updateFloorStatus(
                            id,
                            x,
                            t.floor,
                            t.musicid,
                            t.ptcode,
                            "N"
                        );
                    }
                    sizeAll[t.floor]++;
                });

                for (let i = 0; i < info.levels; i++) {
                    let all = sizeAll[i];
                    let clear = sizeCl[i];
                    if (clear >= all * 0.7) updateTowerStatus(id, x, i, "Y");
                    else updateTowerStatus(id, x, i, "N");
                }
            }
        });
        res.send(200);
    });

    router.get("/profile/towerstatus/tower/:id", async (req, res) => {
        const id = req.params.id;
        const info: Array<string> = await getTowerList();
        const filtered = info.filter((x, i) => {
            x !== "towerSample" &&
                x !== "towerManage" &&
                x !== "towerTest" &&
                x !== "towerStatusClear" &&
                x !== "towerStatusFloor";
        });

        const tower = selectTowerStatus(id);

        res.setHeader("Content-Type", "application/json");
        res.send(
            `list: ${JSON.stringify(info)}, tower: ${JSON.stringify(tower)}`
        );
    });

    router.get("/profile/towerstatus/floor/:id", async (req, res) => {
        const id = req.params.id;
        const floor = selectFloorStatus(id);

        res.setHeader("Content-Type", "application/json");
        res.send(`floor: ${JSON.stringify(floor)}`);
    });

    router.post("/profile/countupdate/:id", async (req, res) => {
        const id = req.params.id;
        const gfc: number = await getPlayCount(id, "gf");
        const dfc: number = await getPlayCount(id, "dm");
        updatePlayCount(id, "gf", gfc);
        updatePlayCount(id, "dm", dfc);
        updatePlayCount(id, "all", gfc + dfc);

        res.send(200);
    });

    return router;
};

export default ProfileController;
