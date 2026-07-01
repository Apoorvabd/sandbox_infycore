import api from "../../../api/axios";

export const ingestionApi = {
    sync: () => api.post("/ingestion/sync"),
};
