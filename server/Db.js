import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

async function dbConnect(){
    try{
        const db = await mongoose.connect(process.env.MONGO_URL, {
            dbName : process.env.DB_NAME
        });
        console.log('DB Connected');
    }
    catch(err){
        console.log(err.message);
    }

}

export default dbConnect;