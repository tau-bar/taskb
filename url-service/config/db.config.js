import mongoose from 'mongoose'

// declare a Database string URI
const DB_URI = 'mongodb://localhost:27017/urlshortener'

// establishing a database connection
mongoose.connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const connection = mongoose.connection

export default connection