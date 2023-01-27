const HelpRoute = (app) => {
    const {getLogo, getContact} = require("../controller/HelpController");

    app.get("/api/logo", getLogo);
    app.get("/api/contact", getContact);
}
module.exports = HelpRoute;