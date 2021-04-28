import {BaseController} from "./BaseController";
import {Collection} from "mongodb";
import {MongoUtil} from "../repository/mongo/MongoUtil";
import {EmailService} from "../service/EmailService";

export class EmailRegisterController extends BaseController {

    private readonly emailService: EmailService;
    constructor(private profileCollection: Collection) {
        super();
        this.emailService = new EmailService();
    }
    register(req: any, res: any) {
        (async () => {
            const data = this.emailService.setData(req);
            await MongoUtil.insertOne(this.profileCollection, JSON.parse(JSON.stringify(data)))
            res.json({data});
        })();
    }
}