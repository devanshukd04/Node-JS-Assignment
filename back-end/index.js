import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import 'dotenv/config';
import './db/conn.js';
import './config/cloudinaryConfig.js'
import apiRoute from './routes/api.routes.js';

// dotenv.config();
const port = process.env.PORT;

// initializing the app
const app  = express();

// cross origin resource sharing
const corsOptions = {
  origin: "*"
}
app.use(cors(corsOptions));

// cross parse to store and retrieve cookies
app.use(cookieParser());

// for images and posting data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res)=>{
    res.send("Home Page");
})

app.use('/api',apiRoute);


app.listen(port, function() {
    console.log("Server is running on Port: " + port);
});
