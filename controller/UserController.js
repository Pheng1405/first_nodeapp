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

    con.query(findUserSql, [email, username], async (err, result)=>{
        if(!err){
            let resultUser = Number(result[0]["found"]);

            let isUserExist = resultUser ? true :  false;

            if(isUserExist){
                return res.json({error : "This user has already used"});
            }

            let userProfile = "";
            
            if(profile){
                userProfile = await cloudinary.uploader.upload(profile);
                userProfile = userProfile.secure_url;
            }
            
            

            const createUserSql = "INSERT INTO `tbl_user`(`username`,`password`, `email`, `profile`) VALUES (?,?,?,?)";

            await bcrypt.hash(String(password), 10).then((hashPassword) =>{
                
                con.query(createUserSql, [username, hashPassword, email, userProfile]);
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
            // console.log(result);
            let resultUser = result[0];
            let dbPassword = resultUser.password;
            // console.log(resultUser);
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
                        email    : resultUser.email,
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

const editProfilePictureController  = async (req, res) =>{
    const {profile, username} =  req.body;
    let userProfile = "";

    if(profile){
        
        userProfile = await cloudinary.uploader.upload(profile);
        userProfile = userProfile.secure_url;

        sqlUpdatePicture = "UPDATE `tbl_user` SET `profile`=? WHERE username = ?";

        con.query(sqlUpdatePicture, [userProfile, username], (err, result)=>{
            if(!err){
                // console.log("Successs");
                res.json({
                    message : "Profile Picture updated successful",
                });

            }
            else{
                // console.log("Fail");
                res.json({
                    err     : true,
                    message : "Something went Wrong",
                })
            }
        });
    }
}
module.exports = {signinController, signupController, profileController, editProfilePictureController};