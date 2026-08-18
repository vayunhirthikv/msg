import express from "express";
import {getUsersForSidebars} from "../controllers/message.controllers.js";
import{getConversationsForSidebar} from "../controllers/message.controllers.js";
import{getMesssages} from "../controllers/message.controllers.js";
import {protectRoute} from "../middleware/auth.middleware.js";
import { upload } from "../middleware/upload.middleware.js";
import { sendMessage } from "../controllers/message.controllers.js";

// /api/messages

const router= express.Router();

router.use(protectRoute);

router.get("/users",getUsersForSidebars);
router.get("/conversations",getConversationsForSidebar)
router.get("/:id",getMesssages);
router.post("/send/:id",upload.single("media"),sendMessage);//whatever u send from the frontend has the key "media"




export default router;