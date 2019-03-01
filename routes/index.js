/**
 * 总的路由控制文件
 *
 * 进行统一的路由分发，这样防止app.js中代码过于臃肿
 *
 * 注： 在对应的加载文件里写 module.exports = router; 否则会报以下错误：
 *
 *  throw new TypeError('Router.use() requires a middleware function but got a ' + gettype(fn))
 *
 * @type {*|createApplication}
 */

var express = require('express');
var router = express.Router();

module.exports = function (app) {

    var home = require('../apis/ArticleType');
    app.use('/', home);

    var usersRouter = require('../routes/users');
    app.use('/users', usersRouter);


    var article = require('../apis/Article');
    app.use('/article',article);

    var articleType = require('../apis/ArticleType');
    app.use('/articleType',articleType);

};
