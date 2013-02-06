angular.module('ngPaginator', []);

angular.module('ngPaginator').config(['$provide', function ($provide) {

  $provide.provider('$paginator', function () {

    var defaults = this.defaults = {

    };

    function isPromise(possiblePromise) {
      return angular.isFunction(possiblePromise.then);
    }

    this.$get = ['$q', function ($q) {

      function $paginator(config) {

      };

      return $paginator;
    }];
  });
}]);
