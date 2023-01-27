const con = require("../config/Database");
const getOne = (req, res) =>{
    const sql = "SELECT * FROM tbl_about_us ORDER BY id  DESC LIMIT 1";
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
    })
}

module.exports = {getOne};