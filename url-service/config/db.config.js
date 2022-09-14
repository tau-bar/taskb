import mongoose from 'mongoose'
import dotenv from 'dotenv'

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

// declare a Database string URI
const DB_URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.abnpawu.mongodb.net/?retryWrites=true&w=majority`
const LOCAL_DB_URI = 'mongodb://localhost:27017/urlshortener'

console.log(process.env.NODE_ENV)
if (process.env.NODE_ENV == 'test') {
    mongoose.connect(LOCAL_DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
} else {
    mongoose.connect(DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
}


const connection = mongoose.connection

export default connection