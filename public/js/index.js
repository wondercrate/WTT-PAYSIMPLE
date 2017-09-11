(function() {
angular.module('wtt-paysimple', ['ngRoute']);
angular.module('wtt-paysimple');
angular.module('wtt-paysimple').controller('mainController', ['$scope', '$http','$sce','$window', function($scope, $http,$sce, $window) {
    //console.log("hello from index.js");
	$scope.order = {
		FirstName: "",
		LastName: "",
		amountDue: "",
		Issuer: "",
		ExpirationDate: "",
		CreditCardNumber: "",
		CVV: "",
		BillingAddress: {
			StreetAddress1: "",
			City: "",
			StateCode: "AK",
			ZipCode: "",
			Country: "USA",
		},
	}
    	$scope.traveler = {};
    	$scope.user = {};
		$scope.programs = {};
		$scope.destination = {};
		//$scope.paymentForUrl =  $sce.trustAsResourceUrl("https://sandbox-payments.paysimple.com/buyer/checkoutformpay/7NNi8W85qISUCY-RGVPUjNRTr-g-");
		$scope.isUSA = function() {
			return $scope.traveler.Home_Country !== "United States" && $scope.traveler.Home_Country !== undefined;
		}
		$scope.isReferral = function() {
			return $scope.traveler.How_did_you_hear_of_WTT_SA == "Referral" && $scope.traveler.How_did_you_hear_of_WTT_SA !== undefined;
		}
		$scope.programTypeSelected = function() {
			return $scope.traveler.Program_Type !== undefined;
		}
		$scope.destinationSelected = function() {
			return $scope.destination.selected !== undefined;
		}
		$scope.isCustom = function() {
			return $scope.traveler.Program_Type == "Custom Enrollment";
		}
		$scope.isCustoml = function() {
			return $scope.traveler.Program_Type !== "Custom Enrollment" && $scope.traveler.Program_Type !== undefined;
		} 
		$scope.belize = function() {
			return $scope.destination.selected !== "Canada" && $scope.destination.selected !== "China" && $scope.destination.selected !== "Costa Rica" && $scope.destination.selected !== "France" && $scope.destination.selected !== "Guatemala" && $scope.destination.selected !== "Peru" && $scope.destination.selected !== "Senegal" && $scope.destination.selected !== "Spain" && $scope.destination.selected !== "Spain to Morocco" && $scope.destination.selected !== "Thailand" && $scope.destination.selected !== "Italy" && $scope.destination.selected !== "Ecuador" && $scope.destination.selected !== "Panama" && $scope.destination.selected !== "South Africa" && $scope.destination.selected !== "Cuba" && $scope.destination.selected !== "USA" && $scope.destination.selected !== "Bhutan" && $scope.destination.selected !== "Australia" && $scope.destination.selected !== "Japan" ;
		};
		$scope.canada = function() {
			return $scope.destination.selected !== "Belize" && $scope.destination.selected !== "China" && $scope.destination.selected !== "Costa Rica" && $scope.destination.selected !== "France" && $scope.destination.selected !== "Guatemala" && $scope.destination.selected !== "Peru" && $scope.destination.selected !== "Senegal" && $scope.destination.selected !== "Spain" && $scope.destination.selected !== "Spain to Morocco" && $scope.destination.selected !== "Thailand" && $scope.destination.selected !== "Italy" && $scope.destination.selected !== "Ecuador" && $scope.destination.selected !== "Panama" && $scope.destination.selected !== "South Africa" && $scope.destination.selected !== "Cuba" && $scope.destination.selected !== "USA" && $scope.destination.selected !== "Bhutan" && $scope.destination.selected !== "Australia" && $scope.destination.selected !== "Japan" ;
		};
		$scope.china = function() {
			return $scope.destination.selected !== "Belize" && $scope.destination.selected !== "Canada" && $scope.destination.selected !== "Costa Rica" && $scope.destination.selected !== "France" && $scope.destination.selected !== "Guatemala" && $scope.destination.selected !== "Peru" && $scope.destination.selected !== "Senegal" && $scope.destination.selected !== "Spain" && $scope.destination.selected !== "Spain to Morocco" && $scope.destination.selected !== "Thailand" && $scope.destination.selected !== "Italy" && $scope.destination.selected !== "Ecuador" && $scope.destination.selected !== "Panama" && $scope.destination.selected !== "South Africa" && $scope.destination.selected !== "Cuba" && $scope.destination.selected !== "USA" && $scope.destination.selected !== "Bhutan" && $scope.destination.selected !== "Australia" && $scope.destination.selected !== "Japan" ;
		};
		$scope.costaRica = function() {
			return $scope.destination.selected !== "Belize" && $scope.destination.selected !== "Canada" && $scope.destination.selected !== "China" && $scope.destination.selected !== "France" && $scope.destination.selected !== "Guatemala" && $scope.destination.selected !== "Peru" && $scope.destination.selected !== "Senegal" && $scope.destination.selected !== "Spain" && $scope.destination.selected !== "Spain to Morocco" && $scope.destination.selected !== "Thailand" && $scope.destination.selected !== "Italy" && $scope.destination.selected !== "Ecuador" && $scope.destination.selected !== "Panama" && $scope.destination.selected !== "South Africa" && $scope.destination.selected !== "Cuba" && $scope.destination.selected !== "USA" && $scope.destination.selected !== "Bhutan" && $scope.destination.selected !== "Australia" && $scope.destination.selected !== "Japan" ;
		};
		$scope.france = function() {
			return $scope.destination.selected !== "Belize" && $scope.destination.selected !== "Canada" && $scope.destination.selected !== "China" && $scope.destination.selected !== "Costa Rica" && $scope.destination.selected !== "Guatemala" && $scope.destination.selected !== "Peru" && $scope.destination.selected !== "Senegal" && $scope.destination.selected !== "Spain" && $scope.destination.selected !== "Spain to Morocco" && $scope.destination.selected !== "Thailand" && $scope.destination.selected !== "Italy" && $scope.destination.selected !== "Ecuador" && $scope.destination.selected !== "Panama" && $scope.destination.selected !== "South Africa" && $scope.destination.selected !== "Cuba" && $scope.destination.selected !== "USA" && $scope.destination.selected !== "Bhutan" && $scope.destination.selected !== "Australia" && $scope.destination.selected !== "Japan" ;
		};
		$scope.guatemala = function() {
			return $scope.destination.selected !== "Belize" && $scope.destination.selected !== "Canada" && $scope.destination.selected !== "China" && $scope.destination.selected !== "France" && $scope.destination.selected !== "Costa Rica" && $scope.destination.selected !== "Peru" && $scope.destination.selected !== "Senegal" && $scope.destination.selected !== "Spain" && $scope.destination.selected !== "Spain to Morocco" && $scope.destination.selected !== "Thailand" && $scope.destination.selected !== "Italy" && $scope.destination.selected !== "Ecuador" && $scope.destination.selected !== "Panama" && $scope.destination.selected !== "South Africa" && $scope.destination.selected !== "Cuba" && $scope.destination.selected !== "USA" && $scope.destination.selected !== "Bhutan" && $scope.destination.selected !== "Australia" && $scope.destination.selected !== "Japan" ;
		};
		$scope.peru = function() {
			return $scope.destination.selected !== "Belize" && $scope.destination.selected !== "Canada" && $scope.destination.selected !== "China" && $scope.destination.selected !== "France" && $scope.destination.selected !== "Guatemala" && $scope.destination.selected !== "Costa Rica" && $scope.destination.selected !== "Senegal" && $scope.destination.selected !== "Spain" && $scope.destination.selected !== "Spain to Morocco" && $scope.destination.selected !== "Thailand" && $scope.destination.selected !== "Italy" && $scope.destination.selected !== "Ecuador" && $scope.destination.selected !== "Panama" && $scope.destination.selected !== "South Africa" && $scope.destination.selected !== "Cuba" && $scope.destination.selected !== "USA" && $scope.destination.selected !== "Bhutan" && $scope.destination.selected !== "Australia" && $scope.destination.selected !== "Japan" ;
		};
		$scope.senegal = function() {
			return $scope.destination.selected !== "Belize" && $scope.destination.selected !== "Canada" && $scope.destination.selected !== "China" && $scope.destination.selected !== "France" && $scope.destination.selected !== "Guatemala" && $scope.destination.selected !== "Peru" && $scope.destination.selected !== "Costa Rica" && $scope.destination.selected !== "Spain" && $scope.destination.selected !== "Spain to Morocco" && $scope.destination.selected !== "Thailand" && $scope.destination.selected !== "Italy" && $scope.destination.selected !== "Ecuador" && $scope.destination.selected !== "Panama" && $scope.destination.selected !== "South Africa" && $scope.destination.selected !== "Cuba" && $scope.destination.selected !== "USA" && $scope.destination.selected !== "Bhutan" && $scope.destination.selected !== "Australia" && $scope.destination.selected !== "Japan" ;
		};
		$scope.spain = function() {
			return $scope.destination.selected !== "Belize" && $scope.destination.selected !== "Canada" && $scope.destination.selected !== "China" && $scope.destination.selected !== "France" && $scope.destination.selected !== "Guatemala" && $scope.destination.selected !== "Peru" && $scope.destination.selected !== "Senegal" && $scope.destination.selected !== "Costa Rica" && $scope.destination.selected !== "Spain to Morocco" && $scope.destination.selected !== "Thailand" && $scope.destination.selected !== "Italy" && $scope.destination.selected !== "Ecuador" && $scope.destination.selected !== "Panama" && $scope.destination.selected !== "South Africa" && $scope.destination.selected !== "Cuba" && $scope.destination.selected !== "USA" && $scope.destination.selected !== "Bhutan" && $scope.destination.selected !== "Australia" && $scope.destination.selected !== "Japan" ;
		};
		$scope.spainToMorocco = function() {
			return $scope.destination.selected !== "Belize" && $scope.destination.selected !== "Canada" && $scope.destination.selected !== "China" && $scope.destination.selected !== "France" && $scope.destination.selected !== "Guatemala" && $scope.destination.selected !== "Peru" && $scope.destination.selected !== "Senegal" && $scope.destination.selected !== "Spain" && $scope.destination.selected !== "Costa Rica" && $scope.destination.selected !== "Thailand" && $scope.destination.selected !== "Italy" && $scope.destination.selected !== "Ecuador" && $scope.destination.selected !== "Panama" && $scope.destination.selected !== "South Africa" && $scope.destination.selected !== "Cuba" && $scope.destination.selected !== "USA"&& $scope.destination.selected !== "Bhutan" && $scope.destination.selected !== "Australia" && $scope.destination.selected !== "Japan" ;
		};
		$scope.thailand = function() {
			return $scope.destination.selected !== "Belize" && $scope.destination.selected !== "Canada" && $scope.destination.selected !== "China" && $scope.destination.selected !== "France" && $scope.destination.selected !== "Guatemala" && $scope.destination.selected !== "Peru" && $scope.destination.selected !== "Senegal" && $scope.destination.selected !== "Spain" && $scope.destination.selected !== "Costa Rica" && $scope.destination.selected !== "Spain to Morocco" && $scope.destination.selected !== "Italy" && $scope.destination.selected !== "Ecuador" && $scope.destination.selected !== "Panama" && $scope.destination.selected !== "South Africa" && $scope.destination.selected !== "Cuba" && $scope.destination.selected !== "USA"&& $scope.destination.selected !== "Bhutan" && $scope.destination.selected !== "Australia" && $scope.destination.selected !== "Japan" ;
		};
		$scope.italy = function() {
			return $scope.destination.selected !== "Belize" && $scope.destination.selected !== "Canada" && $scope.destination.selected !== "China" && $scope.destination.selected !== "France" && $scope.destination.selected !== "Guatemala" && $scope.destination.selected !== "Peru" && $scope.destination.selected !== "Senegal" && $scope.destination.selected !== "Spain" && $scope.destination.selected !== "Spain to Morocco" && $scope.destination.selected !== "Thailand" && $scope.destination.selected !== "Costa Rica" && $scope.destination.selected !== "Ecuador" && $scope.destination.selected !== "Panama" && $scope.destination.selected !== "South Africa" && $scope.destination.selected !== "Cuba" && $scope.destination.selected !== "USA" && $scope.destination.selected !== "Bhutan" && $scope.destination.selected !== "Australia" && $scope.destination.selected !== "Japan" ;
		}
		$scope.ecuador = function() {
			return $scope.destination.selected !== "Belize" && $scope.destination.selected !== "Canada" && $scope.destination.selected !== "China" && $scope.destination.selected !== "France" && $scope.destination.selected !== "Guatemala" && $scope.destination.selected !== "Peru" && $scope.destination.selected !== "Senegal" && $scope.destination.selected !== "Spain" && $scope.destination.selected !== "Spain to Morocco" && $scope.destination.selected !== "Thailand" && $scope.destination.selected !== "Italy" && $scope.destination.selected !== "Costa Rica" && $scope.destination.selected !== "Panama" && $scope.destination.selected !== "South Africa" && $scope.destination.selected !== "Cuba" && $scope.destination.selected !== "USA" && $scope.destination.selected !== "Bhutan" && $scope.destination.selected !== "Australia" && $scope.destination.selected !== "Japan" ;
		};
		$scope.panama = function() {
			return $scope.destination.selected !== "Belize" && $scope.destination.selected !== "Canada" && $scope.destination.selected !== "China" && $scope.destination.selected !== "France" && $scope.destination.selected !== "Guatemala" && $scope.destination.selected !== "Peru" && $scope.destination.selected !== "Senegal" && $scope.destination.selected !== "Spain" && $scope.destination.selected !== "Spain to Morocco" && $scope.destination.selected !== "Thailand" && $scope.destination.selected !== "Italy" && $scope.destination.selected !== "Ecuador" && $scope.destination.selected !== "Costa Rica" && $scope.destination.selected !== "South Africa" && $scope.destination.selected !== "Cuba" && $scope.destination.selected !== "USA" && $scope.destination.selected !== "Bhutan" && $scope.destination.selected !== "Australia" && $scope.destination.selected !== "Japan" ;
		};
		$scope.southAfrica = function() {
			return $scope.destination.selected !== "Belize" && $scope.destination.selected !== "Canada" && $scope.destination.selected !== "China" && $scope.destination.selected !== "France" && $scope.destination.selected !== "Guatemala" && $scope.destination.selected !== "Peru" && $scope.destination.selected !== "Senegal" && $scope.destination.selected !== "Spain" && $scope.destination.selected !== "Spain to Morocco" && $scope.destination.selected !== "Thailand" && $scope.destination.selected !== "Italy" && $scope.destination.selected !== "Ecuador" && $scope.destination.selected !== "Panama" && $scope.destination.selected !== "Costa Rica" && $scope.destination.selected !== "Cuba" && $scope.destination.selected !== "USA" && $scope.destination.selected !== "Bhutan" && $scope.destination.selected !== "Australia" && $scope.destination.selected !== "Japan" ;
		};
		$scope.cuba = function() {
			return $scope.destination.selected !== "Belize" && $scope.destination.selected !== "Canada" && $scope.destination.selected !== "China" && $scope.destination.selected !== "France" && $scope.destination.selected !== "Guatemala" && $scope.destination.selected !== "Peru" && $scope.destination.selected !== "Senegal" && $scope.destination.selected !== "Spain" && $scope.destination.selected !== "Spain to Morocco" && $scope.destination.selected !== "Thailand" && $scope.destination.selected !== "Italy" && $scope.destination.selected !== "Ecuador" && $scope.destination.selected !== "Panama" && $scope.destination.selected !== "South Africa" && $scope.destination.selected !== "Costa Rica" && $scope.destination.selected !== "USA" && $scope.destination.selected !== "Bhutan" && $scope.destination.selected !== "Australia" && $scope.destination.selected !== "Japan" ;
		};
		$scope.usa = function() {
			return $scope.destination.selected !== "Belize" && $scope.destination.selected !== "Canada" && $scope.destination.selected !== "China" && $scope.destination.selected !== "France" && $scope.destination.selected !== "Guatemala" && $scope.destination.selected !== "Peru" && $scope.destination.selected !== "Senegal" && $scope.destination.selected !== "Spain" && $scope.destination.selected !== "Spain to Morocco" && $scope.destination.selected !== "Thailand" && $scope.destination.selected !== "Italy" && $scope.destination.selected !== "Ecuador" && $scope.destination.selected !== "Panama" && $scope.destination.selected !== "South Africa" && $scope.destination.selected !== "Cuba" && $scope.destination.selected !== "Costa Rica" && $scope.destination.selected !== "Bhutan" && $scope.destination.selected !== "Australia" && $scope.destination.selected !== "Japan" ;
		};
		$scope.bhutan = function() {
			return $scope.destination.selected !== "Belize" && $scope.destination.selected !== "Canada" && $scope.destination.selected !== "China" && $scope.destination.selected !== "France" && $scope.destination.selected !== "Guatemala" && $scope.destination.selected !== "Peru" && $scope.destination.selected !== "Senegal" && $scope.destination.selected !== "Spain" && $scope.destination.selected !== "Spain to Morocco" && $scope.destination.selected !== "Thailand" && $scope.destination.selected !== "Italy" && $scope.destination.selected !== "Ecuador" && $scope.destination.selected !== "Panama" && $scope.destination.selected !== "South Africa" && $scope.destination.selected !== "Cuba" && $scope.destination.selected !== "USA" && $scope.destination.selected !== "Costa Rica" && $scope.destination.selected !== "Australia" && $scope.destination.selected !== "Japan" ;
		};
		$scope.australia = function() {
			return $scope.destination.selected !== "Belize" && $scope.destination.selected !== "Canada" && $scope.destination.selected !== "China" && $scope.destination.selected !== "France" && $scope.destination.selected !== "Guatemala" && $scope.destination.selected !== "Peru" && $scope.destination.selected !== "Senegal" && $scope.destination.selected !== "Spain" && $scope.destination.selected !== "Spain to Morocco" && $scope.destination.selected !== "Thailand" && $scope.destination.selected !== "Italy" && $scope.destination.selected !== "Ecuador" && $scope.destination.selected !== "Panama" && $scope.destination.selected !== "South Africa" && $scope.destination.selected !== "Cuba" && $scope.destination.selected !== "USA" && $scope.destination.selected !== "Bhutan" && $scope.destination.selected !== "Costa Rica" && $scope.destination.selected !== "Japan" ;
		};
		$scope.japan = function() {
			return $scope.destination.selected !== "Belize" && $scope.destination.selected !== "Canada" && $scope.destination.selected !== "China" && $scope.destination.selected !== "France" && $scope.destination.selected !== "Guatemala" && $scope.destination.selected !== "Peru" && $scope.destination.selected !== "Senegal" && $scope.destination.selected !== "Spain" && $scope.destination.selected !== "Spain to Morocco" && $scope.destination.selected !== "Thailand" && $scope.destination.selected !== "Italy" && $scope.destination.selected !== "Ecuador" && $scope.destination.selected !== "Panama" && $scope.destination.selected !== "South Africa" && $scope.destination.selected !== "Cuba" && $scope.destination.selected !== "USA" && $scope.destination.selected !== "Bhutan" && $scope.destination.selected !== "Australia" && $scope.destination.selected !== "Costa Rica" ;
		};
		var data = {};
		$scope.program = {};
		$scope.japanPrograms = [];
		$scope.australiaPrograms = [];
		$scope.bhutanPrograms = [];
		$scope.usaPrograms = [];
		$scope.cubaPrograms = [];
		$scope.southAfricaPrograms = [];
		$scope.panamaPrograms = [];
		$scope.ecuadorPrograms = [];
		$scope.italyPrograms = [];
		$scope.thailandPrograms = [];
		$scope.spainToMoroccoPrograms = [];
		$scope.spainPrograms = [];
		$scope.senegalPrograms = [];
		$scope.peruPrograms = [];
		$scope.guatemalaPrograms = [];
		$scope.francePrograms = [];
		$scope.costaRicaPrograms = [];
		$scope.chinaPrograms = [];
		$scope.canadaPrograms = [];
		$scope.belizePrograms = [];

		$http.get('/api/programs/getPrograms', data).then(function(response) {
			$scope.program = response.data;
			const japan = function() {
				for(var i = 0; i < $scope.program.length; i++) {
					if($scope.program[i].country == "Japan") {
						$scope.japanPrograms.push($scope.program[i]);
					}
				}
				return $scope.japanPrograms;
			}
			japan();
			const australia = function() {
				for(var i = 0; i < $scope.program.length; i++) {
					if($scope.program[i].country == "Australia") {
						$scope.australiaPrograms.push($scope.program[i]);
					}
				}
				return $scope.australiaPrograms;
			}
			australia();
			const bhutan = function() {
				for(var i = 0; i < $scope.program.length; i++) {
					if($scope.program[i].country == "Bhutan") {
						$scope.bhutanPrograms.push($scope.program[i]);
					}
				}
				return $scope.bhutanPrograms;
			}
			bhutan();
			const usa = function() {
				for(var i = 0; i < $scope.program.length; i++) {
					if($scope.program[i].country == "USA") {
						$scope.usaPrograms.push($scope.program[i]);
					}
				}
				return $scope.usaPrograms;
			}
			usa();
			const cuba = function() {
				for(var i = 0; i < $scope.program.length; i++) {
					if($scope.program[i].country == "Cuba") {
						$scope.cubaPrograms.push($scope.program[i]);
					}
				}
				return $scope.cubaPrograms;
			}
			cuba();
			const southAfrica = function() {
				for(var i = 0; i < $scope.program.length; i++) {
					if($scope.program[i].country == "South Africa") {
						$scope.southAfricaPrograms.push($scope.program[i]);
					}
				}
				return $scope.southAfricaPrograms;
			}
			southAfrica();
			const panama = function() {
				for(var i = 0; i < $scope.program.length; i++) {
					if($scope.program[i].country == "Panama") {
						$scope.panamaPrograms.push($scope.program[i]);
					}
				}
				return $scope.panamaPrograms;
			}
			panama();
			const ecuador = function() {
				for(var i = 0; i < $scope.program.length; i++) {
					if($scope.program[i].country == "Ecuador") {
						$scope.ecuadorPrograms.push($scope.program[i]);
					}
				}
				return $scope.ecuadorPrograms;
			}
			ecuador();
			const italy = function() {
				for(var i = 0; i < $scope.program.length; i++) {
					if($scope.program[i].country == "Italy") {
						$scope.italyPrograms.push($scope.program[i]);
					}
				}
				return $scope.italyPrograms;
			}
			italy();
			const thailand = function() {
				for(var i = 0; i < $scope.program.length; i++) {
					if($scope.program[i].country == "Thailand") {
						$scope.thailandPrograms.push($scope.program[i]);
					}
				}
				return $scope.thailandPrograms;
			}
			thailand();
			const spainToMorocco = function() {
				for(var i = 0; i < $scope.program.length; i++) {
					if($scope.program[i].country == "Spain To Morocco") {
						$scope.spainToMoroccoPrograms.push($scope.program[i]);
					}
				}
				return $scope.spainToMoroccoPrograms;
			}
			spainToMorocco();
			const spain = function() {
				for(var i = 0; i < $scope.program.length; i++) {
					if($scope.program[i].country == "Spain") {
						$scope.spainPrograms.push($scope.program[i]);
					}
				}
				return $scope.spainPrograms;
			}
			spain();
			const sengal = function() {
				for(var i = 0; i < $scope.program.length; i++) {
					if($scope.program[i].country == "Senegal") {
						$scope.senegalPrograms.push($scope.program[i]);
					}
				}
				return $scope.senegalPrograms;
			}
			sengal();
			const peru = function() {
				for(var i = 0; i < $scope.program.length; i++) {
					if($scope.program[i].country == "Peru") {
						$scope.peruPrograms.push($scope.program[i]);
					}
				}
				return $scope.peruPrograms;
			}
			peru();
			const guatemala = function() {
				for(var i = 0; i < $scope.program.length; i++) {
					if($scope.program[i].country == "Guatemala") {
						$scope.guatemalaPrograms.push($scope.program[i]);
					}
				}
				return $scope.guatemalaPrograms;
			}
			guatemala();
			const france = function() {
				for(var i = 0; i < $scope.program.length; i++) {
					if($scope.program[i].country == "France") {
						$scope.francePrograms.push($scope.program[i]);
					}
				}
				return $scope.francePrograms;
			}
			france();
			const costaRica = function() {
				for(var i = 0; i < $scope.program.length; i++) {
					if($scope.program[i].country == "Costa Rica") {
						$scope.costaRicaPrograms.push($scope.program[i]);
					}
				}
				return $scope.costaRicaPrograms;
			}
			costaRica();
			const china = function() {
				for(var i = 0; i < $scope.program.length; i++) {
					if($scope.program[i].country == "China") {
						$scope.chinaPrograms.push($scope.program[i]);
					}
				}
				return $scope.chinaPrograms;
			}
			china();
			const canada = function() {
				for(var i = 0; i < $scope.program.length; i++) {
					if($scope.program[i].country == "Canada") {
						$scope.canadaPrograms.push($scope.program[i]);
					}
				}
				return $scope.canadaPrograms;
			}
			canada();
			const belize = function() {
				for(var i = 0; i < $scope.program.length; i++) {
					if($scope.program[i].country == "Belize") {
						$scope.belizePrograms.push($scope.program[i]);
					}
				}
				return $scope.belizePrograms;
			}
			belize();
		})
		$scope.allPrograms = [];
		$http.get('/api/programs/getPrograms', data).then(function(response) {
			$scope.allPrograms = response.data;
			console.log($scope.allPrograms);
			$scope.getCost = function() {
				function getTheCost() {
					for(var i = 0; i < $scope.allPrograms.length; i++) {
						if($scope.allPrograms[i].name == $scope.programs.selected) {
							return $scope.allPrograms[i].price;
						};
					};
				};
				$scope.user.cost = getTheCost();
				$scope.order.program = $scope.programs.selected;
				$scope.order.amountDue = $scope.user.cost;
			}
		})
		$scope.isSelected = function() {
			return $scope.programs.selected !== undefined;
		}
		$scope.resetPassword =function (){
			console.log()
		}
		$scope.sendToZoho = function(){
			$scope.traveler.First_Program_Choice = $scope.programs.selected;
			console.log($scope.traveler.Applying_for_Financial_Aid);
			if($scope.traveler.Applying_for_Financial_Aid){
				$scope.traveler.Applying_for_Financial_Aid = "Yes";
			} else {
				$scope.traveler.Applying_for_Financial_Aid = undefined;
			}
			$http.post('/api/zoho', $scope.traveler).then(function(res){
				console.log(res);
			});
		}
		$scope.createTraveler = function() {
			var data = {
				firstName: $scope.traveler.travelerFirstName,
				lastName: $scope.traveler.travelerLastName,
				program: $scope.programs.selected,
				amountDue: $scope.user.cost,
				email: $scope.traveler.travelerPrimaryEmail,
				password: $scope.traveler.password, 
				admin: "no"
			}
			$http.post('/wtt/signup', data).then(function() {

			})
		}
		$scope.order.expirationMonth = "1";
		$scope.succsesMessage = false;
		$scope.order.expirationYear = "2017"
		$scope.testMonth = function(){
		}
		$scope.submit = function () {
			$scope.order.ExpirationDate = $scope.order.expirationMonth + '/' + $scope.order.expirationYear;
			
			$scope.createTraveler();
			$http.post('/api/payment/process-transaction', $scope.order)
				.then(function (res) {
					$scope.succseMes = true;
					$scope.failMes = false;
					$scope.succsesMessage = {
						id: res.data.Id,
						Description: res.data.Description,
						accountId: res.data.AccountId,
						CustomerFirstName: res.data.CustomerFirstName,
						CustomerLastName: res.data.CustomerLastName,
						CustomerId: res.data.CustomerId,
						PaymentDate: res.data.PaymentDate,
						Status: res.data.Status,
						TraceNumber: res.data.TraceNumber,
					};
				}).catch(function (e) {
					$scope.failMes = true;
					$scope.succseMes = false;
					$scope.failMessage = e.data;
				})
		};
		$scope.changeCountry = function () {
			if ($scope.order.BillingAddress.Country === "Canada") $scope.order.BillingAddress.StateCode = "AB";
			if ($scope.order.BillingAddress.Country === "USA") $scope.order.BillingAddress.StateCode = "AK";
		}

		
  	}]);

angular.module('wtt-paysimple') 
	.controller('formController', ['$scope', '$http', function ($scope, $http) {

		$(document).ready(function() {
		var $backToTop = $(".back-to-top");
		$backToTop.on("click", function(e) {
		  $("html, body").animate({ scrollTop: 400 }, 1000);
		});
		  var current_fs, next_fs, previous_fs; 
		  var left, opacity, scale; 
		  var animating; 
		  $(".next").click(function() {
		    if (animating) return false;
		    animating = true;
		    current_fs = $(this).parent();
		    next_fs = $(this).parent().next();
		    $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");
		    next_fs.show();
		    current_fs.animate(
		      { opacity: 0 },
		      {
		        step: function(now, mx) {
		          scale = 1 - (1 - now) * 0.2;
		          left = now * 50 + "%";
		          opacity = 1 - now;
		          current_fs.css({
		            transform: "scale(" + scale + ")",
		            position: "absolute"
		          });
		          next_fs.css({ left: left, opacity: opacity });
		        },
		        duration: 800,
		        complete: function() {
		          current_fs.hide();
		          animating = false;
		        },
		        easing: "easeInOutBack"
		      }
		    );
		  });
		  $(".previous").click(function() {
		    if (animating) return false;
		    animating = true;
		    current_fs = $(this).parent();
		    previous_fs = $(this).parent().prev();
		    $("#progressbar li")
		      .eq($("fieldset").index(current_fs))
		      .removeClass("active");
		    previous_fs.show();
		    current_fs.animate(
		      { opacity: 0 },
		      {
		        step: function(now, mx) {
		          scale = 0.8 + (1 - now) * 0.2;
		          left = (1 - now) * 50 + "%";
		          opacity = 1 - now;
		          current_fs.css({ left: left });
		          previous_fs.css({
		            transform: "scale(" + scale + ")",
		            opacity: opacity,
		          });
		        },
		        duration: 800,
		        complete: function() {
		          current_fs.hide();
		          animating = false;
		          //previous_fs.css({
		          //  position: "relative"
		          //});
		        },
		        easing: "easeInOutBack"
		      }
			);
		  });
		  $(".submit").click(function() {
			  return false;
		  }); 
		}())	
	}]);
angular.module('wtt-paysimple')
.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
		$routeProvider
		.when('/', {
			templateUrl: '/html/home.html', 
		})
		.when('/home', {
			templateUrl: '/html/home.html', 
		})
		.when('/enroll', {
			templateUrl: '/html/enroll.html',
			controller: 'formController'
		}).when('/form/enroll', {
			templateUrl:'/html/enroll-form.html',
			controller: 'formController',
			resolve : {
				header: function(){
					$("header").hide();				
					return true;				
			}}
		})
		$locationProvider
		.html5Mode(false)
		.hashPrefix('');	
	}]);
}());

















