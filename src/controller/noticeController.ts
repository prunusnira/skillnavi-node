import express from "express";
import { getNotice, getTopNotice } from "../service/noticeService";

const NoticeController = () => {
    const router = express.Router();

    router.get("/notice/:page", async (req, res) => {
        const { page } = req.params;
        const pageInt = parseInt(page);
        if (pageInt > 0) {
            const data = await getNotice((pageInt - 1) * 10);
            res.send(`{
                notice: ${JSON.stringify(data)}
            }`);
        } else {
            const data = await getTopNotice();
            res.send(`{
                notice: ${JSON.stringify(data)}
            }`);
        }
    });

    return router;
};

export default NoticeController;
