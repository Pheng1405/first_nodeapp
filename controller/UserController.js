const axios = require("axios");
const con = require("../config/Database");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {cloudinary} = require("../helper/cloudinary");
const uploader = require("../helper/multer");
require("dotenv").config();

const {createTokens, validateToken} = require("../helper/JWT");

const signupController = async (req, res) =>{
    
    const {username, email , password, profile} = req.body;

    const findUserSql = "SELECT COUNT(id) as found FROM tbl_user WHERE email = ? OR username = ?";

    con.query(findUserSql, [email, email], async (err, result)=>{
        if(!err){
            let resultUser = Number(result[0]["found"]);

            let isUserExist = resultUser ? true :  false;

            if(isUserExist){
                return res.json({error : "This user has already used"});
            }

            let userProfie = "";
            
            if(profile){
                userProfie = await cloudinary.uploader.upload(profile);
                userProfie = userProfie.secure_url;
            }
            
            

            const createUserSql = "INSERT INTO `tbl_user`(`username`,`password`, `email`, `profile`) VALUES (?,?,?,?)";

            await bcrypt.hash(String(password), 10).then((hashPassword) =>{
                
                con.query(createUserSql, [username, hashPassword, email, userProfie]);
                if(!err){
                    res.json({
                        message : "user created",
                    })
                }
            })
    
            

            
        }
    });
}


const signinController =  (req, res) =>{
    const {email, password} = req.body;

    // console.log(email);
    // console.log(password);

    const findUserSql = "SELECT * FROM tbl_user WHERE email = ? OR username = ? ";
    // console.log(findUserSql);
    con.query(findUserSql, [email, email], (err, result)=>{
        if(result.length){
            console.log(result);
            let resultUser = result[0];
            let dbPassword = resultUser.password;
            console.log(resultUser);
            bcrypt.compare(password, dbPassword).then((match) => {
                if(!match){
                    res
                        .json({
                            error : "Wrong Username or Password"
                        });
                }
                else{
                    const accessToken = createTokens(resultUser);
                    res.cookie("access-token", accessToken,{
                        maxAge : 60*60*24*30*1000,
                    });


                    res.json({
                        username : resultUser.username,
                        profile  : resultUser.profile,
                        token    : accessToken
                    });
                }
            });

        

            

            // let isUserExist = resultUser ? true :  false;

            // if(isUserExist){
            //     res.json({
            //         messgae : "Logged in"
            //     });
            // }
            // else{
            //     res.json({
            //         messgae : "Wrong Username or Email"
            //     });
            // }
        }
        else{
            res
            .json({
                error : "Wrong Username or Password"
            });
        }
    });
}
const profileController = (req, res) =>{
    res.json("Profile");
}
module.exports = {signinController, signupController, profileController};