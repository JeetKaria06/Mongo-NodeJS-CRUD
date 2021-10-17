const Model = require('../collections/model');
const Project = require('../collections/project');
const User = require('../collections/user');
const Csv = require('../collections/csv');

var mongoose = require('mongoose');
var csv = require('fast-csv');
var fields = ["CLIENTNUM", "Attrition_Flag", "Customer_Age", "Gender", "Dependent_count", "Education_Level", "Marital_Status", "Income_Category", "Card_Category", "Months_on_book", "Total_Relationship_Count", "Months_Inactive_12_mon", "Contacts_Count_12_mon", "Credit_Limit", "Total_Revolving_Bal", "Avg_Open_To_Buy", "Total_Amt_Chng_Q4_Q1", "Total_Trans_Amt", "Total_Trans_Ct", "Total_Ct_Chng_Q4_Q1", "Avg_Utilization_Ratio"]

// Model Schema
function ModelData(data)
{
    this.id = data._id;
    this.userId = data.userId;
    this.projectId = data.projectId;
    this.parameters = data.parameters;
    this.name = data.name;
}

// utility to remove an element from an array
function arrayRemove(arr, value) {
    return arr.filter(function(ele) {
        return ele != value;
    });
}


exports.createModel = (req, res) => {
    try {
        var model = new Model({
            "userId": req.body.userId,
            "projectId": req.body.projectId,
            "name": req.body.name,
            "parameters": req.body.parameters
        });
        if(!mongoose.Types.ObjectId.isValid(req.body.userId) || !mongoose.Types.ObjectId.isValid(req.body.projectId)) {
            res.status(400).json({"error": "Invalid ID"});
        } else {
            Project.findOne({userId: req.body.userId, _id:req.body.projectId}, (err, result) => {
                if(err) res.status(400).json({"error": err});
                else if(result === null) res.status(400).json({"error": "No such user and project pair exits!"});
                else {
                    model.save(function(err) {
                        if(err) res.status(400).json({"error1": err});
                        else {
                            let modelData = new ModelData(model);
                            result.modelIds.push(modelData.id);
                            Project.findByIdAndUpdate(req.body.projectId, {$set:{modelIds: result.modelIds}}, (err) => {
                                if(err) res.status(400).json({"error": err});
                                else res.status(200).json({"message": "Model inserted successfully!", "modelData": modelData});
                            });
                        }
                    });
                }
            });
        }
    } catch(err) {
        res.status(500).json({"error": err});
    }
}


exports.addSyntheticData = (req, res) => {
    try {
        if(!mongoose.Types.ObjectId.isValid(req.body.userId) || !mongoose.Types.ObjectId.isValid(req.body.projectId) || !mongoose.Types.ObjectId.isValid(req.body.id)) {
            res.status(400).json({"error": "Invalid ID"});
        } else {
            var present=0;
            var jsonObj = [];
            var tmp = {};
            Model.findOne({userId: req.body.userId, projectId: req.body.projectId, _id:req.body.id}, (err, result) => {
                if(err) res.status(500).json({"error": err});
                else if(result === null) res.status(400).json({"error": "No such model, project, user triplet exists!"});
                else {
                    if(result.syntheticData.length==0)
                    {
                        csv.parseFile(req.body.path)
                        .on("data", data => {
                            for(let i=0; i<fields.length; i++) {
                                tmp[fields[i]] = data[i];
                                if(i==fields.length-1) jsonObj.push(tmp);
                            }
                        })
                        .on("end", () => {
                            res.status(200).send({"message": "Csv file will be inserted soon!"});
                            Csv.create({"filename": req.body.filename, "csvData": jsonObj}, (err, csvResult) => {
                                if(err) throw err;
                                else {
                                    console.log("Csv file inserted successfully!");
                                    result.syntheticData.push({"filename": csvResult.filename, "id": csvResult._id});
                                    Model.findByIdAndUpdate(req.body.id, {$set: {syntheticData: result.syntheticData}}, (err) => {
                                        if(err) throw err;
                                        console.log("Done!");
                                    });
                                }
                            });
                        });
                    }
                    for(let i=0; i<result.syntheticData.length; i++) 
                    {
                        if(result.syntheticData[i].filename === req.body.filename) present=1;
                        if(i==result.syntheticData.length-1) {
                            if(present) res.status(400).send({"message": "File with same name already exists!"});
                            else {
                                csv.parseFile(req.body.path)
                                .on("data", data => {
                                    for(let i=0; i<fields.length; i++) {
                                        tmp[fields[i]] = data[i];
                                        if(i==fields.length-1) jsonObj.push(tmp);
                                    }
                                })
                                .on("end", () => {
                                    res.status(200).send({"message": "Csv file will be inserted soon!"});
                                    Csv.create({"filename": req.body.filename, "csvData": jsonObj}, (err, csvResult) => {
                                        if(err) throw err;
                                        else {
                                            console.log("Csv file inserted successfully!");
                                            result.syntheticData.push({"filename": csvResult.filename, "id": csvResult._id});
                                            Model.findByIdAndUpdate(req.body.id, {$set: {syntheticData: result.syntheticData}}, (err) => {
                                                if(err) throw err;
                                                console.log("Done!");
                                            });
                                        }
                                    });
                                });
                            }
                        }
                    }
                }
            });
        } 
    } catch(err) {
        res.status(500).json({"error": err});
    }
}


