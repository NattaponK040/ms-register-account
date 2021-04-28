const Account = {
    email: "",
    emailVerified: false,
    emailVerifiedMessage: "คุณยังไม่ได้ยืนยันอีเมล",
    emailReceive:false,
    uid: 0,
    url: "",
    androidVersion: "",
    iosVersion: "",
    accessDevice: new Map(),
    joinTime: {
        iso: "",
        full: ""
    },
    preference: {
        shareToFacebook: false,
        shareToTwitter: false
    },
    socialNetworkConnect:{
        facebook:{
            fbId:"",
            connected:false
        },
        twitter:{

        },
        google:{
            gId:"",
            connected:false
        }
    },
    profile: {
        name: "",
        email: "",
        aboutMe:"",
        password: "",
        phoneNumber: "",
        gender: {
            id:0,
            nameTH:"ไม่ระบุ",
            nameEN:"Not specified"
        },
        profilePicture: {
            url: "",
            thumbnailUrl: "",
            smallUrl: "",
            uploaded: false
        },
        city:{
            id:"",
            name:""
        },
        age: 0,
        followers: {
            count: 0,
            list: [],
        },
        following: {
            count: 0,
            list: [],
        },
        settings: {
            accountPrivacy: false,
            language: "",
            notification: {
                message: {
                    sound: true,
                    pushNotification: true
                },
                feedBack: {
                    links: true,
                    shared: true,
                    comment: true,
                    pushNotification: true
                },
                event: {
                    followers: true,
                    following: true,
                    groupInvitations: true,
                    news: true,
                    bookmarks: true,
                }
            }
        },
        locale: "",
        birthday: {
            iso:"",
            full:""
        },
        postTimeline: {},
        timelineHistory: {},
        groups: {},
        activity: {},

    }
}

export {
    Account
}