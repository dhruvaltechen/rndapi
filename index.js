const express = require("express");
const app = express();
const port = 8000;
const user_token = require("./user_token");
const check_api_access = require("./check_api_access");
const query = require('./queries');

//testing api
app.get("/testapi", (req, res) => {
    res.json({
        status: 200,
        message: "success",
        description: [],
    });
});

//calling api inside site
app.get("/api-inside-site", (req, res) => {

    query.updateApiCallInsideSite(req.query.user_token);

    console.log(check_api_access.check_api_accessibility_by_token(req.query.user_token), "api access");
    message = check_api_access.check_api_accessibility_by_token(req.query.user_token) == 1 ? "API is accessed Outside site" : "You don't have access to key";
    res.json({
        status: 200,
        message: message
    });

});

//calling api outside site
app.get("/api-outside-site", (req, res) => {

    query.updateApiCallOutsideSite(req.query.api_key);

    message = check_api_access.check_api_accessibility_by_api_key(req.query.api_key) == 1 ? "API is accessed Outside site" : "You don't have access to key";
    res.json({
        status: 200,
        message: message
    });

});

//toggle api key's ability
app.get("/toggle-api-key-ability", (req, res) => {

    query.toggleApiKeyAbility(req.query.id);

    res.json({
        status: 200,
        user: req.query.user,
        message: "success",
        description: req.query.user + "'s api key toggled ",
    });

});

//create user
app.get("/usercreate/:user", (req, res) => {
    let token = user_token.user_token(32);
    let api_key = user_token.user_token(16);

    query.createUser(req.params.user, api_key, token);

    res.json({
        status: 200,
        user: req.params.user,
        message: "success",
        api_key: api_key,
        description: token,
    });

});


app.listen(port, () => {
    console.log(`Listening to port ${port}`);
});
