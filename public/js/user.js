(function() {
angular.module('wtt-paysimple', ['credit-cards']);
angular.module('wtt-paysimple');
angular.module('wtt-paysimple').controller('mainController', ['$scope', '$http','$location', function($scope, $http, $location) {
    $http.get('/api/me').then(function(response) {
      $scope.user = response.data;
      $scope.isAdmin = function() {
        return $scope.user.admin == "yes";
      }
    })
    $scope.programsArray = [];
      const getPrograms = function() {
        const data = {};
        $http.get('/api/programs/getPrograms', data).then(function(response) {
          $scope.programsArray = response.data;
        })
      }
      getPrograms();
      const clearForm = function() {
        $scope.program.name = "";
        $scope.program.duration = "";
        $scope.program.country = "";
        $scope.program.price = "";
      }
      $scope.addProgram = function(program) {
        $scope.program = program;
        var data = {
          name: $scope.program.name,
          country: $scope.program.country,
          duration: $scope.program.duration,
          price: $scope.program.price,
          type: $scope.program.type
        };
        $http.post('/api/programs/addProgram', data).then(function(response){
          $scope.program = response.data;
          $scope.programsArray.push($scope.program);
          getPrograms();
          clearForm();
        });
      };
      $scope.pushProgram = function(program) {
        $scope.singleProgramArray = [];
        $scope.program = program;
        $scope.singleProgramArray.push(program);
      };
      $scope.deleteProgram = function(id) {
        $http.delete('/api/programs/deleteProgram/' + id).then(function(response) {
          getPrograms();
          clearForm();
        })
      };
      $scope.updateProgram = function() {
        const data = {
          programId: $scope.program._id,
          name: $scope.program.name,
          country: $scope.program.country,
          duration: $scope.program.duration,
          price: $scope.program.price,
          type: $scope.program.type
        };
        $http.post('/api/programs/updateProgram', data).then(function(){
          getPrograms();
          clearForm();
        });
      };
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
          Description: res.data.Description,
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
        $scope.failMessage = e.data;
      })
    }

    $scope.changeCountry = function(){
      if($scope.order.BillingAddress.Country === "Canada") $scope.order.BillingAddress.StateCode ="AB";
      if($scope.order.BillingAddress.Country === "USA") $scope.order.BillingAddress.StateCode = "AK";
    }
  }]);
}());