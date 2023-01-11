import express from "express";
import Filter from "../tool/Filter";

const PatternController = () => {
    const router = express.Router();

    // rank for patterns
    router.get("/pattern/:ver/:order/:page", async (req, res) => {
        const { ver, order, page } = req.params;
    });

    // Pattern List
    router.get("/list/:ver/:order/:page/:hot", async (req, res) => {
        const version = req.params.ver; // version 숫자
        const order = req.params.order;
        const page = req.params.page;
        const hot = req.params.hot; // hot, other, all

        const verarr = Filter.filterVersion(version);
    });

    return router;
};

export default PatternController;
