import {Router} from "express";
import { getLedgerController,getLedgerSummaryController,getTransactionController } from "./ledger.controller.js";

const router = Router();

router.get(
    "/summary",
    getLedgerSummaryController
);

router.get(
    "/:id",
    getTransactionController
);

router.get(
    "/",
    getLedgerController
);

export default router;