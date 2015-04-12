app.factory('Rhyme', ['$resource', function ($resource) {
  'use strict';

  return $resource('/users/:user_id/rhymes/:id.json', { id: '@id', user_id: '@user_id' },
      {
        'update': { method: 'PUT'}
      }
    );
}]);