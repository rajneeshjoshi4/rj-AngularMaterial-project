module.exports = /*@ngInject*/ function ($scope, $element) {
    $scope.conventions = ['GENERAL', 'Electricity', 'EU DIRECTIVE 2005/33/EC Sulphr content of marine fuel', 'IBC Code', 'MARPOL Annex I Oil Pollution', 'MARPOL Annex VI Air Pollution'];
    $scope.searchConvention;
    $scope.clearSearchConventionTerm = function () {
        $scope.searchConvention = '';
    };

    $scope.flags = ['Algeria', 'ALL EU FLAGS', 'ALL FLAGS', 'Bahamas', 'Dominica', 'Man Isle Of Man'];
    $scope.searchFlag;
    $scope.clearSearchFlagTerm = function () {
        $scope.searchFlag = '';
    };

    $scope.ships = ['ALL TYPES', 'Bulk Carriers', 'Cargo Ships', 'Chemical Tankers', 'Fishing Vessels', 'RO-RO Passenger Ships'];
    $scope.searchShip;
    $scope.clearSearchShipTerm = function () {
        $scope.searchShip = '';
    };


    $element.find('input').on('keydown', function (ev) {
        ev.stopPropagation();
    });
};