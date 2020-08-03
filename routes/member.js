var express = require('express');
var router = express.Router();
var memberInfo = require('../data/member.json');

/* GET home page. */
router.post('/login', function(req, res, next) {
    console.log(memberInfo);
    var username = req.body.username;
    var password = req.body.password;
    console.log(username);
    let loginPass = false;
    for(let i = 0; i < memberInfo.length; i++){
            if(username == memberInfo[i].username && password == memberInfo[i].password){
               res.json({
               username : memberInfo[i].username,
               pass : true
               });
            }
        }
    //var loginData = memberInfo.filter(function (element) {
     //return memberInfo.username == username
     //});

});


module.exports = router;
