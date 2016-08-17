module.exports = function DemoCtrl($mdDialog) {
    var originatorEv;
    this.openMenu = function ($mdOpenMenu, ev) {
        originatorEv = ev;
        $mdOpenMenu(ev);
    }
};
/*To resolve ng-annotate issue in case of minify the JS*/
module.exports.$inject = ['$mdDialog'];