angular.module('steven').controller('MainController',
  ['$http', '$filter', '$scope', function($http, $filter, $scope){

  $http.get('https://stark-harbor-5038.herokuapp.com/breeds')
    .then(function(response){
      $scope.breeds = response.data;
    });

  $http.get('https://stark-harbor-5038.herokuapp.com/cats')
    .then(function(response){
      $scope.allCats = response.data;
      $scope.showMatches();
    });

  $scope.showMatches = function() {
    var filterFn = $filter('breedFilter');
    var searchFields = ['name', 'breed_name'];
    $scope.cats = filterFn($scope.allCats, searchFields, $scope.filterMatchStr);
  };

  $scope.addNewCat = function() {
    $http.post('https://stark-harbor-5038.herokuapp.com/cats', $scope.newCat)
    .then(function(response){
      var savedCat = response.data;
      $scope.cats.unshift(savedCat);
    });
  };

}]);