exports.updateModel = (req, res) => {
    try {
        if(!mongoose.Types.ObjectId.isValid(req.body.userId) || !mongoose.Types.ObjectId.isValid(req.body.projectId) || !mongoose.Types.ObjectId.isValid(req.body.id)) {
            res.status(400).json({"error": "Invalid ID"});
        } else {
            Model.findOne({userId: req.body.userId, projectId: req.body.projectId, _id:req.body.id}, (err, result) => {
                if(err) res.status(500).json({"error": err});
                else if(result === null) res.status(400).json({"error": "No such model, project, user triplet exists!"});
                else {
                    result.name = req.body.name;
                    result.parameters = req.body.parameters;
                    Model.findByIdAndUpdate(req.body.id, {$set: {name: result.name, parameters: result.parameters}}, (err) => {
                        if(err) res.status(500).json({"error": err});
                        else res.status(200).json({"message": "Model Updated Successfully!"});
                    });
                }
            });
        }
    } catch(err) {
        res.status(500).json({"error": err});
    }
}

exports.deleteSyntheticData = (req, res) => {
    try {
        if(!mongoose.Types.ObjectId.isValid(req.body.userId) || !mongoose.Types.ObjectId.isValid(req.body.projectId) || !mongoose.Types.ObjectId.isValid(req.body.id) || !mongoose.Types.ObjectId.isValid(req.body.syntheticDataId)) {
            res.status(400).json({"error": "Invalid ID"});
        } else {
            Model.findOne({userId: req.body.userId, projectId: req.body.projectId, _id:req.body.id}, (err, result) => {
                if(err) res.status(500).json({"error": err});
                else if(result === null) res.status(400).json({"error": "No such model, project, user triplet exists!"});
                else {
                    var present=-1;
                    if(result.syntheticData.length === 0) res.status(400).json({"error": "No such csv present in model!"});
                    else {
                        for(let i=0; i<result.syntheticData.length; i++) {
                            if(result.syntheticData[i].id.equals(new mongoose.Types.ObjectId(req.body.syntheticDataId))) present=i;
                            if(i === result.syntheticData.length-1)
                            {
                                if(present === -1) res.status(400).json({"error": "No such csv present in model!"});
                                else {
                                    var id = result.syntheticData[present].id;
                                    // console.log(id); 
                                    result.syntheticData = arrayRemove(result.syntheticData, result.syntheticData[present]);
                                    Model.findByIdAndUpdate(req.body.id, {$set:{syntheticData: result.syntheticData}}, (err) => {
                                        if(err) res.status(500).json({"error": err});
                                        else {
                                            Csv.findByIdAndRemove(id, (err) => {
                                                if(err) res.status(500).json({"error": err});
                                                else res.status(200).json({"message": "Synthetic data csv deleted successfully!"});
                                            });
                                        }
                                    });
                                }
                            }
                        }
                    }
                }
            });
        }
    } catch(err) {
        res.status(500).json({"error": err});
    }
}


