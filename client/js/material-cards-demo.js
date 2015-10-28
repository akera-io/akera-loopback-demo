angular.module('material-cards', ['ngRoute', 'lbServices'])
.controller('CardsCtrl', ['$scope', 'Customer', function($scope, Customer) {
    Customer.find(null).$promise.then(function(res) {
        $scope.customers = res;
    });

    $scope.selectCustomer = function(cust) {
        $scope.selectedCustomer = cust;
    }
}])
