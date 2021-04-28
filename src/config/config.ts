import * as dotenv from 'dotenv';

dotenv.config()

const config = {
    PORT: process.env.PORT || 8989,
    MONGO:{
        URL:"mongodb+srv://aunjai-dev:D8A9Gn4udGH4iXXZ@cluster0.vw76d.mongodb.net",
        DB:"aunjai-dev"
    }
}

export default config;