exports.readModel = (req, res) => {
    try {
        if(!mongoose.Types.ObjectId.isValid(req.body.userId) || !mongoose.Types.ObjectId.isValid(req.body.projectId) || !mongoose.Types.ObjectId.isValid(req.body.id)) {
            res.status(400).json({"error": "Invalid ID"});
        } else {
            Model.findOne({_id:req.body.id, userId: req.body.userId, projectId: req.body.projectId}, (err, result) => {
                if(err) res.status(500).json({"error": err});
                else if(result === null) res.status(400).json({"error": "No such user, project, model triplet exists!"}); 
                else res.status(200).json({"modelData": result});
            });
        }
    } catch(err) {
        res.status(500).json({"error": err});
    }
}


exports.updateSyntheticData = (req, res) => {
    try {
        if(!mongoose.Types.ObjectId.isValid(req.body.userId) || !mongoose.Types.ObjectId.isValid(req.body.projectId) || !mongoose.Types.ObjectId.isValid(req.body.id) || !mongoose.Types.ObjectId.isValid(req.body.syntheticDataId)) {
            res.status(400).json({"error": "Invalid ID"});
        } else {
            var present=-1;
            Model.findOne({_id: req.body.id, userId: req.body.userId, projectId: req.body.projectId}, (err, result) => {
                if(err) res.status(500).json({"error": err});
                else if(result === null) res.status(400).json({"error": "No such user, project, model triplet exists!"}); 
                else {
                    if(result.syntheticData.length === 0) res.status(400).json({"error": "No such csv present!"});
                    for(let i=0; i<result.syntheticData.length; i++) {
                        if(result.syntheticData[i].id.equals(new mongoose.Types.ObjectId(req.body.syntheticDataId))) {
                            present=i;
                        }

                        if(i === result.syntheticData.length-1) {
                            if(present === -1) res.status(400).json({"error": "No such csv present!"});
                            else {
                                result.syntheticData[i].filename = req.body.filename;
                                Model.findByIdAndUpdate(req.body.id, {$set:{syntheticData: result.syntheticData}}, (err) => {
                                    if(err) res.status(500).json({"error": err});
                                    else {
                                        Csv.findByIdAndUpdate(req.body.syntheticDataId, {_id: req.body.syntheticDataId, filename: req.body.filename}, (err) => {
                                            if(err) res.status(500).json({"error": err});
                                            else res.status(200).json({"message": "CSV Updated Successfully!"});
                                        });
                                    } 
                                });
                            }
                        }
                    }
                }
            });
        }
    } catch(err) {
        res.status(500).json({"error": err});
    }
}


exports.deleteModel = (req, res) => {
    try {
        if(!mongoose.Types.ObjectId.isValid(req.body.userId) || !mongoose.Types.ObjectId.isValid(req.body.projectId) || !mongoose.Types.ObjectId.isValid(req.body.id)) {
            res.status(400).json({"error": "Invalid ID"});
        } else {
            Model.findOne({_id:req.body.id, userId: req.body.userId, projectId: req.body.projectId}, (err, result) => {
                if(err) res.status(500).json({"error": err});
                else if(result === null) res.status(400).json({"error": "No such user, project, model triplet exists!"}); 
                else {
                    Model.findByIdAndRemove(req.body.id, (err) => {
                        if(err) res.status(500).json({"error": err});
                        else {
                            Project.findById(req.body.projectId, (err, result) => {
                                result.modelIds = arrayRemove(result.modelIds, req.body.id);
                                Project.findByIdAndUpdate(req.body.projectId, {$set: {modelIds: result.modelIds}}, (err) => {
                                    if(err) res.status(500).json({"error": err});
                                    else res.status(200).json({"message": "Model deleted successfully!"});
                                });
                            }); 
                        }
                    });
                }
            });
        }
    } catch(err) {
        res.status(500).json({"error": err});
    }
}