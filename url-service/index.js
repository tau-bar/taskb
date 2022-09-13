import express from 'express';
import connection from './config/db.config.js'
import deleteRouter from './routes/delete-url.js'
import createRouter from './routes/create-url.js'
import getRouter from './routes/get-url.js'
import updateRouter from './routes/edit-url.js'

const app = express()

connection.once('open', () => console.log('Database is connected.'))
connection.on('error', () => console.log('Could not connect to database.'))

app.use(express.json({extended: false})) 

app.use('/api/url', getRouter)
app.use('/api/url/create', createRouter)
app.use('/api/url/delete', deleteRouter)
app.use('/api/url/update', updateRouter)
app.use('*', function(req, res){
    res.status(404).send('This endpoint does not exist.');
  });

const PORT = process.env.PORT || 8000
app.listen(PORT, console.log(`Server is listening on port ${PORT}`))

export default app;