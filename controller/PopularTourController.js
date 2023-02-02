const con = require("../config/Database");
const cookieParser = require("cookie-parser");


const findAll = (req, res) =>{
    const sql = "SELECT action.*, zone.name as zone FROM `tbl_action` as action INNER JOIN tbl_zone as zone ON zone.id = action.zone_id WHERE `suggest_action_id` = 1 ORDER BY `visited` DESC";

    con.query(sql, (err, result)=>{
        if(!err){
            res.json({
                data : result
            });
        }
        else{
            res.json({
                error : true,
                message : err
            });
        }
    });
} 
const findOne = (req, res) =>{

    const id = req.params.id;

    const sql = "SELECT action.*, zone.name as zone FROM `tbl_action` as action INNER JOIN tbl_zone as zone ON zone.id = action.zone_id WHERE  action.id = ?";
    con.query(sql,[id], (err, result)=>{
        if(!err){

            // console.log(result);
            let response = result[0];
            let mainData = {...result, related : ""};

            // response = {...result}
            const zone = response.zone;
            const dupId = response.id;
            const relateQuery = "SELECT action.*, zone.name    FROM `tbl_action` as action INNER JOIN tbl_zone as zone ON zone.id = action.zone_id  WHERE `suggest_action_id` = 1 AND action.id NOT IN (?) AND zone.name = ? ORDER BY `visited`";

            con.query(relateQuery, [dupId, zone], (err, result)=>{
                if(!err){
                    var resultFinal =  {...mainData[0], related: result};

                    let itinerarySql = "SELECT t_itinerary.title, t_itinerary.stop_duration, t_itinerary.google_map FROM `tbl_itinerary` as t_itinerary INNER JOIN tbl_action as t_action ON t_action.id = t_itinerary.action_id WHERE t_action.id = ?";

                    con.query(itinerarySql, [id], (err, result)=>{
                        if(!err){
                            resultFinal = {...resultFinal, itinerary : result};
                            res.json({
                                data : resultFinal
                            })
                        }
                    });
                }
                else{
                    res.json({
                        error : true,
                        message : err
                    });
                }
            });
        }
        else{
            res.json({
                error : true,
                message : err
            });
        }
    });
}
const findLimit = (req, res) =>{
    const limit = Number(req.params.limit);

    const sql = "SELECT action.*, zone.name as zone FROM `tbl_action` as action INNER JOIN tbl_zone as zone ON zone.id = action.zone_id WHERE `suggest_action_id` = 1 ORDER BY `visited` DESC LIMIT ?";

    con.query(sql,[limit], (err, result)=>{
        if(!err){
            res.json({
                data : result
            });
        }
        else{
            res.json({
                error : true,
                message : err
            });
        }
    });
}

const findLimitThumbnail = (req, res) =>{
    const limit = Number(req.params.limit);
    const sql = "SELECT id,thumbnail, title  FROM `tbl_action` WHERE suggest_action_id = 1 ORDER BY `visited` DESC LIMIT ?";
    
    con.query(sql,[limit], (err, result)=>{
        if(!err){
            res.json({
                data : result
            });
        }
        else{
            res.json({
                error : true,
                message : err
            });
        }
    });
}

const findRelated = (req, res) =>{
    const id = req.params.id;
    const zone_name = req.params.zone_name;

    const sql = "SELECT action.*, zone.name    FROM `tbl_action` as action INNER JOIN tbl_zone as zone ON zone.id = action.zone_id  WHERE `suggest_action_id` = 1 AND action.id NOT IN (?) AND zone.name = ? ORDER BY `visited`";

    con.query(sql, [id, zone_name], (err, result)=>{
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
    })
}

module.exports = {findOne, findAll, findLimit, findLimitThumbnail, findRelated};