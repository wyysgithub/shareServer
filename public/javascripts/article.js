app.controller("articleController", function ($scope, httpService) {

    $scope.articleInfo = {
        name: '',
        content: '',
        author: '',
        status: 5,
        typeId: '',
        articleId:0
    };
    $scope.getArticleTypeList = function () {
        $scope.articleTypeList = []
        httpService.getList({
            limit: 100,
            page: 1
        }, "/articleType/list").then(function (res) {
            $scope.articleTypeList = res.data.data;
        })
    }
    $scope.getArticleTypeList();
    layui.use(['laypage', 'layer', 'form'], function () {
        var laypage = layui.laypage;
        var layer = layui.layer;
        var form = layui.form;
        // var $ = layui.$;
        // $("dl.layui-nav-child a:contains('文章列表')").parent('dd').addClass("layui-this").parent('dl').parent("li").addClass('layui-nav-itemed');

        var count;
        $scope.getArticleList = function (page, limit) {
            $scope.page = page || 1;
            $scope.limit = limit || 10;

            httpService.getList({
                limit: limit || 10,
                page: page || 1
            }, "/article/list").then(function (res) {
                $scope.articleList = res.data.data;
                count = res.data.count || 50;
                laypage.render({
                    elem: 'paging'
                    , count: count || 50
                    , curr: page
                    , limit: limit
                    , layout: ['refresh', 'count', 'prev', 'page', 'next', 'limit', 'skip']
                    , jump: function (obj, first) {
                        if (!first) {
                            $scope.getArticleList(obj.curr, obj.limit)
                        }
                        // console.log(obj)
                        // console.log(first)
                        // this.count = 3
                        // $scope.getArticleList(obj.curr)
                    }
                });
            })
        }
        $scope.getArticleList(1, 10);

        $scope.saveArticle = function () {
            var jsonStr = $scope.articleInfo;
            httpService.postJson(jsonStr, "/article/save").then(function (res) {
                if (res.data.code === 1) {
                    layer.msg("添加成功！", {icon: 1, time: 800});
                    history.back();
                } else {
                    layer.msg(res.data.message, {icon: 2})
                }
            })
        };
        $scope.updateArticle = function () {
            var jsonStr = $scope.articleInfo;
            httpService.postJson(jsonStr, "/article/update").then(function (res) {
                if (res.data.code === 1) {
                    layer.msg("修改成功！", {icon: 1, time: 800});
                    history.back();
                } else {
                    layer.msg(res.data.message, {icon: 2})
                }
            })
        };
        $scope.getArticleDetail = function () {


        }

        // select框变化
        form.on('select(articleType)', function (data) {
            $scope.articleInfo.typeId = Number(data.value);
        })


    });
});

