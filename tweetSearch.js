function tweets($scope, $http) {
  localStorage.readTweets = localStorage.readTweets || JSON.stringify([]);

  $scope.$watch("query", function () {
      $http.jsonp("http://search.twitter.com/search.json?callback=JSON_CALLBACK&q=" + $scope.query).then(function(results){
        //will be called when get is finished
        $scope.tweets = results.data.results;

        var readTweets = JSON.parse(localStorage.readTweets);
        for (var i = 0; i < $scope.tweets.length; i++) {
          if (readTweets.indexOf($scope.tweets[i].id) != -1) {
            $scope.tweets[i].read = true;
          }
        }
    });
  });

  $scope.query = "z1v1";

  $scope.read = function(tweet) {
    var readTweets = JSON.parse(localStorage.readTweets);
    if (tweet.read) {
      readTweets.push(tweet.id);
    } else {
      var index = readTweets.indexOf(tweet.id);
      readTweets.splice(index, 1);
    }
    localStorage.readTweets = JSON.stringify(readTweets);
  }

}