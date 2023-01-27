const connection = require("../config/Database");
const empty = require("../config/empty");

const create = (req, res) =>{
    var {zone_id, name, description, thumbnail, status} = req.body;

    var message = [];

    if(empty(zone_id)){
        message.zone_id = "zone id is required";
    }
    if(empty(name)){
        message.name = "name is required";
    }
    if(empty(description)){
        message.description = "description is required";
    }
    if(empty(thumbnail)){
        message.thumbnail = "thumbnail is required";
    }
    if(empty(status)){
        message.status = "status is required";
    }

    if(Object.keys(message).length > 0){
        res.json({
            err : true,
            message : message
        });
    }
    else{
        var sql = "INSERT INTO `tbl_tourist_attraction`(`zone_id`, `name`, `description`, `thumbnail`, `status`) VALUES (?,?,?,?,?)";
        connection.query(sql, [zone_id, name, description, thumbnail, status], (err, result)=>{
            if(!err){
                res.json({
                    message : 'success'
                });
            }
            else{
                res.json({
                    err : true,
                    message : err
                });
            }
        });

    }
}
const findOne = (req, res) =>{
    const id = req.params.id;

    const sql = "SELECT * FROM `tbl_tourist_attraction` WHERE `id` = ?";
    connection.query(sql, [id], (err, result)=>{
        if(err){
            res.json({
                err : true,
                message : err
            }); 
        }
        else{
            res.json({
                data : result
            });
        }
    });
}
const findAll = (req, res) =>{

}
const update = (req, res) =>{

}

const destroy = (req, res) =>{

}

module.exports = {findOne, create, findAll, destroy,update};