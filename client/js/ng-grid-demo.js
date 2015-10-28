angular.module('NgGrid', ['ngTable', 'ngRoute', 'lbServices', 'ui.bootstrap'])
    .controller('addCustomerDlg', ['$scope', '$modalInstance', function($scope, $modalInstance) {
        $scope.create = function() {
            $modalInstance.close({
                CustNum: $scope.custnum,
                Address: $scope.custaddr,
                Name: $scope.custname,
                SalesRep: $scope.custrep
            });
        };
        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        };
    }])
    .controller('ngGridDemo', ['$scope', 'ngTableParams', 'Customer', '$modal', function($scope, ngTableParams, Customer, $modal) {
        Customer.find({
            limit: 40
        }).$promise.then(function(res) {
            $scope.customers = res;

        });
        $scope.tableParams = new ngTableParams({
            page: 1,
            count: 20
        }, {
            total: $scope.customers ? $scope.customers.length : 0,
            getData: function($defer, params) {
                $defer.resolve($scope.customers ? ($scope.customers.slice((params.page() - 1) * params.count(), params.page() * params.count())) : []);
            }
        });

        $scope.$watch('customers', function() {
            if ($scope.customers)
                $scope.tableParams.reload();
        });

        $scope.beginEdit = function(dataItem) {
            dataItem.$edit = true;
        };

        $scope.saveEdit = function(dataItem) {
            dataItem.$edit = false;
            var commit = $.extend(true, {}, dataItem);
            delete commit.$edit;
            commit.$save();
        };

        $scope.delete = function(dataItem) {

            Customer.deleteById({
                id: dataItem.CustNum
            }).$promise.then(function(res) {
                if (err) {
                    console.log(err);
                    alert(err.error.message);
                    return;
                }
                var tmp = [];
                for (var i in $scope.customers) {
                    if ($scope.customers[i].CustNum !== dataItem.CustNum)
                        tmp.push($scope.customers[i]);
                }
                $scope.customers = tmp;
            }, function(err) {
                alert(err.data.error.message);
            });
        };

        $scope.showBalance = function(customer) {
            customer.balance().then(function(balance) {
                alert(balance);
            }, function(err) {
                alert(err.data.error.message);
            });
        }
        $scope.add = function() {
            $modal.open({
                templateUrl: 'html/ng-grid-modal-add.html',
                controller: 'addCustomerDlg'
            }).result.then(function(cust) {
                Customer.create(cust).$promise.then(function(res) {
                    if (!$scope.customers)
                        $scope.customers = [];
                    $scope.customers.push(res);
                    $scope.tableParams.reload();
                });
            });
        };

        $scope.showBalance = function(customer) {
            Customer.getBalance({
                id: customer.CustNum
            }, function(balance) {
                alert('Balance information for ' + customer.Name + '\n\n' + JSON.stringify(balance, null, '\t'));
            })
        }
    }]);
