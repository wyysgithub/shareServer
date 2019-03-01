
app.controller("articleController",function ($scope,httpService) {
    layui.use(['laypage','form','layer'], function(){
        var laypage = layui.laypage;
        var form = layui.form;
        var count;
        $scope.getArticleTypeList = function (page,limit) {
            $scope.page = page || 1;
            $scope.limit = limit || 10;

            httpService.getList({
                limit:limit||10,
                page:page||1
            },"/articleType/list").then(function (res) {
                $scope.articleTypeList = res.data.data;
                count = res.data.count;
                laypage.render({
                    elem: 'paging'
                    ,count: count|| 50
                    ,curr:page
                    ,limit:limit
                    ,layout:['refresh','count','prev', 'page', 'next','limit','skip']
                    ,jump:function (obj,first) {
                        if(!first){
                            $scope.getArticleTypeList(obj.curr,obj.limit);
                        }
                        // console.log(obj)
                        // console.log(first)
                        // this.count = 3
                        // $scope.getArticleList(obj.curr)
                    }
                });
            })
        }
        $scope.getArticleTypeList(1,10);


        $scope.addArticleType = function (typeName) {
            httpService.postJson({
                optType:1,
                typeName:typeName,
                status:5,
                typeId:0
            },"/articleType/saveOrUpdate").then(function (res) {
                console.log(res)
                if(res.data.code===1){
                    layer.msg("保存成功！",{icon:1,time:800})
                    $scope.getArticleTypeList($scope.page)
                }else {
                    layer.msg(res.data.message,{icon:2})
                }
            })
        }

        $scope.updateArticleType = function (typeId,status,typeName) {
            httpService.postJson({
                optType:2,
                typeName:typeName||'',
                status:status,
                typeId:typeId||0
            },"/articleType/saveOrUpdate").then(function (res) {
                console.log(res)
                if(res.data.code===1){
                    layer.msg("操作成功！",{icon:1,time:800})
                    $scope.getArticleTypeList($scope.page)
                }else {
                    layer.msg(res.data.message,{icon:2})
                }
            })
        }

    });
});

