import {BaseController} from "./controller/BaseController";
import {ApplicationFactory} from "./factory/ApplicationFactory";
import {Application} from "express";
import {FacebookRegisterController} from "./controller/FacebookRegisterController";
import {GoogleRegisterController} from "./controller/GoogleRegisterController";
import {EmailRegisterController} from "./controller/EmailRegisterController";

export class AppRoutes {

    private readonly facebookRegisterController: FacebookRegisterController;
    private readonly googleRegisterController: GoogleRegisterController;
    private readonly emailRegisterController: EmailRegisterController;

    constructor(app: ApplicationFactory) {
        const appFactory = app
        this.facebookRegisterController = appFactory.facebookRegisterController;
        this.googleRegisterController = appFactory.googleRegisterController;
        this.emailRegisterController = appFactory.emailRegisterController;
    }

    public Route(app: Application) {

        app.route("/register-facebook").post(this.facebookRegisterController.register.bind(this.facebookRegisterController))
        app.route("/register-google").post(this.googleRegisterController.register.bind(this.googleRegisterController))
        app.route("/register-email").post(this.emailRegisterController.register.bind(this.emailRegisterController))

        // router.post("/register-phoneNumber", this.phoneRegisterController.register)

    }
}