module.exports = function ($state, $rootScope) {
    console.log('Yaahoo! This is fist aplication')
    $rootScope.$state = $state;
};

/*To resolve ng-annotate issue in case of minify the JS*/
module.exports.$inject = ['$state', '$rootScope'];