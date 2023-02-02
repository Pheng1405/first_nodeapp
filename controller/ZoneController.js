const connection = require("../config/Database");
const findOne = (req, res) => {
    const id = req.params.id;

    let sql = "SELECT * FROM `tbl_zone` WHERE `id` = ? AND `status` = 1";
    connection.query(sql, [id], (err, result)=>{
        if(!err){

            sql_action = `SELECT activity.id AS id, activity.title, activity.thumbnail AS thumbnail, activity.description as description,activity_type.action_type AS type,activity.rating AS rating, activity.total_rating AS total_rating
                            FROM tbl_action as activity
                            INNER JOIN tbl_action_type as activity_type
                            ON activity.suggest_action_id =  activity_type.id
                            WHERE activity.zone_id = ?
                  `;
            let result_zone = result[0];
            result_zone = {...result_zone};
            // result_zone = result_zone[0];
            
            connection.query(sql_action, [id], (err, result)=>{

                // const data = [{...result_zone, suggestion_activity : result}];
                const to_do = result.filter((e,i)=>  e.type === "To Do");
                const to_stay = result.filter((e,i)=>  e.type === "To Stay");
                const to_eat = result.filter((e,i)=>  e.type === "To Eat");
                
                //const suggestion_activity = [{"To Do" : to_do, "To Stay" : to_stay, "To Eat" : to_eat}];
                const suggestion_activity = [to_do,to_stay,to_eat];
                // concat json
                const data = [{...result_zone, suggestion_activity}];
                
                res.send(data);
            });

            // res.json({
            //     data : result
            // });
        }
        else{
            res.json({
                err : true,
                message : err
            });
        }
    });
}
const findAll = (req, res) => {
    const sql = "SELECT * FROM `tbl_zone`";
    connection.query(sql, (err, result)=>{
        if(!err){
            res.json({
                data : result
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

const create = (req, res) => {
    
    const {name, description, thumbnail, status} = req.body;
    var message = [];

    if(name === "" || name === null || name === undefined){
        message.name = "name is required";
    }
    if(description == "" || description == null){
        message.description = "description is required";
    }
    if(thumbnail == "" || thumbnail == null){
        message.thumbnail = "thumbnail is required";
    }
    if(status == "" || status == null){
        message.status = "status is required";
    }

    // console.log(Object.keys(message));

    if(Object.keys(message).length > 0){
        res.json({
            err : true,
            message : message
        });
    }
    else{
        const sql = "INSERT INTO `tbl_zone`(`name`, `description`, `thumbnail`, `status`) VALUES (?,?,?,?)";
        connection.query(sql, [name, description, thumbnail, status], (err, result)=>{
            if(!err){
                res.json({
                    message : "success"
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
const destroy = (req, res) =>{
    res.send("destory");
}
const update = (req, res) =>{
    res.send("update");
}

module.exports = {findOne, create, findAll, destroy,update};