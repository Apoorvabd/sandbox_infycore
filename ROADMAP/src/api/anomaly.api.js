import api from "./axios";

export const detectAnomalies = () =>
    api.post("/anomaly/detect");

export const getAnomalySummary = () =>
    api.get("/anomaly/stats");

export const getAuditFeed = () =>
    api.get("/anomaly/audit");