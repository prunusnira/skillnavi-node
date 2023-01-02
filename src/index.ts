import express from "express";
import session from "express-session";
import config from "../server-config.json";
import SkillController from "./controller/skillController";
import RecentController from "./controller/recentController";
import PatternController from "./controller/patternController";
import { SecretData } from "./data/secret/SecretData";

declare module "express-session" {
    interface SessionData {
        token: string;
    }
}

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
    session({
        secret: SecretData.sessionKey,
    })
);

app.use("/recent", RecentController());
app.use("/skill", SkillController());
app.use("/pattern", PatternController());

app.listen(config.server.port, () => {
    console.log(
        `
        Skill Navigator Server - Convert to NodeJS
        --------------------------------------
        Listening at PORT ${config.server.port}
        `
    );
});

export default app;
