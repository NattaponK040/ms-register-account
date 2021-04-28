import {BaseController} from "./BaseController";
import {Collection} from "mongodb";
import {GoogleService} from "../service/GoogleService"
import {MongoUtil} from "../repository/mongo/MongoUtil";

export class GoogleRegisterController extends BaseController {
    private readonly googleService: GoogleService;

    constructor(private profileCollection: Collection) {
        super();
        this.googleService = new GoogleService();
    }

    register(req: any, res: any) {
        (async () => {
            const data = this.googleService.setData(req);
            await MongoUtil.insertOne(this.profileCollection, JSON.parse(JSON.stringify(data)))
            res.json({data});
        })();
    }
}