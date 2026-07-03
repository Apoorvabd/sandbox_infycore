import Fuse from 'fuse.js'




export const normalizeMerchant = (rawMerchant,rules) => {
    for (const rule of rules) {
        const regex = new RegExp(rule.keyword,"i");
        if (regex.test(rawMerchant)) {
            return {
                normalizedMerchant: rule.clean_merchant_name,
                category:rule.target_category,
            };
        }
    }
        const fuse=new Fuse(rules ,{ keys:["keyword"], threshold:0.3 ,includeScore:true });
        const result=fuse.search(rawMerchant);
        if(result.length>0){
            return {
                normalizedMerchant:result[0].item.clean_merchant_name,
                category:result[0].item.target_category,
            };
        }


    return {
        normalizedMerchant:rawMerchant,
        category:"Uncategorized"
    };
};

console.log(normalizeMerchant("amaz0n",[
    { keyword: "amazon", clean_merchant_name: "Amazon", target_category: "Shopping" },
    { keyword: "flipkart", clean_merchant_name: "Flipkart", target_category: "Shopping" },
    { keyword: "uber", clean_merchant_name: "Uber", target_category: "Transport" }
])
)