// Models imports
import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

// Controller function for user signup
export const signup = async (req, res, next) => {
    // Destructuring user information from the request body
    const { username, email, password } = req.body;
    // Hashing the user's password before storing it
    const hashedPassword = bcryptjs.hashSync(password, 10);
    //Creating a new User instance with hashed password
    const newUser = new User({ username, email, password: hashedPassword });

    try {
        // Saving the new user tothe database
        await newUser.save();
        // Sending a success response if the user is created
        res.status(201).json("User created successfully!")
        
    } catch (error) {
        // Handling errors and sending an 
        // error response if something goes wrong
        next(error);
    }
};