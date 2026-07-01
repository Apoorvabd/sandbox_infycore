import api from "../../../api/axios";

export const ledgerApi = {
    getTransactions: (params) => api.get("/ledger", { params }),
    getSummary: () => api.get("/ledger/summary"),
    getTransaction: (id) => api.get(`/ledger/${id}`),
};
