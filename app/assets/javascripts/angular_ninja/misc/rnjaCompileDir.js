app.directive('rnjaCompile', ['$compile', function ($compile) {
  return {
    restrict: "A",
    link: function(scope, element, attrs) {
      scope.$watch(
        function(scope) {
          return scope.$eval(attrs.rnjaCompile);
        },
        function(value) {
          element.html(value);
          $compile(element.contents())(scope);
        }
      );
    }
  };
}]);