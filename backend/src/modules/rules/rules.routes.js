import {Router} from "express";
import { getRules, CreateRule, UpdateRule, DeleteRule,reprocess } from "./rules.controller.js";

const router = Router();

router.get("/", getRules);
router.post("/", CreateRule);
router.put("/:id", UpdateRule);
router.delete("/:id", DeleteRule);
router.post("/reprocess",reprocess);
export default router;