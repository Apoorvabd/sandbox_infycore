//all buisness logic will be written here and will be called from controller
import { errorHandler } from "../../middleware/error.middleware.js";
import {resetProcessedTransactions} from "../etl/etl.repository.js";
import {processTransactions} from "../etl/etl.service.js";
import { getRulesFromDB, createRuleInDB, updateRuleInDB,deleteRuleFromDB }from "./rules.repository.js";
import { normalizeMerchant } from "../etl/normalizer/merchant.normalizer.js";


const getAllRules = async () => {
    const rules = await getRulesFromDB();
    console.log("rules", rules);
    if(!rules){
        throw new Error("Failed to fetch rules");
    }
    return rules;
};
const testRule = async ( merchant) => {

    const rules =await getAllRules();
    return normalizeMerchant(merchant,rules);
};
const createRule = async (ruleData) => {
    const newRule = await createRuleInDB(ruleData);
    if(!newRule){
        throw new errorHandler(500,"Failed to create rule");
    }
    return newRule;
}
const updateRule = async (ruleId, ruleData) => {
    const updatedRule = await updateRuleInDB(ruleId, ruleData);
    if(!updatedRule){
        throw new errorHandler(500,"Failed to update rule");
    }
    return updatedRule;
}
const deleteRule = async (ruleId) => {
    const deletedRule = await deleteRuleFromDB(ruleId);
    if(!deletedRule){
        throw new errorHandler(500,"Failed to delete rule");
    }
    return deletedRule;
}
const reprocessTransactions =async () => {

    await resetProcessedTransactions();
    return await processTransactions();
};

export { getAllRules, createRule, updateRule, deleteRule, reprocessTransactions , testRule};