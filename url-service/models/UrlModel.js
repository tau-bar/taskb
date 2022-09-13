import mongoose from "mongoose"

// instantiate a mongoose schema
const URLSchema = new mongoose.Schema({
    urlCode: String,
    longUrl: String,
    date: {
        type: String,
        default: Date.now
    }
})

// create a model from schema and export it
export default mongoose.model('Url', URLSchema)