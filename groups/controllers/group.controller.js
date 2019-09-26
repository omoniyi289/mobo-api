const GroupModel = require('../models/group.model');
const response = require('../../common/jsonResponse');



// exports.getMaximumGroup = (req, res) => {
//     GroupModel.getMaximumGroup(req.params.userId)
//         .then((result) => {
//             res.status(200).send(response.success(result, "Loaded Successfully"));
        
//         });
// };

exports.getUserGroups = (req, res) => {
    GroupModel.getUserGroups(req)
        .then((result) => {
            res.status(200).send(response.success(result, "Loaded Successfully"));
        
        });
};


exports.addUsersToGroup = (req, res) => {
    if(req.body.userIds == undefined || req.body.groupId  == undefined){
        res.status(200).send(response.failure("incomplete_params" ,"group ID and Users must be selected"));
    }
    else{
        GroupModel.addUsersToGroup(req.body)
            .then((result) => {
                if(result == 'group_not_found'){
                    res.status(200).send(response.failure("group_not_found", "Group session not found"));
                }
                else{
                res.status(200).send(response.success(result, "Loaded Successfully"));
            }
            
            });
    }
};

exports.removeUsersFromGroup = (req, res) => {
    if(req.body.userIds == undefined || req.body.groupId  == undefined){
        res.status(200).send(response.failure("incomplete_params" ,"group ID and Users must be selected"));
    }
    else{
        GroupModel.removeUsersFromGroup(req.body)
            .then((result) => {
                if(result == 'group_not_found'){
                    res.status(200).send(response.failure("group_not_found", "Group session not found"));
                }
                else{
                res.status(200).send(response.success(result, "Loaded Successfully"));
            }
            
            });
    }
};

exports.makeGroupRequest = (req, res) => {

    if(req.body.name == undefined || req.body.description  == undefined ){
        res.status(200).send(response.failure("incomplete_params", "name and description not set"));
    }
    else if(req.body.creatorUserId == undefined  ){
        res.status(200).send(response.failure("group_creator_not_set", "creator not set"));
    }
    else{   
            if( req.file != undefined && req.file.filename != undefined  ){
                req.body.groupImage = req.file.filename;
            }  
        GroupModel.makeGroupRequest(req.body)
            .then((result) => {
                res.status(200).send(response.success(result, "Loaded Successfully"));
            });
    }
};

exports.updateGroupDetails = (req, res) => {

    if(req.params.groupId == undefined   ){
        res.status(200).send(response.failure("group_id_not_set", "Group ID required"));
    }else{
        if( req.file != undefined && req.file.filename != undefined  ){
            req.body.groupImage = req.file.filename;
        }  

    GroupModel.updateGroupDetails(req.params.groupId, req.body)
        .then((result) => {
            
            if(result == 'group_id_not_found'){
                res.status(200).send(response.failure("group_id_not_found", "group not found"));
            }else if(result == 'invalid_status'){
                res.status(200).send(response.failure("invalid_status", "invalid status"));
            }else{
                res.status(200).send(response.success(result, "Updated Successfully"));
            }
           
        });
    }
};