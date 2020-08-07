var mysql = require('mysql');
var express = require('express');
var router = express.Router();


module.exports = function () {
    return {
        init: function () {
            return mysql.createConnection({
                host : "34.64.225.42", //서버 로컬 IP
                port : 9876,
                user : "root", //계정 아이디
                password : "1234", //계정 비밀번호
                database : "WHO_WEB" //접속할 DB
            })
        },

        test_open: function (con) {
            con.connect(function (err) {
                if (err) {
                    console.error('mysql connection error :' + err);
                } else {
                    console.info('mysql is connected successfully.');
                }
            })
        }
    }
};