const Project = require("../collections/project");
const User = require("../collections/user");
const Model = require("../collections/model");
const Csv = require("../collections/csv");

var mongoose = require('mongoose');
var csv = require('fast-csv')
var fields = ["CLIENTNUM", "Attrition_Flag", "Customer_Age", "Gender", "Dependent_count", "Education_Level", "Marital_Status", "Income_Category", "Card_Category", "Months_on_book", "Total_Relationship_Count", "Months_Inactive_12_mon", "Contacts_Count_12_mon", "Credit_Limit", "Total_Revolving_Bal", "Avg_Open_To_Buy", "Total_Amt_Chng_Q4_Q1", "Total_Trans_Amt", "Total_Trans_Ct", "Total_Ct_Chng_Q4_Q1", "Avg_Utilization_Ratio"]

// Project Schema
function ProjectData(data) {
    this.id = data._id;
    this.userId = data.userId;
    this.name = data.name;
}

// utility to remove an element from an array
function arrayRemove(arr, value) {
    return arr.filter(function(ele) {
        return ele != value;
    });
}

exports.createProject = (req, res) => {
    try {
        var project = new Project({
            "userId": req.body.userId,
            "name": req.body.name
        });
        if(!mongoose.Types.ObjectId.isValid(req.body.userId)) {
            res.status(400).send({"error": "Invalid ID!"});
        } else {
            User.findById(req.body.userId, (err, result) => {
                if(err) res.status(500).send({"error": err});
                else {
                    if(result === null) {
                        res.status(400).send({"message": "No such User with userId exists!"});
                    } else {
                        project.save(function(err) {
                            if(err) res.status(500).send({"error": err});
                            else {
                                let projectData = new ProjectData(project);
                                result.projectIds.push(projectData.id);
                                User.findByIdAndUpdate(req.body.userId, {$set:{projectIds: result.projectIds}}, (err) => {
                                    if(err) res.status(500).send({"error": err});
                                    else {
                                        // console.log(result);
                                        res.status(200).send({"message": "Project added successfully!", "projectData": projectData});     
                                    }
                                });
                            }
                        });
                    }
                }
            });
        }
    } catch(err) {
        res.status(500).send({"error": err});
    }
}


exports.fetchModels = (req, res) => {
    try {
        if(!mongoose.Types.ObjectId.isValid(req.body.userId) || !mongoose.Types.ObjectId.isValid(req.body.id)) {
            res.status(400).json({"error": "Invalid ID"});
        } else {
            Project.findOne({userId: req.body.userId, _id:req.body.id}, (err, result) => {
                if(err) res.status(500).json({"error": err});
                else if(result === null) res.status(400).json({"error": "No such project and user pair exists!"});
                else {
                    console.log(result.modelIds);
                    Model.find({_id: {$in: result.modelIds}}, (err, result) => {
                        if(err) res.status(500).json({"error": err});
                        else res.status(200).json({"models": result});
                    });
                }
            });
        }
    } catch(err) {
        res.status(500).json({"error": err});
    }
}


exports.updateProject = (req, res) => {
    try {
        if(!mongoose.Types.ObjectId.isValid(req.body.id) || !mongoose.Types.ObjectId.isValid(req.body.userId)) {
            res.status(400).send({"error": "Invalid ID!"});
        } else {
            var project = new Project({
                _id: req.body.id,
                userId: req.body.userId,
                name: req.body.name
            });
            Project.findOne({_id: req.body.id, userId: req.body.userId}, (err, result) => {
                if(err) res.status(500).send({"error": err});
                else {
                    if(result === null) res.status(400).send({"error": "No such record exists!"});
                    else {
                        Project.findOneAndUpdate({_id: req.body.id, userId: req.body.userId}, project, {}, err => {
                            if(err) res.status(500).send({"error": err});
                            else {
                                let projectData = new ProjectData(project);
                                res.status(200).send({"message": "Project updated successfully!", "projectData": projectData});
                            }
                        });
                    }
                }
            });
        }
    } catch(err) {
        res.status(200).send({"error": err});
    }
}


exports.deleteProject = (req, res) => {
    try {
        if(!mongoose.Types.ObjectId.isValid(req.body.id) || !mongoose.Types.ObjectId.isValid(req.body.userId)) res.send({"error": "Invalid ID!"});
        else {
            User.findById(req.body.userId, (err, result) => {
                if(err) res.status(500).json({"error": err});
                else if(result === null) res.status(400).send({"error": "No such user exists!"});
                else {
                    console.log(result.projectIds);
                    if(!result.projectIds.includes(req.body.id)) res.status(400).send({"error": "No such project exists!"});
                    else {
                        result.projectIds = arrayRemove(result.projectIds, req.body.id);
                        User.findByIdAndUpdate(req.body.userId, {$set: {projectIds: result.projectIds}},(err) => {
                            if(err) res.status(500).send({"error": err});
                            else {
                                Project.findByIdAndRemove(req.body.id, (err) => {
                                    if(err) res.status(500).send({"error": err});
                                    else res.status(200).send({"message": "Project deleted successfully!"});
                                });
                            }
                        });
                    }
                }
            });
        }
    } catch(err) {
        res.status(500).send({"error": err});
    }
}


