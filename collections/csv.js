var mongoose = require('mongoose');

var schema = mongoose.Schema;

var rowSchema = new mongoose.Schema({
    CLIENTNUM: {type: String, required: true},
    Attrition_Flag: {type: String, required: true},
    Customer_Age: {type: String, required: true},
    Gender: {type: String, required: true},
    Dependent_count: {type: String, required: true},
    Education_Level: {type: String, required: true},
    Marital_Status: {type: String, required: true},
    Income_Category: {type: String, required: true},
    Card_Category: {type: String, required: true},
    Months_on_book: {type: String, required: true},
    Total_Relationship_Count: {type: String, required: true},
    Months_Inactive_12_mon: {type: String, required: true},
    Contacts_Count_12_mon: {type: String, required: true},
    Credit_Limit: {type: String, required: true},
    Total_Revolving_Bal: {type: String, required: true},
    Avg_Open_To_Buy: {type: String, required: true},
    Total_Amt_Chng_Q4_Q1: {type: String, required: true},
    Total_Trans_Amt: {type: String, required: true},
    Total_Trans_Ct: {type: String, required: true},
    Total_Ct_Chng_Q4_Q1: {type: String, required: true},
    Avg_Utilization_Ratio: {type: String, required: true}
});

var CsvSchema = new schema({
    filename: {type: String, required: true},
    csvData: {type: [rowSchema], required: true} 
});

module.exports = mongoose.model("CSV", CsvSchema);