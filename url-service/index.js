const express = require("express")
const app = express()

const connection = require('./config/db.config')
connection.once('open', () => console.log('Database is connected.'))
connection.on('error', () => console.log('Could not connect to database.'))

app.use(express.json({extended: false})) 
app.use('/api/url', require('./routes/get-url'))
app.use('/api/url/create', require('./routes/create-url'))
app.use('/api/url/delete', require('./routes/delete-url'))
app.use('/api/url/update', require('./routes/edit-url'))

const PORT = process.env.PORT || 8000
app.listen(PORT, console.log(`Server is listening on port ${PORT}`))