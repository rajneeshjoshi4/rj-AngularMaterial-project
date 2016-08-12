module.exports = /*@ngInject*/ function ($state, $rootScope) {
    console.log('Yaahoo! This is fist aplication')
    $rootScope.$state = $state;
};