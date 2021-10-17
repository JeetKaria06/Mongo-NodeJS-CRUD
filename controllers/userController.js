const User = require('../collections/user');
const Project = require('../collections/project');
var mongoose = require('mongoose');

// User Schema
function UserData(data) {
    this.id = data._id;
    this.name = data.name;
}


exports.createUser = (req, res) => {
    try {
        var user = new User({
            "name": req.body.name
        });
        user.save(function(err) {
            if(err) res.status(500).send({"error": err});
            else {
                let userData = new UserData(user);
                res.status(200).send({"message": "User added successfully!", "userData": userData});
            }
        });
    } catch(err) {
        res.status(500).send({"error": err});
    }
}


exports.updateUser = (req, res) => {
    try {
        if(!mongoose.Types.ObjectId.isValid(req.body.id)) {
            res.status(400).send({"error": "Invalid ID!"});
        } else {
            var user = new User({
                _id: req.body.id,
                name: req.body.name
            });
            User.findById(req.body.id, (err, result) => {
                if(err) res.status(500).send({"error": err});
                else {
                    if(result === null) {
                        res.send({"error": "No such User with given id exists!"});
                    } else {
                        User.findByIdAndUpdate(req.body.id, user, {}, err => {
                            if(err) res.status(500).send({"error": err});
                            else {
                                let userData = new UserData(user);
                                res.status(200).send({"message": "User updated successfully!", "userData": userData});
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


exports.deleteUser = (req, res) => {
    try {
        if(!mongoose.Types.ObjectId.isValid(req.body.id)) {
            res.status(400).send({"error": "Invalid ID!"});
        } else {
            User.findById(req.body.id, (err, result) => {
                if(err) res.status(500).send({"error": err});
                else {
                    if(result === null) {
                        res.status(400).send({"error": "No such User with given id exists!"});
                    } else {
                        if(result.name !== req.body.name) {
                            res.status(400).send({"error": "Incorrect username!"});
                        } else {
                            User.findByIdAndRemove(req.body.id, (err) => {
                                if(err) res.status(500).send({"error": err});
                                else res.status(200).send({"message": "User deleted Successfully!"});
                            });
                        }
                    }
                }
            });
        }
    } catch(err) {
        res.status(500).send({"error": err});
    }
}


exports.fetchProjects = (req, res) => {
    try {
        if(!mongoose.Types.ObjectId.isValid(req.body.id)) res.status(400).json({"error": "Invalid ID!"});
        else {
            User.findById(req.body.id, (err, result) => {
                if(err) res.status(500).json({"error": err});
                else if(result === null) res.status(400).json({"error": "No such user exists!"});
                else {
                    Project.find({_id: {$in: result.projectIds}}, (err, result) => {
                        if(err) res.status(500).json({"error": err});
                        else res.status(200).json({"projects": result});
                    });
                }
            });
        }
    } catch(err) {
        console.log(err);
        res.status(500).json({"error": err});
    }
}