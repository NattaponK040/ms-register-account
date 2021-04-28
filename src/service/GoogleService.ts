import {Account} from "../resourse/account";
import {DeleteFile, downloadImage} from "./ImageUtils";
import {firebase, storage} from "../repository/firebase/config";

const {uuidEmit} = require('uuid-timestamp');

export class GoogleService {
    constructor() {
    }

    setData(request: any) {
        const profile = request.body.profile;
        const template = Account;
        const uuid = uuidEmit();

        template.uid = uuid;
        const tempPath = "./tempFile/" + uuid + ".jpg";

        if (downloadImage(tempPath, profile.picture)) {
            (async () => {
                storage.bucket("auth-server-316c3.appspot.com").upload(process.cwd() + "\\tempFile\\" + uuid + ".jpg", {
                    destination: "user/" + uuid + "/profile/" + uuid + ".jpg",
                    contentType: "image/jpg",
                    metadata: {
                        firebaseStorageDownloadTokens: uuid
                    }
                }).then((data) => {

                    let file = data[0];
                    const url = "https://firebasestorage.googleapis.com/v0/b/auth-server-316c3.appspot.com" + "/o/" + encodeURIComponent(file.name) + "?alt=media&token=" + uuid;
                    firebase.firestore().collection("user").doc(uuid).set({
                        url: url,
                        timestamp: timestamp
                    });

                    template.profile.profilePicture.url = url;
                    template.profile.profilePicture.uploaded = true;
                })
            })()
            DeleteFile(tempPath);
        }

        template.url = "/user/" + uuid;
        template.email = profile.email || "";
        const timestamp = new Date();
        template.joinTime.full = timestamp.toString();
        template.joinTime.iso = timestamp.toISOString();

        template.socialNetworkConnect.google = profile.socialId.googleId;
        template.socialNetworkConnect.google.connected = true

        template.profile.name = profile.name
        template.profile.email = profile.email

        if (profile.gender === "male") {
            template.profile.gender.id = 1
            template.profile.gender.nameEN = "male"
            template.profile.gender.nameTH = "เพศชาย"
        } else if (profile.gender === "female") {
            template.profile.gender.id = 2
            template.profile.gender.nameEN = "female"
            template.profile.gender.nameTH = "เพศหญิง"
        }

        if (profile.accessDevice) {
            template.profile.locale = profile.accessDevice.country_code;
        }

        template.profile.age = profile.age || 0;
        template.emailReceive = true;

        if (profile.birthday) {
            const bd = profile.birthday.split("/");
            if (bd.legend == 3) {
                const date = new Date();
                date.setUTCDate(Number(bd[0]));
                date.setUTCDate(Number(bd[1]));
                date.setUTCFullYear(Number(bd[2]))
                template.profile.birthday.full = date.toString();
                template.profile.birthday.iso = date.toISOString();
            }
        }
        template.profile.followers.count = 0;
        template.profile.followers.list = [];
        template.profile.following.count = 0;
        template.profile.following.list = [];

    }
}