layui.use(['element','jquery'], function () {
    var element = layui.element;
    var $=layui.$;
    var active={
        tabAdd:function(url,id,name){
            element.tabAdd('contentnav',{
                title:name,
                content:'<iframe data-frameid="'+id+'" scrolling="auto" frameborder="0" src="'+url+'" style="width:100%; height:99%"></iframe>',
                id:id
            });
            iframeWH();
        },
        tabChange:function(id){
            element.tabChange('contentnav',id);
        },
        tabDelete:function(id){
            element.tabDelete('contentnav',id);
        },
        tabDeleteAll:function(ids){
            $.each(ids,function(index,item){
                element.tabDelete('contentnav',item);
            });
        }
    };
    $(".site-url").on('click',function(){
        var nav=$(this);
        var length = $("ul.layui-tab-title li").length;
        if(length<=0){
            active.tabAdd(nav.attr("data-url"),nav.attr("data-id"),nav.attr("data-title"));
        }else{
            var isData=false;
            $.each($("ul.layui-tab-title li"),function(){
                if($(this).attr("lay-id")==nav.attr("data-id")){
                    isData=true;
                }
            });
            if(isData==false){
                active.tabAdd(nav.attr("data-url"),nav.attr("data-id"),nav.attr("data-title"));
            }
            active.tabChange(nav.attr("data-id"));
        }
    });

    function iframeWH(){
        var H = $(window).height()-80;
        $("iframe").css("height",H+"px");
    }
    $(window).resize(function(){
        iframeWH();
    });
});
var app = angular.module('app', []);
var basePath = "http://localhost:3000";

//自定义http服务
app.service('httpService', function ($http, $q) {
    this.getData = function (url) {
        var d = $q.defer();
        $http({
            method: 'GET',
            url: basePath + url
        }).then(function successCallback(response) {
            d.resolve(response);
        }, function errorCallback(response) {
            d.reject("error");
        });
        return d.promise;
    };
    this.getList = function (data, url) {
        var d = $q.defer();
        $http({
            method: 'GET',
            url: basePath + url,
            params: data
        }).then(function successCallback(response) {
            d.resolve(response);
        }, function errorCallback(response) {
            d.reject("error");
        });
        return d.promise;
    };
    this.postList = function (data, url) {
        var d = $q.defer();
        $http({
            method: 'POST',
            url: basePath + url,
            data: data,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            transformRequest: function (obj) {
                var str = [];
                for (var p in obj) {
                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                }
                return str.join("&");
            }
        }).then(function successCallback(response) {
            if (response.data && response.data instanceof String && response.data.indexOf("<script") === 0) { // 针对session失效
                window.location.href = '/login';
            } else {
                d.resolve(response);
            }
        }, function errorCallback(response) {
            d.reject("error");
        });
        return d.promise;
    };
    this.postJson = function (data, url) {
        var d = $q.defer();
        $http({
            method: 'POST',
            url: basePath + url,
            data: angular.toJson(data),
            headers: {'Content-Type':'application/json;charset=UTF-8'},
        }).then(function successCallback(response) {
            if (response.data && response.data instanceof String && response.data.indexOf("<script") === 0) { // 针对session失效
                window.location.href = '/login';
            } else {
                d.resolve(response);
            }
        }, function errorCallback(response) {
            d.reject("error");
        });
        return d.promise;
    };
})

app.controller('mainController', function ($scope) {
    $scope.MainStatus = {
        1: "草稿",
        2: "待审核",
        3: "待上架",
        4: "已驳回",
        5: "已上架",
        6: "已下架"
    };
    $scope.replaceTo = function (url) {
        location.href = basePath + url;
    }
})
