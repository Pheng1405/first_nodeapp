const con = require("../config/Database");
const empty = require("../config/empty");

const create = (req ,res) =>{
    const message = {};
    // `zone_id`, `tour_attraction_id`, `suggest_action_id`, `suggest_action_id`, `description`, `thumbnail`, `rating`, `total_rating`, `created_at`, `updated_at
    const {zone_id, tour_attraction_id, suggest_action_id,title, description, thumbnail, price} = req.body;

    if(empty(zone_id)){
        message.zone_id = "zone id is required"; 
    }
    if(empty(title)){
        message.title = "title is required"; 
    }
    if(empty(price)){
        message.price = "price is required"; 
    }
    if(empty(suggest_action_id)){
        message.suggest_action_id = "suggest_action_id is required"; 
    }
    if(empty(description)){
        message.description = "description id is required"; 
    }
    if(empty(thumbnail)){
        message.thumbnail = "thumbnail id is required"; 
    }
    
    // form valid (check if user input all information except tour attaction)
    if(!Object.keys(message).length > 0){
        const sql = "INSERT INTO `tbl_action`( `zone_id`, `tour_attraction_id`, `suggest_action_id`, `title`, `description`, `thumbnail`, `price`)VALUES (?, ?, ?, ?, ?, ?, ?)"
        con.query(sql, [zone_id, tour_attraction_id, suggest_action_id,title, description, thumbnail, price], (err, result)=>{
            if(!err){
                res.json({
                    message : "success"
                });
            }
            else{
                res.json({
                    error : true,
                    message : err
                });
            }
        })
    }
    else{
        res.send(message);
    }
}

const findOne = (req, res) =>{
    res.send("find one action");
}

const findAll = (req, res) =>{
    res.send("find all action");
}

const destroy = (req, res) =>{
    res.send("destroy action");
}

const update = (req, res) =>{
    res.send("update action");
}


module.exports = {create, findAll, findOne, destroy, update};


