const {validateToken, createTokens} = require("../helper/JWT");
const upload = require("../helper/multer");
const UserRoute = (app) =>{
    const {signupController, signinController, profileController} = require("../controller/UserController");
    app.post("/api/login", signinController);
    app.post("/api/register", signupController);
    app.get("/api/profile", validateToken, profileController);
}

module.exports = UserRoute;