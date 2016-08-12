/*To resolve ng-annotate issue in case of minify the JS :-  http://chrisdoingweb.com/blog/minifying-browserified-angular-modules/*/
module.exports = /*@ngInject*/ function ($scope, $localStorage) {
    if (typeof $localStorage.expendSideNavPanel === 'undefined') {
        $localStorage.expendSideNavPanel = true;
    }
    $scope.expendSideNavPanel = $localStorage.expendSideNavPanel;
    $scope.openSideNavPanel = function () {
        $localStorage.expendSideNavPanel = !$localStorage.expendSideNavPanel;
        $scope.expendSideNavPanel = $localStorage.expendSideNavPanel;
    };
    //Data for nav
    $scope.currentNavItem = 'page1';
    //Data for message
    var imagePath = 'img/60.jpeg';
    $scope.messages = [
        {
            face: imagePath,
            what: 'Brunch this Sunday?',
            who: 'Min Li Chan',
            when: '3:08PM',
            notes: " I'll be in your neighborhood doing errands"
      },
        {
            face: imagePath,
            what: 'Brunch this Monday?',
            who: 'Min Li Chan',
            when: '3:08PM',
            notes: " I'll be in your neighborhood doing errands"
      },
        {
            face: imagePath,
            what: 'Brunch this Tuesday?',
            who: 'Min Li Chan',
            when: '3:08PM',
            notes: " I'll be in your neighborhood doing errands"
      },
        {
            face: imagePath,
            what: 'Brunch this Wednesday?',
            who: 'Min Li Chan',
            when: '3:08PM',
            notes: " I'll be in your neighborhood doing errands"
      },
        {
            face: imagePath,
            what: 'Brunch this Thursday?',
            who: 'Min Li Chan',
            when: '3:08PM',
            notes: " I'll be in your neighborhood doing errands"
      },
        {
            face: imagePath,
            what: 'Brunch this Friday?',
            who: 'Min Li Chan',
            when: '3:08PM',
            notes: " I'll be in your neighborhood doing errands"
      },
        {
            face: imagePath,
            what: 'Brunch this Saturday?',
            who: 'Min Li Chan',
            when: '3:08PM',
            notes: " I'll be in your neighborhood doing errands"
      }
    ];

    //login page scope
    $scope.loginitem = {
        username: '',
        password: '',
        cb1: true
    };

};