export function extractApiData(response) {
    const payload = response?.data;

    // Backend uses ApiResponse { statusCode, data, message, ... }
    if (payload && typeof payload === "object" && "data" in payload) {
        return payload.data;
    }

    return payload ?? response;
}

export function toArray(value) {
    return Array.isArray(value) ? value : [];
}

export function parseListResponse(response) {
    const parsed = extractApiData(response);

    if (Array.isArray(parsed)) {
        return {
            items: parsed,
            total: parsed.length,
        };
    }

    if (parsed && typeof parsed === "object") {
        const listCandidate = parsed.data ?? parsed.items ?? parsed.rows ?? parsed.results ?? parsed.transactions;
        const items = Array.isArray(listCandidate) ? listCandidate : [];
        const total = Number(parsed.total_count ?? parsed.totalCount ?? parsed.total ?? items.length) || 0;

        return {
            items,
            total,
        };
    }

    return {
        items: [],
        total: 0,
    };
}