import api from "../../../api/axios";

export const rulesApi = {
    getAll: () => api.get("/rules"),
    create: (data) => api.post("/rules", data),
    update: (id, data) => api.put(`/rules/${id}`, data),
    remove: (id) => api.delete(`/rules/${id}`),
    reprocess: () => api.post("/rules/reprocess"),
    test: (merchant) => api.post("/rules/test", { merchant }),
};
