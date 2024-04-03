import express from "express";

import {
    addMessage,
    deleteMessage,
    getMessage,
    getMessages,
    updateMessage,
} from "../controllers/messageController";

const router = express.Router();

router.get("/", getMessages);
router.get("/:id", getMessage);
router.post("/", addMessage);
router.delete("/:id", deleteMessage);
router.put("/:id", updateMessage);

export default router;