import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';

mongoose.connect(process.env.MONGOD).then(() => {
    console.log('Connected to MongoDB!');
    }).catch((err) => {
        console.log(err);
    });
    

const app = express();

app.listen(3000, () => {
    console.log('Server running on port 3000');
    }
);
