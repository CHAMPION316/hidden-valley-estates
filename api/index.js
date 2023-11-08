import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';

mongoose.connect(process.env.MONGOD).then(() => {
    console.log('Connected to MongoDB!');
    }).catch((err) => {
        console.log(err);
    });
    

const app = express();

app.use(express.json());

app.listen(3000, () => {
    console.log('Server running on port 3000');
    }
);


// code is to test send/request to client side
app.use("/api/user", userRouter)
app.use("/api/auth", authRouter)