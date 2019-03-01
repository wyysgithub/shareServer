var express = require('express');
var db = require('../config/db');
var router = express.Router();
var responseInfo = require('../config/ResponseInfo');

var responseCode = responseInfo.responseCode;
var responseMsg = responseInfo.responseMsg;

router.get('/', function (req, res, next) {
    res.render('./article/article.jade', { title: '文章列表' });
})

router.get('/list',function (req , res , next) {
    var page=req.query.page;
    var limit=req.query.limit;
    var sql_getCount = 'SELECT count(*) as count from article where flag = 1';
    var sql_getList = 'SELECT * from (SELECT * from article WHERE flag = 1 limit ' + (page-1)*limit+','+limit+') A left join article_type B on A.type_id = B.type_id '

    db.query(sql_getCount, function (err, rows, fields) {
        if (err) {
            return;
        }
        db.query(sql_getList,function (list_err,result) {
            if (list_err) {
                res.send({
                    code:responseCode.FAILED,
                    message:"sql 错误："+sql_getList
                });
                return;
            }
            res.send({
                code:responseCode.SUCCESS,
                data:result,
                count:rows[0].count,
                message:responseMsg.SUCCESS_LIST
            });
        })
    })
})

module.exports = router;