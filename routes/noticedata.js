var express = require('express');
var router = express.Router();
var noticeData = require('../data/noticedata.json');

/* GET home page. */
router.get('/listview', function(req, res, next) {
    res.send(noticeData);
});

router.get('/listfind/:index', function(req, res, next) {
    const index = parseInt(req.params.index, 10);
    console.log(index);
    res.send(noticeData[index]);
});


module.exports = router;
