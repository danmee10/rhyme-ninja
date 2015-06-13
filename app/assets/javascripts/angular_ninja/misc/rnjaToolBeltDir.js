app.directive('rnjaToolBelt',[function() {
  return {
    restrict: 'E',
    templateUrl: '/misc/rnjaToolBelt.html',
    scope: {
      content: '=',
      showTools: '='
    },
    controller: function($scope){
      $scope.selectedTool = null;


      $scope.hideTools = function() {
        $scope.showTools = false;
        $scope.selectedTool = null;
      };

      $scope.selectTool = function(tool) {
        $scope.selectedTool = tool;
      };

      $scope.isSelected = function(tool) {
        return $scope.selectedTool === tool;
      };

      $scope.changeWord = function() {

      };
    }
  };
}]);