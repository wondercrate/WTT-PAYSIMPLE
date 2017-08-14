(function() {
angular.module('wtt-paysimple', ['credit-cards']);
angular.module('wtt-paysimple');
angular.module('wtt-paysimple').controller('mainController', ['$scope', '$http','$location', function($scope, $http, $location) {
    $scope.expirationMonth = "1";
    $scope.succsesMessage = false;
    $scope.expirationYear ="2017"
    $scope.order = {
      FirstName:"",
      LastName:"",
      amountDue:"",
      Issuer:"",
      ExpirationDate:"",
      CreditCardNumber:"",
      CVV:"",
      BillingAddress: {
          StreetAddress1: "",
          City: "",
          StateCode: "AK",
          ZipCode: "",
          Country: "USA",
      },
    }
    $http.get('/api/me').then(function(res){
      $scope.order.FirstName = res.data.firstName;
      $scope.order.LastName = res.data.lastName;
       $scope.order.amountDue = res.data.amountDue;
    });

    function getIssuer(){
      var type = $scope.orderForm.card_number.$ccEagerType;
      if(type == "Visa") $scope.order.Issuer=12;
      if(type === "MasterCard") $scope.order.Issuer=13;
      if(type === "American Express") $scope.order.Issuer=14;
      if(type === "Diners Club")$scope.order.Issuer=15;
    }
    $scope.submit = function(){
      getIssuer();
      $scope.order.ExpirationDate = $scope.expirationMonth + '/'+ $scope.expirationYear;
      $scope.order.CreditCardNumber = $scope.CreditCardNumber;
      $scope.order.CVV = $scope.CVV;
      $http.post('/api/payment/process-transaction', $scope.order)
      .then(function(res){
        $scope.succseMes = true;
        $scope.failMes = false;
        $scope.succsesMessage = {
          id: res.data.Id,
          description: res.data.description,
          accountId: res.data.AccountId,
          CustomerFirstName: res.data.CustomerFirstName,
          CustomerLastName: res.data.CustomerLastName ,
          CustomerId: res.data.CustomerId,
          PaymentDate: res.data.PaymentDate,
          Status:  res.data.Status,
          TraceNumber: res.data.TraceNumber,
        };
        
      }).catch(function(e){
        $scope.failMes = true;
         $scope.succseMes = false;
        $scope.failMessage = e;
      })
    }

    $scope.changeCountry = function(){
      if($scope.order.BillingAddress.Country === "Canada") $scope.order.BillingAddress.StateCode ="AB";
      if($scope.order.BillingAddress.Country === "USA") $scope.order.BillingAddress.StateCode = "AK";
    }
  }]);
}());