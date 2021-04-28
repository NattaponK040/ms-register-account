import {BaseController} from "../controller/BaseController";
import {Application} from "express";
import {FacebookRegisterController} from "../controller/FacebookRegisterController";
import {GoogleRegisterController} from "../controller/GoogleRegisterController";
import {EmailRegisterController} from "../controller/EmailRegisterController";
import {Collection} from "mongodb";

export class ApplicationFactory {
    readonly facebookRegisterController: FacebookRegisterController;
    readonly googleRegisterController: GoogleRegisterController;
     readonly emailRegisterController: EmailRegisterController;

    constructor(private app: Application, private profileCollection: Collection) {
        this.facebookRegisterController = new FacebookRegisterController(profileCollection);
        this.googleRegisterController = new GoogleRegisterController(profileCollection);
        this.emailRegisterController = new EmailRegisterController(profileCollection);
    }
}