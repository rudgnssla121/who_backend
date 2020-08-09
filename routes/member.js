var express = require('express');
var router = express.Router();
var mysql_dbc = require('../config/database')();
var connection = mysql_dbc.init();
var sha256 = require('sha256');



/* GET home page. */
router.post('/login', function(req, res, next) {
    //console.log(memberInfo);
    var username = req.body.username;
    var password = sha256(req.body.password);
    //console.log(username);
    var sql = 'SELECT * FROM user WHERE id = ?';

    //console.log(PASSWORD(password));
    connection.query(sql, username, function (error, rows, fields) {
        if (error) {
            console.log('query error : ' + error);

        } else {

            if (rows.length > 0) {

                if ( rows[0].pw == password) {
                    res.json({
                        username: username,
                        success: "login sucessfull",
                        pass: true
                    });
                } else {
                    res.json({
                        username: username,
                        success: "ID and password does not match",
                        pass: false
                    });
                }
            } else {
                res.json({
                    username: username,
                    success: "ID does not exists",
                    pass: false
                });
            }
        }

    });
    //mysql연동 전 백엔드에서만 처리
    // for(let i = 0; i < memberInfo.length; i++){
    //
    //         if(username == memberInfo[i].username && password == memberInfo[i].password){
    //            res.json({
    //            username : memberInfo[i].username,
    //            pass : true
    //            });
    //         }
    //         else{
    //             res.json({
    //                 pass : false
    //             });
    //         }
    //     }
    //var loginData = memberInfo.filter(function (element) {
     //return memberInfo.username == username
     //});
});

router.post('/signup', function(req, res, next) {
    //console.log(memberInfo);
    var username = req.body.username;
    var password = sha256(req.body.password);
    var email = req.body.email;
    //console.log(username);
    var sql = 'INSERT INTO user (id, pw, email) VALUES(?, ?, ?)';
    var params = [username, password, email];
    connection.query(sql, params, function(err, rows, fields){
        if(err) {
              res.json({
                  pass: false,
                  success : "error"
                });
        }
        else{
            res.json({
                pass : true,
            });
        }

    });
    //mysql연동 전 백앤드에서만 회원가입처리
    // for(let i = 0; i < memberInfo.length; i++){
    //     if(username == memberInfo[i].username){
    //         res.json({
    //             username : memberInfo[i].username,
    //             pass : false
    //         });
    //     }
    //     else{
    //         res.json({
    //             username : memberInfo[i].username,
    //             pass : true
    //         });
    //     }
    // }
    //var loginData = memberInfo.filter(function (element) {
    //return memberInfo.username == username
    //});
});

router.post('/findid', function(req, res, next) {
    var email = []
    email.push(req.body.email)
    var sql = "SELECT * FROM user WHERE email = ?";

    connection.query(sql, email, function (error, rows, fields) {
        if (error) {
            console.log(sql)
            console.log('query error : ' + error);
        } else {
            if (rows.length > 0) {
                res.send(rows[0].id);

            }
        }

    });
});

module.exports = router;
