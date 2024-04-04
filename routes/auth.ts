const express = require("express");
import { login, logout } from "../controllers/auth";

const router = express.Router()

router.post("/login", login);
router.post("/logout", logout);

export default router;