var express = require('express');
var db = require('../config/db');
var router = express.Router();
var responseInfo = require('../config/ResponseInfo');

var responseCode = responseInfo.responseCode;
var responseMsg = responseInfo.responseMsg;

router.get('/', function (req, res, next) {
    res.render('./article/articleType.jade', { title: '文章分类' });
})

router.get('/list',function (req , res , next) {
    var page=req.query.page;
    var limit=req.query.limit;
    var sql_getCount = 'SELECT count(*) as count from article_type where flag = 1';
    var sql_getList = 'SELECT * from article_type WHERE flag = 1 limit ' + (page-1)*limit+','+limit;

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

router.post("/saveOrUpdate",function (req , res) {
    var typeName = req.body.typeName || '';
    var optType = req.body.optType || 1;
    var status = req.body.status || 1;
    var typeId = req.body.typeId || 0;

    var setTypeName = "";

    if(req.body.typeName){
        setTypeName = ",type_name = '" + typeName + "'"
    }

    var sql_save = "insert into article_type (type_name,status) values " +
        "('" + typeName + "'," + status + ")";

    var sql_update_status = "update article_type set status =" + status + setTypeName + " where type_id = " + typeId;


    if(optType ===1){
        db.query(sql_save, function (err, result, filed) {
            if (err) {
                res.send({
                    code: responseCode.FAILED,
                    data: [],
                    message: req
                })
                return;
            }
            res.send({
                code: responseCode.SUCCESS,
                data: result,
                message: responseMsg.SUCCESS_SAVE
            })

        })
    }else {
        db.query(sql_update_status, function (err, result, filed) {
            if (err) {
                res.send({
                    code: responseCode.FAILED,
                    data: [],
                    message: err
                })
                return;
            }
            res.send({
                code: responseCode.SUCCESS,
                data: result,
                message: responseMsg.SUCCESS_SAVE
            })

        })
    }


})

module.exports = router;