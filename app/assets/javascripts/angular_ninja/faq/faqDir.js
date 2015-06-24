app.directive('faq', [function() {
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
            question: "Now what?",
            answer: "Now it is up to you to transform the text on the right into a rhyme.  Start by clicking on any word to bring up the tool belt.  From there you will be able to replace the word you clicked on with a word that rhymes, a synonym, or any other word or words you can think of by changing it manually."
          },
          {
            question: "What does 'Temporary Save' mean?",
            answer: "Temporary Save will store any changes you make in your browser's cookies, and will make that rhyme available to your new account should you make one while they are stored."
          },
          {
            question: "No rhymes or synonyms...just 'Contact support'...",
            answer: "Chances are this app has hit the rate limit for either the rhyme or thesaurus API.  Send danmee10@gmail.com an email titled 'RhymeNinja bug' and give the time of day the incident occurred."
          }
        ]
      };

      var initNinjaFAQs = function() {
        $scope.faqs = [
          {
            question: "What do I do?!",
            answer: "Type or paste a block of text above and then Enter the Ninja to transform it into a Rhyme!"
          },
          {
            question: "What is a 'Syllable Pattern'?",
            answer: "It defines how many syllables will be allowed per line.  The default is 10, so each line will start out with no more than 10 syllables, unless the line starts with a word with more than 10 syllables.  In that case it will have as many as the starting word."
          },
          {
            question: "What is the 'requested format' for the syllable pattern?",
            answer: "You can specify as many numbers as you like separated by a comma and a space.  The Ninja will apply each number in turn to each line until there are either no more lines or no more numbers.  If there are more lines than numbers the number-pattern will repeat."
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
}]);