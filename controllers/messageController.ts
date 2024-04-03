import { db } from "../db";
import jwt from "jsonwebtoken";

export const getMessagesByUserId = (req:any, res:any) => {
    const userId = req.params.userId;

    const getPostsByUserIdQuery = 'SELECT * FROM posts WHERE userId = ?';
    db.query(getPostsByUserIdQuery, [userId], (err, data) => {
        if (err) {
            return res.status(500).json(err);
        }
        return res.status(200).json(data);
    });
}

export const getMessages = (req:any, res:any) => {
    const checkPostsQuery = req.query.cat
        ? "SELECT * FROM posts WHERE cat=?"
        : "SELECT * FROM posts";

    db.query(checkPostsQuery, [req.query.cat], (err, data) => {
        if (err) return res.status(500).send(err);

        return res.status(200).json(data);
    });
};

export const getMessage = (req:any, res:any) => {
    const checkPostQuery =
        "SELECT p.id, `username`, `title`, `desc`, p.img, u.img AS userImg, `cat`,`date` FROM users u JOIN posts p ON u.id = p.userId WHERE p.id = ? ";

    db.query(checkPostQuery, [req.params.id], (err, data) => {
        if (err) return res.status(500).json(err);

        return res.status(200).json(data[0]);
    });
};

export const addMessage = (req:any, res:any) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");

    jwt.verify(token, "SecKey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        const addPostQuery =
            "INSERT INTO posts(`title`, `desc`, `img`, `cat`, `date`,`userId`) VALUES (?)";

        const values = [
            req.body.title,
            req.body.desc,
            req.body.img,
            req.body.cat,
            req.body.date,
            userInfo.id,
        ];

        db.query(addPostQuery, [values], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.json("Post has been created.");
        });
    });
};

export const updateMessage = (req:any, res:any) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");

    jwt.verify(token, "SecKey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        const postId = req.params.id;
        const updatePostQuery =
            "UPDATE posts SET `title`=?,`desc`=?,`img`=?,`cat`=? WHERE `id` = ? AND `userId` = ?";

        const values = [req.body.title, req.body.desc, req.body.img, req.body.cat];

        db.query(updatePostQuery, [...values, postId, userInfo.id], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.json("Post has been updated.");
        });
    });
};

export const deleteMessage = (req:any, res:any) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");

    jwt.verify(token, "SecKey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        const postId = req.params.id;
        const deletePostQuery = "DELETE FROM posts WHERE `id` = ? AND `userId` = ?";

        db.query(deletePostQuery, [postId, userInfo.id], (err, data) => {
            if (err) return res.status(403).json("You can delete only your post!");

            return res.json("Post has been deleted!");
        });
    });
};