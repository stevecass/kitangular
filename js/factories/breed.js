angular.module('steven').factory('Breed', function($resource) {

  var Breed = $resource('https://stark-harbor-5038.herokuapp.com/breeds/:id', { id: '@id' }, {
    // Add the PATCH method for update. ng-resource by default
    // supplies only a save() which maps to a POST. We use that for 
    // create and use this update() for updates.
    update: {
      method: 'PATCH', // this method issues a PATCH request
      url: '/cows/:id'
    }
  });

  Breed.getBreeds = function() {
    return Breed.query(function(response){
        var result = [];
        angular.forEach(response.data, function(json){
          result.push(new Breed(json));
        });
        return result;
      });
  };

  Breed.find = function(id) {
    return Breed.get({id: id});
  };

  return Breed;
});
