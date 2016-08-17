module.exports = function ($mdEditDialog, $q, $scope, $timeout) {
    'use strict';

    $scope.selected = [];
    $scope.limitOptions = [5, 10, 15];

    $scope.options = {
        rowSelection: true,
        multiSelect: true,
        autoSelect: true,
        decapitate: false,
        largeEditDialog: false,
        boundaryLinks: false,
        limitSelect: true,
        pageSelect: true
    };

    $scope.query = {
        order: 'name',
        limit: 5,
        page: 1
    };

    $scope.desserts = {
        "count": 10,
        "data": [
            {
                "active": true,
                "date": "27/7/2016",
                "title": "	FRANCE - NAIROBI INTERNATIONAL CONVENTION ON THE REMOVAL OF WRECKS, 2007 ",
                "summary": "Ratification by France of Nairobi Convention - delegation to BV",
                "type": "Type1",
                "comment": "OK"
                        },
            {
                "active": false,
                "date": "29/7/2016",
                "title": "	IMO MSC 96 confirms IACS Members Class Rules meet GBS",
                "summary": "It is IMO MSC 96 confirms IACS Members Class Rules meet GBS",
                "type": "Type2",
                "comment": "Can move ahead"
                        },
            {
                "active": true,
                "date": "15/4/2016",
                "title": "REPUBLIC OF SRI LANKA - MERCHANT SHIPPING SECRETARIAT - CIRCULAR MSN 07/2016 - Port State Control Detention of a Sri Lankan Flagged Ships",
                "summary": "Republic of Sri Lanka Circular MSN 07/2016 - Port State Control Detention of a Sri Lankan Flagged Ships",
                "type": "Type3",
                "comment": "Varified"
                        },
            {
                "active": true,
                "date": "29/7/2016",
                "title": "Bulk Carrier Safety",
                "summary": "The Safety, Energy, Environment & Research section (Services Department - M&O Division) prepared the IMO information paper on 'Update on the safety level of bulk carriers and comparison with predictions', MSC 96/INF.6.",
                "type": "Type2",
                "comment": "Varified"
                        },
            {
                "active": false,
                "date": "28/3/2016",
                "title": "REPUBLIC OF SRI LANKA - MERCHANT SHIPPING SECRETARIAT - CIRCULAR MSN 07/2016 - Port State Control Detention of a Sri Lankan Flagged Ships",
                "summary": "Republic of Sri Lanka Circular MSN 07/2016 - Port State Control Detention of a Sri Lankan Flagged Ships",
                "type": "Type3",
                "comment": "Varified"
                        },
            {
                "active": true,
                "date": "29/2/2016",
                "title": "Republic of Sri Lanka - Merchant Shipping Secretariat - Circular MSN 10/2016 - Annual Company Security Exercise",
                "summary": "Republic of Sri Lanka - Merchant Shipping Secretariat - Circular MSN 10/2016 - Annual Company Security ExerciseRepublic of Sri Lanka - Merchant Shipping Secretariat - Circular MSN 10/2016 - Annual Company Security Exercise",
                "type": "Type2",
                "comment": "Varified"
                        },
            {
                "active": true,
                "date": "3/8/2016",
                "title": "FRANCE - NAIROBI INTERNATIONAL CONVENTION ON THE REMOVAL OF WRECKS, 2007 ",
                "summary": "Republic of Sri Lanka Circular MSN 07/2016 - Port State Control Detention of a Sri Lankan Flagged Ships",
                "type": "Other",
                "comment": "Varified"
                        },
            {
                "active": false,
                "date": "26/7/2016",
                "title": "Bulk 	IMO MSC 96 confirms IACS Members Class Rules meet GBS ",
                "summary": "Test IMO MSC 96 confirms IACS Members Class Rules meet GBS,	IMO MSC 96 confirms IACS Members Class Rules meet GBS ",
                "type": "Type2",
                "comment": "Varified"
                        }

                    ]
    };

    $scope.editComment = function (event, dessert) {
        event.stopPropagation(); // in case autoselect is enabled

        var editDialog = {
            modelValue: dessert.comment,
            placeholder: 'Add a comment',
            save: function (input) {
                if (input.$modelValue === 'Donald Trump') {
                    input.$invalid = true;
                    return $q.reject();
                }
                if (input.$modelValue === 'Bernie Sanders') {
                    return dessert.comment = 'FEEL THE BERN!'
                }
                dessert.comment = input.$modelValue;
            },
            targetEvent: event,
            title: 'Add a comment',
            validators: {
                'md-maxlength': 30
            }
        };

        var promise;

        if ($scope.options.largeEditDialog) {
            promise = $mdEditDialog.large(editDialog);
        } else {
            promise = $mdEditDialog.small(editDialog);
        }

        promise.then(function (ctrl) {
            var input = ctrl.getInput();

            input.$viewChangeListeners.push(function () {
                input.$setValidity('test', input.$modelValue !== 'test');
            });
        });
    };

    $scope.toggleLimitOptions = function () {
        $scope.limitOptions = $scope.limitOptions ? undefined : [5, 10, 15];
    };

    $scope.getTypes = function () {
        return ['Type1', 'Type2', 'Type3', 'Type4', 'Other'];
    };

    $scope.loadStuff = function () {
        $scope.promise = $timeout(function () {
            // loading
        }, 2000);
    }

    $scope.logItem = function (item) {
        console.log(item.name, 'was selected');
    };

    $scope.logOrder = function (order) {
        console.log('order: ', order);
    };

    $scope.logPagination = function (page, limit) {
        console.log('page: ', page);
        console.log('limit: ', limit);
    };

    // for search
    var self = this;
    $scope.readonly = false;
    // Lists of Search convention, flag and ship type
    $scope.conventionNames = [];
    $scope.roConventionNames = angular.copy($scope.conventionNames);
    $scope.editableConventionNames = angular.copy($scope.conventionNames);

    $scope.flagNames = [];
    $scope.roFlagNames = angular.copy($scope.flagNames);
    $scope.editableFlagNames = angular.copy($scope.FlagNames);

    $scope.shipNames = [];
    $scope.roShipNames = angular.copy($scope.shipNames);
    $scope.editableShipNames = angular.copy($scope.shipNames);
};

/*To resolve ng-annotate issue in case of minify the JS*/
module.exports.$inject = ['$mdEditDialog', '$q', '$scope', '$timeout'];