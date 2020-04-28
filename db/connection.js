var db_config = require('./db');

//var mysql = require('mysql');
//const connection = mysql.createConnection(db_config);

var client = null;

var connectionmanager = {};


connectionmanager.getInstance = function () {

    if (!client) {
        const mysqlx = require('@mysql/xdevapi');
        //  console.log("DB client is not connected ");
        //console.log("Connecting...");

        client = mysqlx.getClient(db_config, {
            pooling: {
                queueTimeout: 10000,
                maxIdleTime: 15000,
                enabled: true,
                maxSize: 20
            }
        });

        return client;
    } else {
        console.log("DB client is returned");

        return client;
    }
}



module.exports = connectionmanager;