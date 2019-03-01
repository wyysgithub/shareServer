layui.use('element', function () {
    var element = layui.element;
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
    }
})
