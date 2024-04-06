import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { db } from "../db";

export const login = (req:any, res:any) => {
    const checkUserQuery = "SELECT * FROM Users WHERE username = ?";
    try {
        db.query(checkUserQuery, [req.body.username], (err:any, data:any) => {
            if (err) throw err;
            // Check if the user exists
            if (data.length === 0) return res.status(404).json({message : "Incorrect username or password !"});
            // Check if the password is correct
            const isPasswordCorrect = bcrypt.compareSync(req.body.password, data[0].password);
            if (!isPasswordCorrect) return res.status(400).json({message : "Incorrect username or password !"});
            // Create a token
            const token = jwt.sign({ id: data[0].id }, 'RANDOM_TOKEN_SECRET', { expiresIn: '24h' });
            const { password, ...other } = data[0];
            // Send the token in a cookie
            return res.cookie("ACCESS_TOKEN", token, {
                httpOnly: true
            }).status(200).json({message: 'User is authenticated!', token:token});
            // Return the token to the client
        });
    } catch (error) {
        return res.status(500).json(error);
    }
};

export const logout = (req:any, res:any) => {
    try {
        res.clearCookie("ACCESS_TOKEN").status(200).json("User has been logged out.");
    } catch (error) {
        return res.status(500).json(error);
    }
};

// Middleware to verify JWT token
export const auth = (req:any, res:any) => {
    try {
        console.log(req.body.token)
        // Find the JWT token in the request headers
        const token = req.body.token;
        // Decode the token
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        // Extract the user ID from the token
        res.status(200).json({message: 'User is authenticated!', token:token});
        // Extract the user ID from the token
    } catch (error) { res.status(401).json({message: 'User must be connected'}); }
}