export const normalizeMerchant = (rawMerchant,rules) => {
    for (const rule of rules) {
        const regex = new RegExp(rule.keyword,"i");
        if (regex.test(rawMerchant)) {
            return {
                normalizedMerchant: rule.clean_merchant_name,
                category:rule.target_category
            };
        }
    }
    return {
        normalizedMerchant:rawMerchant,
        category:"Uncategorized"
    };
};