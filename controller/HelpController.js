const con  = require("../config/Database");

const getLogo = (req, res) =>{
    const sql  = "SELECT * FROM tbl_logo ORDER BY id DESC LIMIT 1";
    con.query(sql, (err, result)=>{
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

const getContact = (req, res) =>{
    const sql  = "SELECT * FROM tbl_contact LIMIT 3";
    con.query(sql, (err, result)=>{
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

module.exports = {getLogo, getContact};