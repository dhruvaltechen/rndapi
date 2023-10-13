const connection = require('./connection');
const con = connection.con;
function check_api_accessibility_by_api_key(api_key) {
    var res;
    res = con.query(`SELECT toggle_api_key_ability FROM user where api_key = "${api_key}"`, function (err, result, fields) {
        if (err) throw err;
        console.log((result[0].toggle_api_key_ability));
        res = (result[0].toggle_api_key_ability);
        res = 1;
    });
    console.log(res, "res");
    return res;
}

function check_api_accessibility_by_token(token) {
    var res;
    res = con.query(`SELECT toggle_api_key_ability FROM user where token = "${token}"`, function (err, result, fields) {
        if (err) throw err;
        res = (result[0].toggle_api_key_ability);
        res = 1;
    });
    console.log(res, "res");
    return res;
}

module.exports = {
    check_api_accessibility_by_api_key, 
    check_api_accessibility_by_token
};