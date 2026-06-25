import {Router} from "express";
import { getRules, CreateRule, UpdateRule, DeleteRule,reprocess,testRuleController } from "./rules.controller.js";

const router = Router();

router.get("/", getRules);
router.post("/", CreateRule);
router.put("/:id", UpdateRule);
router.delete("/:id", DeleteRule);
router.post("/reprocess",reprocess);
router.post("/test",testRuleController);
export default router;