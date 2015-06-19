app.directive('rnjaToolBelt',['$http', function($http) {
  return {
    restrict: 'E',
    templateUrl: '/misc/rnjaToolBelt.html',
    scope: {
      content: '=',
      showTools: '='
    },
    controller: function($scope){
      $scope.selectedTool = null;
      $scope.tempContent = '';


      $scope.hideTools = function() {
        $scope.showTools = false;
        $scope.selectedTool = null;
        $scope.rhymes = null;
      };

      var prepTool = function(tool) {
        switch (tool) {
          case 'rhymes':
            fetchRhymes();
            break;
          case 'synonyms':
            fetchSynonyms();
            break;
          case 'manual':
            setTemp();
            break;
        }
      }

      var setTemp = function() {
        $scope.tempContent = $scope.content.word;
      }

      $scope.selectTool = function(tool) {
        $scope.selectedTool = tool;
        prepTool(tool);
      };

      $scope.resetSelectedTool = function() {
        $scope.selectedTool = null;
      };
      $scope.$on('resetNinjaTools', function(){
        $scope.resetSelectedTool();
        $scope.rhymes = [];
      });

      $scope.isSelected = function(tool) {
        return $scope.selectedTool === tool;
      };

      $scope.changeWord = function(word) {
        if (_.isUndefined(word)){
          $scope.content.word = $scope.tempContent;
        } else {
          $scope.content.word = word;
        }
        $scope.hideTools();
      };

      $scope.cancelChange = function() {
        $scope.selectedTool = null;
        $scope.tempContent = '';
      };

      var fetchSynonyms = function() {
        var url = "/api/synonyms/" + $scope.content.word + ".json"
        $http.get(url).success(function(data){
          var spellings = _.map(data, function(d){ return d.spelling; });
          $scope.synonyms = _.uniq(spellings);
        }).error(function(msg){
          $scope.synonyms = ["Please contact support."];
        });
      }

      var fetchRhymes = function() {
        var url = "/api/rhymes/" + $scope.content.word + ".json"
        $http.get(url).success(function(data){
          var spellings = _.map(data, function(d){ return d.spelling; });
          $scope.rhymes = _.uniq(spellings);
        }).error(function(msg){
          $scope.rhymes = ["Please contact support."];
        });
      };
    }
  };
}]);