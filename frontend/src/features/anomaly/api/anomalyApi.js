import api from "../../../api/axios";

export const anomalyApi = {
    runDetection: () => api.post("/anomaly/run"),
    getAuditFeed: () => api.get("/anomaly/audit"),
    getStats: () => api.get("/anomaly/stats"),
};
