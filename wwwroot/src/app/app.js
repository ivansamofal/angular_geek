require('./register-dependencies');

var rootTemplate = require('./view/root/root.html');
var mainTemplate = require('./view/main/main.html');

(function (angular) {
'use strict';

angular
.module('app', ['ui.router', 'ui.bootstrap'])
.config(
['$locationProvider', '$urlRouterProvider', '$stateProvider',
function($locationProvider, $urlRouterProvider, $stateProvider) {
$locationProvider.hashPrefix('!').html5Mode(true);

$stateProvider
.state('root', {
abstract: true,
template: rootTemplate,
controller: 'root.controller',
controllerAs: 'root'
})
.state('root.main', {
url: '/',
template: mainTemplate,
controller: 'main.controller',
controllerAs: 'main'
});

$urlRouterProvider.otherwise('/');
}
])
.run(['$rootScope',
function ($rootScope) {

}
]);

require('./register'); //вызов модуля зависимостей приложения

})(angular);
