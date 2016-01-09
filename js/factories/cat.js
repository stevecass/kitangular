angular.module('steven').factory('Cat', function($resource) {

  var apiUrl = 'https://stark-harbor-5038.herokuapp.com/cats/:id';
  var Cat = $resource(apiUrl, { id: '@id' }, {
    create: {
      method: 'POST'
    },
    update: {
      method: 'PATCH' // this method issues a PATCH request
    }
  });

  Cat.prototype.getBornOn = function() {
    /*
    The API returns e.g. 2010-04-05
    new Date(2010-04-05) will be treated as a UTC date in ES5
    and a local date in ES6. We want to force treatment as local
    and ignore the TZ issue altogether. "new Date(y, m, d)"
    will give us a local date. In that syntax month is zero-based
    so we need to subtract 1 from the month in the string.
    */
    var parts = this.born_on.split('-');
    return new Date(parts[0], parts[1] - 1, parts[2]);
  }

  Cat.prototype.getAge = function() {
    var bornOn = this.getBornOn();
    var today = new Date();
    var age = today.getFullYear() - bornOn.getFullYear();
    var m = today.getMonth() - bornOn.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < bornOn.getDate())) {
        age--;
    }
    return age;
  };

  Cat.all = function() {
    return Cat.query().$promise;
  };

  Cat.find = function(id) {
    return Cat.get({id: id}).$promise;
  }

  Cat.prototype.save = function() {
    if (this.id) {
      console.log('updating');
      return this.$update();
    } else {
      console.log('creating');
      return this.$save();
    }
  }


  return Cat;
});
