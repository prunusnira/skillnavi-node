import express, { Request } from "express";
import { ClearTableType } from "../data/type/clearTableType";
import { NonPlayType } from "../data/type/nonPlayType";
import { UserType } from "../data/type/userType";
import { getNonPlayed, getTotalPatternCount } from "../service/musicService";
import {
    getMybestMusic,
    getMybestPattern,
    getPatternCount,
} from "../service/skillService";
import {
    getSkillRecord,
    getUserById,
    getUserByToken,
    updateComment,
    updateDataOpen,
} from "../service/userService";
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
    level?: number;
    hot?: string;
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
    });

    // set comment
    router.post("/setcomment", async (req, res) => {
        const {
            body: { comment, id },
        } = req;

        await updateComment(comment, id);
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
            if (level) filteredLv = Filter.filterLevel(level);
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
        }
    );

    return router;
};

export default ProfileController;
