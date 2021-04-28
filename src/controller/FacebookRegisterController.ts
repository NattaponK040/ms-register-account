import {Collection} from "mongodb";
import {BaseController} from "./BaseController";
import {MongoUtil} from "../repository/mongo/MongoUtil";
import {FacebookService} from "../service/FacebookService";

export class FacebookRegisterController extends BaseController {

    private readonly facebookService: FacebookService;

    constructor(private profileCollection: Collection) {
        super();
        this.facebookService = new FacebookService();
    }

    register(req: any, res: any) {
        (async () => {
            const data = this.facebookService.setData(req);
            await MongoUtil.insertOne(this.profileCollection, JSON.parse(JSON.stringify(data)))
            res.json({data});
        })();
    }
}