/**
    Setting Angular Material's color themes
**/

module.exports = function ($mdThemingProvider) {
    var bvPrimary = {
        '50': '#ff3065',
        '100': '#ff1752',
        '200': '#fc0041',
        '300': '#e3003a',
        '400': '#c90034',
        '500': '#b0002d',
        '600': '#960026',
        '700': '#7d0020',
        '800': '#630019',
        '900': '#4a0013',
        'A100': '#ff4a78',
        'A200': '#ff638b',
        'A400': '#ff7d9e',
        'A700': '#30000c',
        'contrastDefaultColor': 'light', // whether, by default, text (contrast)
        // on this palette should be dark or light
        'contrastDarkColors': ['50', '100', '200', '300', '400', 'A100'],
        'contrastLightColors': undefined
    };
    $mdThemingProvider.definePalette('bvPrimary', bvPrimary);

    var bvAccent = {
        '50': '#000000',
        '100': '#000000',
        '200': '#000000',
        '300': '#000000',
        '400': '#000000',
        '500': '#000000',
        '600': '#0d0d0d',
        '700': '#1a1a1a',
        '800': '#262626',
        '900': '#333333',
        'A100': '#0d0d0d',
        'A200': '#000000',
        'A400': '#000000',
        'A700': '#404040',
        'contrastDefaultColor': 'light',
        'contrastDarkColors': ['50', '100', '200', '300', '400', 'A100'],
        'contrastLightColors': undefined
    };
    $mdThemingProvider.definePalette('bvAccent', bvAccent);


    $mdThemingProvider.theme('default')
        .primaryPalette('bvPrimary')
        .accentPalette('bvAccent')
};

/*To resolve ng-annotate issue in case of minify the JS*/
module.exports.$inject = ['$mdThemingProvider'];