exports.addRealData = (req, res) => {
    try {
        if(!mongoose.Types.ObjectId.isValid(req.body.id) || !mongoose.Types.ObjectId.isValid(req.body.userId)) res.status(400).json({"error": "Invalid ID!"});
        else {
            var tmp = {};
            var jsonObj = [];
            var present = 0;
            Project.findOne({_id: req.body.id, userId: req.body.userId}, (err, result) => {
                if(err) res.status(500).json({"error": err});
                else if(result === null) res.status(400).json({"error": "No such project, user pair exists!"});
                else {
                    if(result.realData.length === 0) {
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
                                    result.realData.push({"filename": csvResult.filename, "id": csvResult._id});
                                    Project.findByIdAndUpdate(req.body.id, {$set:{realData: result.realData}}, (err) => {
                                        if(err) throw err;
                                        console.log("Done!");
                                    });
                                }
                            });
                        });
                    }

                    for(let i=0; i<result.realData.length; i++) {
                        if(result.realData[i].filename === req.body.filename) present=1;

                        if(i === result.realData.length - 1) {
                            if(present) res.status(400).json({"error": "Csv with given name exists!"});
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
                                            result.realData.push({"filename": csvResult.filename, "id": csvResult._id});
                                            Project.findByIdAndUpdate(req.body.id, {$set:{realData: result.realData}}, (err) => {
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


exports.updateRealData = (req, res) => {
    try {
        if(!mongoose.Types.ObjectId.isValid(req.body.id) || !mongoose.Types.ObjectId.isValid(req.body.userId) || !mongoose.Types.ObjectId.isValid(req.body.realDataId)) 
            res.status(400).json({"error": "Invalid ID!"});
        else {
            var present = -1;
            Project.findOne({_id: req.body.id, userId: req.body.userId}, (err, result) => {
                if(err) res.status(500).json({"error": err});
                else if(result === null) res.status(400).json({"error": "No such user, project pair exists!"});
                else {
                    if(result.realData.length === 0) res.status(400).json({"error": "No such csv exists!"});
                    for(let i=0; i<result.realData.length; i++) {
                        if(result.realData[i].id.equals(new mongoose.Types.ObjectId(req.body.realDataId))) present = i;

                        if(i === result.realData.length-1) {
                            if(present === -1) res.status(400).json({"error": "No such csv exists!"}); 
                            else {
                                result.realData[present].filename = req.body.filename;
                                Project.findByIdAndUpdate(req.body.id, {$set:{realData: result.realData}}, (err) => {
                                    if(err) res.status(500).json({"error": err});
                                    else {
                                        Csv.findByIdAndUpdate(req.body.realDataId, {$set: {filename: req.body.filename}}, (err) => {
                                            if(err) res.status(500).json({"error": err});
                                            else res.status(200).json({"message": "CSV updated successfully!"});
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


exports.deleteRealData = (req, res) => {
    try {
        if(!mongoose.Types.ObjectId.isValid(req.body.id) || !mongoose.Types.ObjectId.isValid(req.body.userId) || !mongoose.Types.ObjectId.isValid(req.body.realDataId))
            res.status(400).json({"error": "Invalid ID!"});
        else {
            var present=-1;
            Project.findOne({_id: req.body.id, userId: req.body.userId}, (err, result) => {
                if(err) res.status(500).json({"error": err});
                else if(result === null) res.status(400).json({"error": "No such project, user pair exists!"});
                else {
                    if(result.realData.length === 0) res.status(400).json({"error": "No such csv exists!"});
                    else {
                        for(let i=0; i<result.realData.length; i++) {
                            if(result.realData[i].id.equals(new mongoose.Types.ObjectId(req.body.realDataId))) present=i;

                            if(i === result.realData.length-1) {
                                if(present === -1) res.status(400).json({"error": "No such csv exists!"});
                                else {
                                    result.realData = arrayRemove(result.realData, result.realData[present]);
                                    console.log(result.realData);
                                    Project.findByIdAndUpdate({_id: req.body.id, userId: req.body.userId}, {$set:{realData: result.realData}}, (err) => {
                                        if(err) res.status(500).json({"error": err});
                                        else {
                                            Csv.findByIdAndRemove(req.body.realDatId, (err) => {
                                                if(err) res.status(500).json({"error": err});
                                                else res.status(200).json({"message": "Csv Deleted Successfully!"});
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


exports.fetchProject = (req, res) => {
    try {
        if(!mongoose.Types.ObjectId.isValid(req.body.id) || !mongoose.Types.ObjectId.isValid(req.body.userId))
            res.status(400).json({"error": "Invalid ID!"});
        else {
            Project.findOne({_id: req.body.id, userId: req.body.userId}, (err, result) => {
                if(err) res.status(500).json({"error": err});
                else if(result === null) res.status(400).json({"error": "No such project, user pair exists!"});
                else res.status(200).send(result);
            });
        }
    } catch(err) {
        res.status(500).json({"error": err});
    }
}