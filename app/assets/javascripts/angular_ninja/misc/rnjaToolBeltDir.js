app.directive('rnjaToolBelt',[function() {
  return {
    restrict: 'E',
    templateUrl: '/misc/rnjaToolBelt.html',
    scope: {
      content: '=',
      showTools: '='
    },
    controller: function($scope){
      $scope.hideTools = function() {
        $scope.showTools = false;
      }
      $scope.toggleTools = function($event) {
        console.log("$event.keyCode --> ", $event.keyCode)
      };
    }
  };
}]);