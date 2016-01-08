angular.module('steven').factory('Cat', function($http) {

  var apiUrl = 'https://stark-harbor-5038.herokuapp.com/cats';

  var Cat = function(json) {
    angular.extend(this, json);
    this.bornOn = new Date(json.born_on);
    this.createdAt = new Date(json.created_at);
    this.updatedAt = new Date(json.updted_at);
  };

  Cat.prototype.getAge = function() {
    var today = new Date();
    var age = today.getFullYear() - this.bornOn.getFullYear();
    var m = today.getMonth() - this.bornOn.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < this.bornOn.getDate())) {
        age--;
    }
    return age;
  };

  Cat.getCats = function() {
    return $http.get('https://stark-harbor-5038.herokuapp.com/cats')
      .then(function(response){
        var result = [];
        angular.forEach(response.data, function(json){
          result.push(new Cat(json));
        });
        return result;
      });
  };

  Cat.create = function(catProps) {
    return $http.post('https://stark-harbor-5038.herokuapp.com/cats', catProps)
    .then(function(response){
      return new Cat(response.data);
    });
  };

  return Cat;
});
