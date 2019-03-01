var express = require('express');
var router = express.Router();
var db = require('../config/db');
var responseInfo = require('../config/ResponseInfo');

var responseCode = responseInfo.responseCode;
var responseMsg = responseInfo.responseMsg;

router.get('/', function (req, res,next) {
    res.render('resource/resourceType', { title: 'get123' });
})
router.get('/getResourcesType',function (req,res,next) {
    var page=req.query.page;
    var limit=req.query.limit;
    var sql_getList = 'SELECT * from type_resources where flag = 1 limit '+(page-1)*limit+','+limit+'';
    var sql_getCount = 'SELECT count(*) as count from type_resources where flag = 1';
    db.query(sql_getCount, function (err, rows, fields) {
        if (err) {
            return;
        }
        db.query(sql_getList,function (list_err,result) {
            if (list_err) {
                return;
            }
            res.send({
                code:responseCode.TABLE_DATA,
                data:result,
                count:rows[0].count,
                message:responseMsg.SUCCESS_LIST
            });
        })
    })
})

router.get('/add', function (req, res,next) {
    res.render('resource/addType', { title: 'tianjia' });
})
router.post("/saveOrUpdateType",function (req,res) {
    var typeName = req.body.typeName;
    var sql_addType='insert into type_resources (typeId,typeName) values ("","'+typeName+'")';

    db.query(sql_addType,function (err,rows) {
        if(err){
            console.log(err);
            return;
        }
        res.send({
            code:1,
            data:rows,
            message:"添加成功！"
        })
    })

})

module.exports = router;