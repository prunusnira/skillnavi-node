import express, { Request } from "express";
import { MusicListItem } from "../data/type/musicListType";
import { SkillType } from "../data/type/skillType";
import { UserType } from "../data/type/userType";
import { getMusicInfo, getMusicList } from "../service/musicService";
import { getSkillRankingForOnePattern } from "../service/skillService";
import {
    getPlayCountAll,
    getUserById,
    getUserByToken,
} from "../service/userService";
import CommonTools from "../tool/CommonTools";
import Filter from "../tool/Filter";

type PTParam = {
    ver: string;
    order: string;
    page: string;
};

type PTQuery = {
    hot?: string;
};

const PatternController = () => {
    const router = express.Router();

    // rank for patterns
    router.get(
        "/pattern/:ver/:order/:page",
        async (req: Request<PTParam, {}, {}, PTQuery>, res) => {
            const { ver, order, page } = req.params;
            const hot = req.query.hot;
            const token = req.session.token;

            const filteredVer = Filter.filterVersion(ver);
            const filteredHot = Filter.filterHot(hot);

            let user = null;
            if (token) user = await getUserByToken(token);

            const musicList = new Array<MusicListItem>();

            if (filteredVer.length === 0) {
                // 버전 안들어간 리스트 추가
                const list: Array<MusicListItem> = await getMusicList(
                    "",
                    filteredHot,
                    order
                );
                list.forEach((x) => musicList.push(x));
            } else {
                // 버전 들어간 리스트 추가
                const list: Array<MusicListItem> = await getMusicList(
                    filteredVer[0].toString(),
                    filteredHot,
                    order
                );
                list.forEach((x) => musicList.push(x));
            }

            const send = CommonTools.getPagedList(
                musicList,
                parseInt(page),
                30
            );
            const pages = CommonTools.getListPages(musicList, 30);

            res.send(`{
                ver: ${ver},
                hot: ${hot},
                order: ${order},
                user: ${JSON.stringify(user)},
                page: ${page},
                pages: ${pages},
                musiclist: ${JSON.stringify(send)}
            }`);
        }
    );

    // Pattern rank
    router.get("/ptrank/:mid/:ptcode/:page/:version", async (req, res) => {
        const { mid, ptcode, page, version } = req.params;
        const music = await getMusicInfo(mid);
        const skillList: Array<SkillType> = await getSkillRankingForOnePattern(
            mid,
            ptcode,
            version
        );
        const sendList = CommonTools.getPagedList(
            skillList,
            parseInt(page),
            30
        );
        const pages = CommonTools.getListPages(skillList, 30);
        const userList = new Array<UserType>();

        sendList.forEach(async (x) =>
            userList.push(await getUserById(x.userid.toString()))
        );

        res.send(`{
            music: ${JSON.stringify(music)},
            ptcode: ${ptcode},
            page: ${page},
            pages: ${pages},
            list: ${JSON.stringify(sendList)},
            users: ${JSON.stringify(userList)}
        }`);
    });

    // count rank
    router.get("/cntrank/:page", async (req, res) => {
        const { page } = req.params;
        const rankList = await getPlayCountAll();
        const sendList = CommonTools.getPagedList(rankList, parseInt(page), 30);
        const pages = CommonTools.getListPages(rankList, 30);

        res.send(`{
            rank: ${JSON.stringify(sendList)},
            page: ${page},
            pages: ${pages}
        }`);
    });

    return router;
};

export default PatternController;
