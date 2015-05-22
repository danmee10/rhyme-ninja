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
        url: '/ninja/:rhyme_id',
        templateUrl: '/ninja/_ninja.html',
        controller: 'theNinjaCtrl'
      })
      .state('userRhymes', {
        url: '/my-rhymes',
        templateUrl: '/user/_rhymes.html',
        controller: 'userRhymesCtrl'
      })
      .state('publicRhymes', {
        url: '/public-rhymes?titleQuery',
        templateUrl: '/rhymes/_index.html',
        controller: 'rhymesCtrl'
      });

    $urlRouterProvider.when('', '/');
  }
]);