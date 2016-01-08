angular.module('steven').controller('MainController',
  ['Breed', 'Cat', '$filter', '$scope', function(Breed, Cat, $filter, $scope){

 $scope.breeds = Breed.all();
 console.log('Breed 1', Breed.find(1));

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

  $scope.addNewBreed = function() {
    breed = new Breed($scope.newBreed);
    breed.save(function(savedBreed){
      console.log('savedBreed', savedBreed);
      $scope.breeds.push(savedBreed);
      $scope.newBreed = null;
    });
  }
}]);
