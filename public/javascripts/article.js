
app.controller("articleController",function ($scope,httpService) {
    layui.use(['laypage','jquery'], function(){
        var laypage = layui.laypage;
        var $ = layui.$;
        $("dl.layui-nav-child a:contains('文章列表')").parent('dd').addClass("layui-this").parent('dl').parent("li").addClass('layui-nav-itemed');

        var count;
        $scope.getArticleList = function (page,limit) {
            $scope.page = page || 1;
            $scope.limit = limit || 10;

            httpService.getList({
                limit:limit || 10,
                page:page||1
            },"/article/list").then(function (res) {
                $scope.articleList = res.data.data;
                count = res.data.count || 50;
                laypage.render({
                    elem: 'paging'
                    ,count: count|| 50
                    ,curr:page
                    ,limit:limit
                    ,layout:['refresh','count','prev', 'page', 'next','limit','skip']
                    ,jump:function (obj,first) {
                        if(!first){
                            $scope.getArticleList(obj.curr,obj.limit)
                        }
                        // console.log(obj)
                        // console.log(first)
                        // this.count = 3
                        // $scope.getArticleList(obj.curr)
                    }
                });
            })
        }
        $scope.getArticleList(1,10)


    });
});

