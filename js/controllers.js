angular.module('steven').controller('MainController',
  ['Breed', 'Cat', '$filter', '$scope', function(Breed, Cat, $filter, $scope){

  Breed.getBreeds()
    .then(function(breeds){
      $scope.breeds = breeds;
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
    Cat.create($scope.newCat).then(function(savedCat){
      $scope.allCats.unshift(savedCat);
      $scope.showMatches();
    });
  };

}]);
