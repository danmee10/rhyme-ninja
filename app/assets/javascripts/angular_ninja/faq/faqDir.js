app.directive('faq', function() {
  return {
    restrict: 'E',
    scope: {
      pageName: '@'
    },
    templateUrl: '/faq/faqTemplate.html',
    controller: ['$scope', function($scope) {
      $scope.toggleFAQ = function() {
        $('.q-and-a').toggle();
      };

      var createAccountFAQs = function() {
        $scope.faqs = [
          {
            question: 'Do I need an account?',
            answer: 'No.  You are free to browse all public Rhymes, and create your own Rhymes without a RhymeNinja Account.'
          },
          {
            question: 'What is the point of making an account?',
            answer: 'With an account, you can save Rhymes, make comments on public Rhymes, and depending on your enabled external services, have access to other features.'
          },
          {
            question: 'What are the advantages of signing up with an external service?',
            answer: 'Besides not having to remember an additional email and password for RhymeNinja, each external service has special RhymeNinja features that are enabled upon activation.'
          },
          {
            question: 'Can I use more than one external service account with RhymeNinja?',
            answer: 'Yes.  After your initial account activation, whether through a service or through email and password, you can connect any or all external services through Account -> Settings.'
          }
        ]
      };

      var ninjaFAQs = function() {
        $scope.faqs = [
          {
            question: "What is the point of this?",
            answer: "This is the core of RhymeNinja.  It allows you to take the block of text on the left and turn it into a rhyme on the right."
          },
          {
            question: "Why wouldn't I just use like...any word processor...or a pieece of paper?",
            answer: "Currently, RhymeNinja offers no advantages over these methods.  In the future, a suite of tools will be added that will make rhyming a breeze!"
          },
          {
            question: "What does 'Temporary Save' mean?",
            answer: "Temporary Save will store any changes you make in your browser's cookies, and will make that rhyme available to your new account should you make one while they are stored."
          }
        ]
      };

      var initNinjaFAQs = function() {
        $scope.faqs = [
          {
            question: "What do I do?!",
            answer: "Enter a block of text above and then Enter the Ninja to transform it into a Rhyme!"
          }
        ]
      };

      switch ($scope.pageName) {
        case 'createAccount':
          createAccountFAQs();
          break;
        case 'theNinja':
          ninjaFAQs();
          break;
        case 'initNinja':
          initNinjaFAQs();
          break;
      };

    }]
  }
});