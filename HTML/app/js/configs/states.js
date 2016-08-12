/**
        Setting up the States by using angular UI routes
**/

module.exports = /*@ngInject*/ function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
    // ROOT STATES for header and sidebar ========================================
        .state('root', {
        url: '',
        abstract: true,
        views: {
            'side': {
                templateUrl: 'view/templates/side.html',
                /*controller: 'HeaderCtrl'*/
            },
            'header': {
                templateUrl: 'view/templates/header.html',
                /*controller: 'FooterCtrl'*/
            }
        }
    })

    // LOGIN STATE ========================================
    .state('root.login', {
        url: '/login',
        views: {
            'content@': {
                templateUrl: 'view/login.html'
            }
        }
    })

    // HOME STATE ========================================
    .state('root.home', {
        url: '/',
        views: {
            'content@': {
                templateUrl: 'view/home.html'
            }
        }
    })

    // NEWS STATE =================================
    .state('root.news', {
            url: '/news',
            views: {
                'content@': {
                    templateUrl: 'view/news.html'
                }
            }

        })
        // NEWS DETAIL STATE =================================
        .state('root.news.detail', {
            url: '/detail',
            views: {
                'content@': {
                    templateUrl: 'view/news-detail.html'
                }
            }

        })
        // FLAG DETAIL STATE =================================
        .state('root.flag', {
            url: '/flag',
            views: {
                'content@': {
                    templateUrl: 'view/flag.html'
                }
            }

        })
        // SHIP DETAIL STATE =================================
        .state('root.ship', {
            url: '/ship',
            views: {
                'content@': {
                    templateUrl: 'view/ship.html'
                }
            }

        })
        // CONVENTION DETAIL STATE =================================
        .state('root.convention', {
            url: '/convention',
            views: {
                'content@': {
                    templateUrl: 'view/convention.html'
                }
            }

        });
};