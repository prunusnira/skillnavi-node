import express from "express";
import { UserType } from "../data/type/userType";
import { getUserByToken } from "../service/userService";

const ProfileController = () => {
    const router = express.Router();

    router.get("/gettoken", async (req, res) => {
        const session = req.session;
        let token = session.token;

        if (!token) token = "";
        res.setHeader("Content-Type", "application/json");
        res.send(`token: ${token}`);
    });

    router.get("/getuser/:token", async (req, res) => {
        const token = req.params.token;
        const user = (await getUserByToken(token)) as UserType;

        res.setHeader("Content-Type", "application/json");
        res.send(`mydata: ${JSON.stringify(user)}`);
    });
};
