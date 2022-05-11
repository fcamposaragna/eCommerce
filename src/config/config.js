import dotenv from 'dotenv';
dotenv.config();
export default{
    mongo:{
        url:{
            session: process.env.MONGO_URL_SESSION        
        }
    },jwt:{
        COOKIE_NAME: process.env.COOKIE_NAME,
        SECRET:process.env.JWT_SECRET
    },nodemailer:{
        USER:process.env.NODEMAILER_USER,
        PASS:process.env.NODEMAILER_PASS
    },twilio:{
        SID:process.env.TWILIO_SID,
        TOKEN:process.env.TWILIO_TOKEN,
        NUMBER_FROM:process.env.TWILIO_NUMBER_FROM,
        NUMBER_TO:process.env.TWILIO_NUMBER_TO
    },session:{
        SUPERADMIN: process.env.SUPERADMIN,
        SUPERADMIN_PASSWORD:process.env.SUPERADMIN_PASSWORD
    }
}