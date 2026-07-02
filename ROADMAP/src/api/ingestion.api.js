import api from "./axios";

export const syncTransactions = () =>
    api.post("/ingestion/sync");