var app = angular.module('kendo-grid-demo', ['kendo.directives', 'lbServices']);
app
    .controller('KendoCtrl', ['$scope', 'Customer', function($scope, Customer) {
        $scope.gridOptions = {
            dataSource: new kendo.Akera.DataSource({
                lbModel: Customer,
                schema: {
                    model: {
                        fields: {
                            CustNum: {
                                type: 'number'
                            }
                        }
                    }
                },
                pageSize: 40
            }),
            autoBind: true,
            sortable: true,
            pageable: true,
            columns: [{
                field: 'CustNum',
                title: 'CustNum',
                type: 'number'
            }, {
                field: 'Name',
                title: 'Name',
                hidden: false
            }, {
                field: 'SalesRep',
                title: 'Sales Rep'
            }, {
                title: "&nbsp;",
                width: "350px"
            }, {
                field: 'Address',
                title: 'Address',
                hidden: true
            }],
            toolbar: ["create"],
            selectable: 'row',
            editable: 'popup',
            filterable: true,
            height: 300,
            width: '100%'
        };
    }])
