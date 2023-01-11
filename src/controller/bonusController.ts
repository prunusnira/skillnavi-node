import express from "express";
import { LvDiffType } from "../data/type/lvDiffType";
import { getLevelDiff } from "../service/bonusService";

const BonusController = () => {
    const router = express.Router();

    router.get("/lvdiff/:type", async (req, res) => {
        const type = req.params.type;
        const lvDiff: Array<LvDiffType> = await getLevelDiff(type);
        res.send(`{lvdiff: ${JSON.stringify(lvDiff)}}`);
    });

    return router;
};

export default BonusController;
