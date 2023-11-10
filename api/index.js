// Importing necessary libraries and modules
import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';

// Connecting to MongoDB
mongoose.connect(process.env.MONGOD).then(() => {
    console.log('Connected to MongoDB!');
    }).catch((err) => {
        console.log(err);
    });
    
// Creating an Express application
const app = express();

// Middleware to parse incoming JSON requests
app.use(express.json());

// Starting the server on port 3000
app.listen(3000, () => {
    console.log('Server running on port 3000');
    }
);


// Using routers for user and authentication routes
app.use("/api/user", userRouter)
app.use("/api/auth", authRouter)

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});