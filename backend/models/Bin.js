import mongoose from "mongoose";


const binSchema = new mongoose.Schema({
    id: Number,
    name: String,
    status: {
        type: String,
        enum: ["Available","Almost Full","Full"]
    },
    latitude: Number,
    longitude: Number
});

const Bin = mongoose.model("Bin",binSchema);

export default Bin;