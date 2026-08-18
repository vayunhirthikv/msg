import express from "express";
import {getUsersForSidebars} from "../controllers/message.controllers";
import{getConversationsForSidebar} from "../controllers/message.controllers";
import{getMesssages} from "../controllers/message.controllers";
import {protectRoute} from "../middleware/auth.middleware;"
import { upload } from "../middleware/upload.middleware";
import { sendMessage } from "../controllers/message.controllers";


const router= express.Router();

router.use(protectRoute);

router.get("/users",getUsersForSidebars);
router.get("/conversations",getConversationsForSidebar)
router.get("/:id",getMesssages);
router.post("/send/:id",upload.single("media"),sendMessage);//whatever u send from the frontend has the key "media"




export default router;