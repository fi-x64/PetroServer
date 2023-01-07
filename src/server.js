import express from 'express';
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'
import cloudinary from 'cloudinary'

import router from './routes/index.js'

const app = express();
dotenv.config()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
    secure: true
});

mongoose.set("strictQuery", false);

mongoose.connect(process.env.MONGO, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('DB connected')
});


const port = process.env.PORT || 5000

router(app)
// app.use((err, req, res, next) => {
//     const errStatus = err.status || 500
//     const errMessage = err.message
//     res.status(errStatus).json({
//         success: false,
//         status: errStatus,
//         message: errMessage,
//         stack: err.stack,
//     })
// })

app.listen(port, () => console.log("Server listening on port " + port))