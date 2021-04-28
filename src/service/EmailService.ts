import {Account} from "../resourse/account";
import {storage,firebase} from "../repository/firebase/config";

const {uuidEmit} = require('uuid-timestamp');

export class EmailService {
    constructor() {
    }

    setData(request: any) {
        const profile = request.body.profile;
        const template = Account;
        const uuid = uuidEmit();

        template.uid = uuid;
        const timestamp = new Date();

      /*  (async () => {
            storage.bucket("auth-server-316c3.appspot.com").upload(profile.picture, {
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
*/
        template.email = profile.email || "";
        template.joinTime.full = timestamp.toString();
        template.joinTime.iso = timestamp.toISOString();

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
        template.emailReceive = profile.news;

        template.profile.followers.count = 0;
        template.profile.followers.list = [];
        template.profile.following.count = 0;
        template.profile.following.list = [];
    }
}