angular.module('ngPaginator', []);

angular.module('ngPaginator').config(['$provide', function ($provide) {

  $provide.provider('$paginator', function () {

    var itemsPerPage = 10;

    this.itemsPerPage = function (count) {
      if (count) {
        itemsPerPage = count;
      } else {
        return itemsPerpage;
      }
    };

    this.$get = ['$http', '$q', function ($http, $q) {

      function $paginator(config) {

        var promise;

        if (angular.isDefined(config.url)) {
          promise = $http.jsonp(config.url);
        } else {
          promise = config;
        }

        console.dir(promise);
      };

      return $paginator;
    }];
  });
}]);
