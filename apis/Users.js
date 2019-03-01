var express = require('express');
var router = express.Router();
var moment = require('moment');
var db = require('../config/db');
var responseInfo = require('../config/ResponseInfo');
var Constant = require('../config/Constant').Constant;

var responseCode = responseInfo.responseCode;
var responseMsg = responseInfo.responseMsg;

router.get('/', function (req, res) {
    res.render('users/users.ejs', {title: '用户添加'})
})

router.get('/list', function (req, res, next) {
    var query = req.query;
    var sql_count = "select count(*) from user_login where flag = 1";
    var sql_list = 'select * from user_login where flag = 1  limit ' + (query.page - 1) * query.limit + ',' + query.limit + '';

    db.query(sql_count, function (err, rows, fields) {
        if (err) {
            return;
        }
        db.query(sql_list, function (list_err, result) {
            if (list_err) {
                return;
            }
            // 遍历中文状态
            result.forEach(function (data, index) {
                data.statusZh = Constant.userStatus[data.status];
                /**
                 * 获取long型时间戳
                 * 使用moment转换成字符串类型的数据
                 * @type {number}
                 */
                data.createTime_Long = data.createTime.getTime();
                data.createTime_String = moment(data.createTime).format('YYYY-MM-DD HH:mm:ss')
            })
            res.send({
                code: responseCode.TABLE_DATA,
                data: result,
                count: rows[0].count,
                message: responseMsg.SUCCESS_LIST
            });
        })
    })
})

router.post('/save', function (req, res) {

    var reqBody = req.body;
    var nickName = req.body.nickName || '';

    var sql_save = "insert into user_login (username,nickName,password) values " +
        "('" + reqBody.username + "','" + nickName + "',password('" + reqBody.password + "'))"

    db.query(sql_save, function (err, result, filed) {
        if (err) {
            console.log(err);
            return;
        }
        res.send({
            code: responseCode.SUCCESS,
            data: result,
            message: responseMsg.SUCCESS_SAVE
        })

    })

})

router.post('/update', function (req, res) {
    var reqBody = req.body;

    var sql_update = "update user_login set status =" + reqBody.status + " where userId = " + reqBody.userId + " "

    db.query(sql_update, function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
        res.send({
            code: responseCode.SUCCESS,
            data: result,
            message: responseMsg.SUCCESS_DONE
        })
    })
})
module.exports = router;