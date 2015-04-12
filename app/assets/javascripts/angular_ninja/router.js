app.config([
  '$stateProvider',
  '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('initNinja', {
        url: '/',
        templateUrl: '/ninja/_init.html',
        controller: 'initNinjaCtrl'
      })
      .state('theNinja', {
        url: '/ninja',
        templateUrl: '/ninja/_ninja.html',
        controller: 'theNinjaCtrl'
      });

      $urlRouterProvider.when('', '/');
  }
]);