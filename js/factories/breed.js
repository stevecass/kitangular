angular.module('steven').factory('Breed', function($http) {

  var apiUrl = 'https://stark-harbor-5038.herokuapp.com/breeds';

  var Breed = function(json) {
    angular.extend(this, json);
  };

  Breed.getBreeds = function() {
    return $http.get(apiUrl)
      .then(function(response){
        var result = [];
        angular.forEach(response.data, function(json){
          result.push(new Breed(json));
        });
        return result;
      });
  };

  return Breed;
});
