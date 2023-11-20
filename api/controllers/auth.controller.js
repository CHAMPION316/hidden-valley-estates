// Models imports
import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken';

// Controller function for user signup
export const signup = async (req, res, next) => {
    // Destructuring user information from the request body
    const { username, email, password } = req.body;
    // Hashing the user's password before storing it
    const hashedPassword = bcryptjs.hashSync(password, 10);
    //Creating a new User instance with hashed password
    const newUser = new User({ username, email, password: hashedPassword });

    try {
        // Saving the new user to the database
        await newUser.save();
        // Sending a success response if the user is created
        res.status(201).json("User created successfully!")
        
    } catch (error) {
        // Handling errors and sending an 
        // error response if something goes wrong
        next(error);
    }
};

// Controller function for user signin
export const signin = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        // Find a user with the provided email
        const validUser = await User.findOne({ email });

        // Return a 404 error if use not found
        if (!validUser) return next(errorHandler(404, 'User not found!'));

        // Compare provided password with stored hashed password
        const validPassword = bcryptjs.compareSync(password, validUser.password);

        // Return a 401 error if the password is invalid
        if (!validPassword) return next(errorHandler(401, 'Wrong credentials'))

        // Generate a JWT token for the user
        const token = jwt.sign({id: validUser._id}, process.env.JWT_SECRET)

        // Extract sensitive information from user data (excluding password)
        const { password: pass, ...rest } = validUser._doc;

        // Set the JWT token as a cookie for secure authentication
        res.cookie('access_token', token, { httpOnly: true })
        // Respond with user data (excluding password)
        .status(200)
        .json(rest);
    } catch (error) {
        // Pass any caught errors to the error handling middleware
        next(error);
    }
};