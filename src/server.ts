import express from "express";
import config from "./config/config";
import cors from 'cors';
import bodyParser from "body-parser";
import {AppRoutes} from "./routes";
import morgan from "morgan";
import {ApplicationFactory} from "./factory/ApplicationFactory";
import mongo from "mongodb";
import {MongoUtil} from "./repository/mongo/MongoUtil";
const firebaseAuth = require("./middleware/fb-auth-middleware");

const app: express.Application = express();

app.use(cors())
app.use(bodyParser.json())
app.use(morgan('combined'))
// app.use("/", firebaseAuth);

const mongodDb = MongoUtil.createConnection(app, config.MONGO.URL, config.MONGO.DB);
app.on('mongodb.connected', () => {
    mongodDb.then(db => {
        const collection = db.collection("profile");

        const appFactory: ApplicationFactory = new ApplicationFactory(app, collection);
        const route: AppRoutes = new AppRoutes(appFactory);
        route.Route(app)


        app.listen(config.PORT, () => {
            console.log("Server listening with port", config.PORT)
        });
    });
});
