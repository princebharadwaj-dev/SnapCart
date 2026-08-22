import mongoose from "mongoose";

const mongodbUrl = process.env.MONGO_URL;

if (!mongodbUrl) {
    throw new Error("MONGO_URL is not defined");
}

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = {
        conn: null,
        promise: null,
    };
}

const connectDb = async () => {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        cached.promise = mongoose
            .connect(mongodbUrl)
            .then((conn) => conn.connection);
    }

    try {
        cached.conn = await cached.promise;
        return cached.conn;
    } catch (error) {
        cached.promise = null;
        console.error("MongoDB connection error:", error);
        throw error;
    }
};

export default connectDb;