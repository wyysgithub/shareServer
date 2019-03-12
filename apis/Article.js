var express = require('express');
var db = require('../config/db');
var router = express.Router();
var responseInfo = require('../config/ResponseInfo');

var responseCode = responseInfo.responseCode;
var responseMsg = responseInfo.responseMsg;

router.get('/', function (req, res, next) {
    res.render('./article/article.jade', {title: '文章列表'});
});
router.get('/articleAdd', function (req, res, next) {
    res.render('./article/articleAdd.jade', {title: '文章添加'});
});

router.get('/list', function (req, res, next) {
    var page = req.query.page;
    var limit = req.query.limit;
    var sql_getCount = 'SELECT count(*) as count from article where flag = 1';
    var sql_getList = 'SELECT * from (SELECT * from article WHERE flag = 1 limit ' + (page - 1) * limit + ',' + limit + ') A left join article_type B on A.type_id = B.type_id '

    db.query(sql_getCount, function (err, rows, fields) {
        if (err) {
            return;
        }
        db.query(sql_getList, function (list_err, result) {
            if (list_err) {
                res.send({
                    code: responseCode.FAILED,
                    message: "sql 错误：" + sql_getList
                });
                return;
            }
            res.send({
                code: responseCode.SUCCESS,
                data: result,
                count: rows[0].count,
                message: responseMsg.SUCCESS_LIST
            });
        })
    })
})

router.post('/save', function (req, res) {
    var jsonStr = req.body;
    var sql_save = "insert into article (article_name,article_content,author,status,type_id) values " +
        "('" + jsonStr.name + "','" + jsonStr.content + "','" + jsonStr.author + "'," + jsonStr.status + "," + jsonStr.typeId + ")";

    db.query(sql_save, function (list_err, result) {
        if (list_err) {
            res.send({
                code: responseCode.FAILED,
                message: "sql 错误：" + sql_save
            });
            return;
        }
        res.send({
            code: responseCode.SUCCESS,
            data: result,
            message: "操作成功！"
        });
    })
})

router.post('/update', function (req, res) {
    var jsonStr = req.body;
    var setName = '';
    var setAuthor = '';
    var setContent = '';
    var setTypeId = '';
    if (jsonStr.name) {
        setName = ",article_name = '" + jsonStr.name + "'"
    }
    if (jsonStr.author) {
        setAuthor = ",author = '" + jsonStr.author + "'"
    }
    if (jsonStr.content) {
        setContent = ",article_content = '" + jsonStr.content + "'"
    }
    if (jsonStr.typeId) {
        setTypeId = ",type_id = '" + jsonStr.typeId + "'"
    }

    var sql_update = "update article set status =" + jsonStr.status + setName + setAuthor + setContent + setTypeId + " where article_id = " + jsonStr.articleId;

    db.query(sql_update,function (err,result) {
        if(err){
            res.send({
                code: responseCode.FAILED,
                message: "sql 错误：" + sql_update
            });
            return;
        }
        res.send({
            code: responseCode.SUCCESS,
            data: result,
            message: "操作成功！"
        });
    })
})

module.exports = router;