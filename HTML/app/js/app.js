var angular = require('angular');
var ngMaterial = require('angular-material');
var ngMessages = require('angular-messages');
var ngStorage = require('ngstorage');
var uiRouter = require('angular-ui-router');
var mdDataTable = require('angular-material-data-table');

/**
  You must include the dependency on 'ngMaterial' 
**/
var app = angular.module('MyApp', ['ngMaterial', 'ngMessages', 'ngStorage', uiRouter, mdDataTable]);

/**
Here's the calling order:
(1) app.config()
(2) app.run()
(3) directive's compile functions (if they are found in the dom)
(4) app.controller()
(5) directive's link functions (again, if found)
**/

// one require statement per sub directory instead of one per file
require('./controllers');
require('./configs');
require('./runs');