module.exports = /*@ngInject*/ function DemoCtrl($mdDialog) {
    var originatorEv;
    this.openMenu = function ($mdOpenMenu, ev) {
        originatorEv = ev;
        $mdOpenMenu(ev);
    }
};