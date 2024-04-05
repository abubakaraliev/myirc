const express = require("express");

import {
    registerUser,
    updateUser,
    deleteUser
} from "../controllers/user";

const router = express.Router();

router.post("/register", registerUser);
router.put("/:userId", updateUser);
router.delete("/:userId", deleteUser);

export default router;