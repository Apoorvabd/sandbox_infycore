import api from "./axios";

export const getLedger = (params) =>
    api.get("/ledger", { params });