const mongoose = require("mongoose");
const { getEnv } = require("../utils/index.js");

const connectToMongoDB = async () => {
    try {
        const mongoURI = getEnv("MONGO_URI");
        await mongoose.connect(mongoURI);
        console.log("Connected to MongoDB!");
    } catch (error) {
        console.log("MongoDB Error :", error);
        process.exit(1);
    }
};

module.exports = {
    connectToMongoDB,
};
