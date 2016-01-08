angular.module('steven').controller('MainController',
  ['Cat', '$http', '$filter', '$scope', function(Cat, $http, $filter, $scope){

  $http.get('https://stark-harbor-5038.herokuapp.com/breeds')
    .then(function(response){
      $scope.breeds = response.data;
    });

  Cat.getCats()
    .then(function(cats){
      $scope.allCats = cats;
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
      $scope.allCats.unshift(savedCat);
    });
  };

}]);
