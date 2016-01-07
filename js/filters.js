angular.module('steven').filter('breedFilter', function(){

  return function(cats, fields, targetStr) {
    
    //If there's nothing to match passed in - return everything
    if (!targetStr) {
      return cats;
    }

    var filtered = [];
    angular.forEach(cats, function(cat){
      angular.forEach(fields, function(field){
        if (cat[field] 
        && cat[field].toLowerCase().indexOf(targetStr) > -1
        && filtered.indexOf(cat) < 0) {
          filtered.push(cat);
        }
      });
    });
    return filtered;
    };

});