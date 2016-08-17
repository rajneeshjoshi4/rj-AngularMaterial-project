module.exports = function ($scope) {
    $scope.data = {
        cb1: true
    };
};

/*To resolve ng-annotate issue in case of minify the JS*/
module.exports.$inject = ['$scope'];