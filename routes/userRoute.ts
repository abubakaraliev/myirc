const express = require("express");

import {
    registerUser,
    updateUser,
    deleteUser
} from "../controllers/userController";

const router = express.Router();

router.post("/:userId", registerUser);
router.put("/:userId", updateUser);
router.delete("/:userId", deleteUser);

export default router;