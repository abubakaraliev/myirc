import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { db } from "../db";

export const login = (req:any, res:any) => {
    const checkUserQuery = "SELECT * FROM users WHERE username = ?";

    try {
        db.query(checkUserQuery, [req.body.username], (err:any, data:any) => {
            if (err) throw err;
            if (data.length === 0) return res.status(404).json("User not found");

            const isPasswordCorrect = bcrypt.compareSync(req.body.password, data[0].password);

            if (!isPasswordCorrect) return res.status(400).json("Wrong username or password !");

            const token = jwt.sign({ id: data[0].id }, "SecKey");
            const { password, ...other } = data[0];

            res.cookie("access_token", token, {
                httpOnly: true,
                secure: true,
            }).status(200)
                .json(other);
        });
    } catch (error) {
        return res.status(500).json(error);
    }
};

export const logout = (req:any, res:any) => {
    try {
        res.clearCookie("access_token", {
            secure: true,
            sameSite: "none",
        }).status(200).json("User has been logged out.");
    } catch (error) {
        return res.status(500).json(error);
    }
};