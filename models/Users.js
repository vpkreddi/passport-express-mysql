var Users = {};
var user = {};
var connection = require('../db/connection').getInstance();
Users.findOne = function(username , cb){
    user.name = username;
    cb(null,user);
}

Users.find = function(){
    return user;
}

Users.findOne = function (username, cbsuccess, cberror) {
    let query = `SELECT username,password,id from USERS where EMAIL='`+username+`'`;
    let user = {};
    connection.getSession().then(session => {
        session.sql(query)
            
            .execute((row) => {
                session.close();
                if (row && row.length > 0) {
                    console.log(row[0])
                    user.username = row[0];
                    user.id= row[2];
                    user.password = row[1];
                }
                cbsuccess(user);
            }).catch((err) => {
                session.close();
               
                cberror(err);
            });
    }).catch((err) => {
        
        cberror(err);
    });
};
module.exports = Users;