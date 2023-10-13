const connection = require('./connection');
const con = connection.con;

const createUser = (user, api_key, token) => {
    let sql = `INSERT INTO user (name, api_key, token) VALUES ("${user}","${api_key}", "${token}")`;
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
    });
}

const toggleApiKeyAbility = (id) => {
    let sql = `UPDATE user SET toggle_api_key_ability = toggle_api_key_ability ^ 1 WHERE id = ${parseInt(id)}`;
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log(result.affectedRows + " record(s) updated");
    });
}

const updateApiCallOutsideSite = (api_key) => {
    let sql = `UPDATE user SET total_api_call = total_api_call + 1, api_outside_site = api_outside_site + 1 WHERE api_key = "${api_key}"`;
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log(result.affectedRows + " record(s) updated");
    });
}

const updateApiCallInsideSite = (user_token) => {
    let sql = `UPDATE user SET total_api_call = total_api_call + 1 WHERE token = "${user_token}"`;
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log(result.affectedRows + " record(s) updated");
    });
}

module.exports = {
    createUser,
    toggleApiKeyAbility,
    updateApiCallInsideSite,
    updateApiCallOutsideSite
}