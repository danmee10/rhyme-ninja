app.directive('publicSearch', function() {
  return {
    restrict: 'E',
    templateUrl: '/public_search/searchForm.html',
    scope: {},
    controller: ['$location', '$rootScope', function($location, $rootScope){
      $('button.public-search').click(function(e){
        e.preventDefault();
        var query = $('input.public-search-query').val();
        $rootScope.$apply(function(){
          $location.path('public-rhymes');
          $location.search("titleQuery", query);
        })
      });
    }]
  }
});