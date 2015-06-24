app.directive('rnjaToolBelt',['$http', function($http) {
  return {
    restrict: 'E',
    templateUrl: '/misc/rnjaToolBelt.html',
    scope: {
      content: '=',
      showTools: '='
    },
    controller: ['$scope', function($scope){
      $scope.selectedTool = null;
      $scope.tempContent = '';
      $scope.hideSpinner = false;
      $scope.rhymes = [];
      $scope.synonyms = [];
      $scope.noRhymes = true;
      $scope.noSynonyms = true;

      $scope.$watch('content.word', function(){
        $scope.nonWordSelected = /\W/.test($scope.content.word);
      });

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
        $scope.hideSpinner = false;
      };

      var resetScopeVars = function() {
        $scope.selectedTool = null;
        $scope.rhymes = [];
        $scope.synonyms = [];
        $scope.hideSpinner = false;
        $scope.noRhymes = true;
        $scope.noSynonyms = true;
      };

      $scope.hideTools = function() {
        $scope.showTools = false;
        $scope.content = {word:'$@--@inItIaLiZeR@--@%', position:[]};
        resetScopeVars();
      };

      $scope.$on('resetNinjaTools', function(){
        resetScopeVars();
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
          var uniqList = _.uniq(spellings);
          if (uniqList.length === 0){
            $scope.noSynonyms = true;
          } else {
            $scope.noSynonyms = false;
            $scope.synonyms = uniqList;
          }
          $scope.hideSpinner = true;
        }).error(function(msg){
          $scope.synonyms = ["Please contact support."];
        });
      }

      var fetchRhymes = function() {
        var url = "/api/rhymes/" + $scope.content.word + ".json"
        $http.get(url).success(function(data){
          var spellings = _.map(data, function(d){ return d.spelling; });
          var uniqList = _.uniq(spellings);
          if (uniqList.length === 0) {
            $scope.noRhymes = true;
          } else {
            $scope.noRhymes = false;
            $scope.rhymes = uniqList;
          }
          $scope.hideSpinner = true;
        }).error(function(msg){
          $scope.rhymes = ["Please contact support."];
        });
      };
    }]
  };
}]);