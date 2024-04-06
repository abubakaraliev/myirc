const express = require("express");
import { login, logout, auth } from "../controllers/auth";

const router = express.Router()

router.post("/login", login);
router.get("/logout", logout);
router.post("/verify", auth);

export default router;