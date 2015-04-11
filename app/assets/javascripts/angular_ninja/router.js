app.config([
  '$stateProvider',
  '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('ninja', {
        url: '/',
        templateUrl: '/ninja/_new.html',
        controller: 'NinjaCtrl'
      });

  }
]);