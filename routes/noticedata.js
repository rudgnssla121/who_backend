var express = require('express');
var router = express.Router();
var mysql_dbc = require('../config/database')();
var connection = mysql_dbc.init();

/* GET home page. */
router.get('/listview', function(req, res, next) {
    var sql = 'SELECT id, DATE_FORMAT(time,\'%y-%m-%d\') AS date, DATE_FORMAT(time,\'%h:%i\') AS time, username, name, content  FROM notice_board';

    //console.log(PASSWORD(password));

    connection.query(sql, function (error, rows, fields) {
        if (error) {
            console.log('query error : ' + error);
        } else {
            //console.log(rows);
            res.send(rows);
        }
    });

});

router.get('/listfind/:index', function(req, res, next) {
    const index = parseInt(req.params.index, 10);
    var sql = 'SELECT DATE_FORMAT(time,\'%y-%m-%d\') AS date, DATE_FORMAT(time,\'%h:%i:%s\') AS time, username, name, content  FROM notice_board';
    //nomconsole.log(index);
    //console.log(PASSWORD(password));

    connection.query(sql, function (error, rows, fields) {
        if (error) {
            console.log('query error : ' + error);
        } else {
            //console.log(rows);
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
    var sql1 = 'ALTER TABLE notice_board AUTO_INCREMENT=1;'
    connection.query(sql1, function(err, rows, fields){
        if(err) {
            console.log(err);
        }
        else{
        }

    });
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

router.post('/listmodify', function (req,res,next){
    var name = req.body.noticecontent.name;
    var content = req.body.noticecontent.content;
    const index = parseInt(req.body.noticecontent.index, 10);
    var params = [name, content, index+1];
    var sql = 'UPDATE notice_board SET name = ?, content = ? WHERE id = ?';
    connection.query(sql,params ,function(err, rows, fields){
        if(err) {
            console.log(err);
        }
        else{
            res.json({
                message: '수정됐습니다!'
            });
        }

    });
});

router.get('/listDelete/:index', function (req,res,next){
    const index = parseInt(req.params.index, 10);

    var sql = 'DELETE from notice_board WHERE id = ?';
    connection.query(sql, index+1,function(err, rows, fields){
        if(err) {
            console.log(err);
        }
        else{
            console.log('삭제됐습니다');
        }

    });
    sql = 'ALTER TABLE notice_board AUTO_INCREMENT=1;'
    connection.query(sql,function(err, rows, fields){
        if(err) {
            console.log(err);
        }
        else{
        }

    });
    sql = 'UPDATE notice_board SET id = id - 1 WHERE id > ? AND id > 1';
    connection.query(sql, index ,function(err, rows, fields){
        if(err) {
            console.log(err);
        }
        else{
        }

    });
});


module.exports = router;
