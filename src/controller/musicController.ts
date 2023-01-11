import express from "express";
import { getMusicInfo, getMusicList } from "../service/musicService";

const MusicController = () => {
    const router = express.Router();

    // music list
    router.get("/musiclist/:ver", async (req, res) => {
        const ver = req.params.ver;
        const list = await getMusicList(ver, "", "titleasc");
        res.send(`{music: ${JSON.stringify(list)}}`);
    });

    router.get("/getmusic/:mid", async (req, res) => {
        const mid = req.params.mid;
        res.send(`{music: ${JSON.stringify(await getMusicInfo(mid))}}`);
    });

    return router;
};

export default MusicController;
