import "dotenv/config";
import mongoose from "mongoose";

async function connect() {
    try {
        await mongoose.connect(
            `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@managermentdb.p8zkbfp.mongodb.net/${process.env.DB_DATABASE_NAME}?retryWrites=true&w=majority`,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
        );
        console.log("Connect to DB success");
    } catch (e) {
        console.log("Connect failure!", e.message);
        process.exit(1);
    }
}

export { connect };
