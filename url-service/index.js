import express from 'express';
import connection from './config/db.config.js'
import deleteRouter from './routes/delete-url.js'
import createRouter from './routes/create-url.js'
import getRouter from './routes/get-url.js'
import updateRouter from './routes/edit-url.js'
import { RouteError } from './utils/errors.js';
import cors from 'cors'

const app = express()

connection.once('open', () => console.log('Database is connected.'))
connection.on('error', () => console.log('Could not connect to database.'))

app.use(cors(), function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
  next();
});

app.use(express.json({extended: false})) 

app.use('/api/url', getRouter)
app.use('/api/url/create', createRouter)
app.use('/api/url/delete', deleteRouter)
app.use('/api/url/update', updateRouter)
app.use('*', function(req, res){
    res.status(404).json(RouteError.INVALID_ENDPOINT);
  });

const PORT = process.env.PORT || 8000
app.listen(PORT, console.log(`Server is listening on port ${PORT}`))

export default app;