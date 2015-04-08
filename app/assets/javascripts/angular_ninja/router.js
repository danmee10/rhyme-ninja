app.config([
  '$stateProvider',
  '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: '/home.html',
        controller: 'HomeCtrl'
      });

    $urlRouterProvider.otherwise('/home');
  }
]);