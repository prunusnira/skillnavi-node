import express, { Request } from "express";
import { getUserById, getUserCount } from "../service/userService";
import {
    createSnapshot,
    getEXCData,
    getSkillMid,
    getSkillRanking,
    getSkillTablePType,
    listSnapshot,
    loadSnapshot,
} from "../service/skillService";
import Filter from "../tool/Filter";
import { UserType } from "../data/type/userType";
import { SkillTableType } from "../data/type/skillTableType";
import CommonTools from "../tool/CommonTools";
import { getMusicInfo } from "../service/musicService";

type SkillParam = {
    ptype: string;
    id: string;
    gtype: string;
    page: string;
    order: string;
};

type SkillQuery = {
    level?: string;
    rank?: string;
    ver?: string;
    hot?: string;
};

const SkillController = () => {
    const router = express.Router();

    // Skill Page - 미완성임 service쪽
    router.get(
        "/skill/:ptype/:id/:gtype/:page/:order",
        async (req: Request<SkillParam, {}, {}, SkillQuery>, res) => {
            const { ptype, id, gtype, page, order } = req.params;
            const { level, rank, ver, hot } = req.query;

            const session = req.session;
            let cpage = parseInt(page);

            if (cpage === 0) cpage = 1;

            const user: UserType = await getUserById(id);
            const token = session.token;

            let filteredLv: Array<number> = [];
            let filteredRank: Array<string> = [];
            let filteredVer: Array<number> = [];
            let filteredHot: string = "";
            if (level) filteredLv = Filter.filterLevel(parseInt(level));
            if (ver) filteredVer = Filter.filterVersion(ver);
            if (hot) filteredHot = Filter.filterHot(hot);
            if (rank) filteredRank = Filter.filterRank(parseInt(rank));

            const skillMap: Map<
                Number,
                Array<SkillTableType>
            > = getSkillTablePType(
                parseInt(ptype),
                user,
                gtype,
                cpage,
                filteredLv,
                filteredRank,
                filteredVer,
                filteredHot,
                order
            );

            let pages = 0;
            let sendList = new Array<SkillTableType>();
            let hsend = new Array<SkillTableType>();
            let osend = new Array<SkillTableType>();

            if (
                (ptype == "0" ||
                    ptype == "3" ||
                    ptype == "5" ||
                    ptype == "7" ||
                    ptype == "9" ||
                    ptype == "11" ||
                    ptype == "13") &&
                skillMap.get(0)!.length > 0
            ) {
                sendList = CommonTools.getPagedList(
                    skillMap.get(0)!!,
                    parseInt(page),
                    30
                );
                pages = CommonTools.getListPages(skillMap.get(0)!!, 30);
            } else if (ptype == "1") {
                if (order == "y") {
                    sendList = CommonTools.getPagedList(
                        skillMap.get(0)!!,
                        1,
                        25
                    );
                } else if (order == "n") {
                    sendList = CommonTools.getPagedList(
                        skillMap.get(0)!!,
                        2,
                        25
                    );
                }
            } else if (
                ptype == "2" ||
                ptype == "4" ||
                ptype == "6" ||
                ptype == "8" ||
                ptype == "10" ||
                ptype == "12" ||
                ptype == "14"
            ) {
                hsend = CommonTools.getPagedList(skillMap.get(1)!!, 1, 25);
                osend = CommonTools.getPagedList(skillMap.get(2)!!, 1, 25);
            }

            res.send(`{token: ${token},
            user: ${JSON.stringify(user)},
            order: ${order},
            gtype: ${gtype},
            ptype: ${ptype},
            page: ${page},
            pages: ${pages},
            lv: ${level},
            rank: ${rank},
            ver: ${ver},
            hot: ${hot},
            hskill: ${JSON.stringify(hsend)},
            oskill: ${JSON.stringify(osend)},
            skill: ${JSON.stringify(sendList)}}`);
        }
    );

    // Music
    router.get("/music/:mid/:id", async (req, res) => {
        const { mid, id } = req.params;
        const skill = await getSkillMid(id, mid);
        const music = await getMusicInfo(mid);

        res.send(`{skill: ${JSON.stringify(skill)},
        music: ${JSON.stringify(music)}}`);
    });

    // exc
    router.get("/exc/:gtype", async (req, res) => {
        const gtype = req.params.gtype;
        const hot: Array<SkillTableType> = await getEXCData(gtype, true);
        const other: Array<SkillTableType> = await getEXCData(gtype, false);

        let total = 0;
        hot.forEach((x) => (total += (x.level * 100 * 20) / 100));
        other.forEach((x) => (total += (x.level * 100 * 20) / 100));

        const user: UserType = {
            name: "EXCELLENT",
            gskill: total,
            dskill: total,
            id: 0,
            titletower: "",
            title: "",
            token: "",
            gskillhv: 0,
            dskillhv: 0,
            gskillnx: 0,
            dskillnx: 0,
            gskillex: 0,
            dskillex: 0,
            gskillmx: 0,
            dskillmx: 0,
            gskilltbre: 0,
            dskilltbre: 0,
            gskilltb: 0,
            dskilltb: 0,
            gskillall: 0,
            dskillall: 0,
            gclearlv: 0,
            dclearlv: 0,
            gclearnum: 0,
            dclearnum: 0,
            gfclv: 0,
            dfclv: 0,
            gfcnum: 0,
            dfcnum: 0,
            gexclv: 0,
            dexclv: 0,
            gexcnum: 0,
            dexcnum: 0,
            opencount: "",
            countall: 0,
            countgf: 0,
            countdm: 0,
            comment: "",
            updatetime: 0,
            uptimelong: 0,
            pausetype: "",
        };

        res.send(`{user: ${JSON.stringify(user)},
        order: '',
        gtype: ${gtype},
        ptype: 1000,
        page: 1,
        pages: 1,
        lv: null,
        rank: null,
        ver: null,
        hot: null,
        hskill: ${JSON.stringify(hot)},
        oskill: ${JSON.stringify(other)},
        skill: []}`);
    });

    // Create snapshot
    router.get("/skill/snapshot/create/:id/:gtype", async (req, res) => {
        const { id, gtype } = req.params;
        const user: UserType = await getUserById(id);
        await createSnapshot(id, gtype, user.name);
        res.send(`/skill/snapshot/list/${id}`);
    });

    // snapshot list
    router.get("/skill/snapshot/list/:id", async (req, res) => {
        const id = req.params.id;
        res.send(`{list: ${JSON.stringify(listSnapshot(id))}}`);
    });

    // snapshot load
    router.get("/skill/snapshot/load/:id/:date/:gtype", async (req, res) => {
        const { id, date, gtype } = req.params;
        res.send(loadSnapshot(id, date, gtype));
    });

    // Skill Ranking
    router.get("/rank/:gtype/:page", async (req, res) => {
        const gtype = req.params.gtype;
        const page = req.params.page;
        const ranking = await getSkillRanking(gtype, page);
        const usercnt = await getUserCount();
        const cnt = usercnt[0].count;
        res.setHeader("Content-Type", "application/json");
        res.send(`{
            allUserList: ${JSON.stringify(ranking)},
            gtype: ${gtype},
            page: ${page},
            pages: ${Math.ceil(cnt / 30)},
        }`);
    });

    return router;
};

export default SkillController;
