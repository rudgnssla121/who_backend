var express = require('express');
var router = express.Router();
var mysql_dbc = require('../config/database')();
var connection = mysql_dbc.init();

/* GET home page. */
router.get('/listview', function(req, res, next) {
    var sql = 'SELECT DATE_FORMAT(time,\'%y-%m-%d\') AS date, username, name, content  FROM notice_board';

    //console.log(PASSWORD(password));

    connection.query(sql, function (error, rows, fields) {
        if (error) {
            console.log('query error : ' + error);
        } else {
            res.send(rows);
        }
    });

});

router.get('/listfind/:index', function(req, res, next) {
    const index = parseInt(req.params.index, 10);
    var sql = 'SELECT DATE_FORMAT(time,\'%y-%m-%d\') AS date, DATE_FORMAT(time,\'%h:%i:%s\') AS time, username, name, content  FROM notice_board';


    //console.log(PASSWORD(password));

    connection.query(sql, function (error, rows, fields) {
        if (error) {
            console.log('query error : ' + error);
        } else {
            res.send(rows[index]);
        }
    });
});

router.post('/listadd', function (req,res,next){
    var username = req.body.username;
    var name = req.body.name;
    var content = req.body.content;
    var params = [username, name, content];
    var sql = 'INSERT INTO notice_board (username, name, content) VALUES(?, ?, ?)';
    connection.query(sql, params, function(err, rows, fields){
        if(err) {
            console.log(err);
        }
        else{
            res.json({
                pass : true,
            });
        }

    });


});


module.exports = router;
