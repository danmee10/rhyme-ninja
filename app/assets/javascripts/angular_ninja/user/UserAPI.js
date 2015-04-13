app.factory('User', ['$resource', function ($resource) {
  'use strict';

  return $resource('/users/:user_id.json', { user_id: '@user_id' },
      {
        'update': { method: 'PUT'},
        'rhymes': {
          method: 'GET',
          url: '/users/:user_id/rhymes.json'
        }
      }
    );
}]);