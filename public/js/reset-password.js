(function() {
angular.module('wtt-paysimple', []);
angular.module('wtt-paysimple');
angular.module('wtt-paysimple').controller('mainController', ['$scope', '$http', function($scope, $http) {
    console.log("hello from pass.js");

    $scope.succsessMes = false;
    $scope.failMes = false;
    $scope.resetPassword = function(){
        var paramsObject = {};
        window.location.search.replace(/\?/,'').split('&').map(function(o){ paramsObject[o.split('=')[0]]= o.split('=')[1]});
        var postObj ={
            newpw: $scope.password,
            token: paramsObject.token,
            email: paramsObject.email
        }
        console.log(postObj);
        $http.post('/api/user/reset-password', postObj).then(function(res){
            if(res.status === 200) $scope.succsessMes  = true;
            else $scope.failMes = true;
        })
        }
  	}]);
}());
