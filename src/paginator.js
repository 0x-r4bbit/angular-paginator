angular.module('pascalprecht.paginator', ['ng']);

angular.module('pascalprecht.paginator').provider('$paginate', function () {

  var $perPage = 10;

  this.perPage = function (count) {
    if (!count) {
      return $perPage;
    }
    $perPage = count;
  };

  this.$get = ['$q', function ($q) {

    var $paginate = function (someThing, options) {

      var config = {},
          deferred = $q.defer();

      if (options) {
        config.perPage = options.perPage || $perPage;
      } else {
        config.perPage = $perPage
      }

      $q.when(someThing).then(function (data) {

        paginate(data, config).then(function (paginatorObj) {
          deferred.resolve(paginatorObj);
        }, function (paginatorObj) {
          deferred.reject(paginatorObj);
        });
      });

      return deferred.promise;
    };

    function paginate(dataSet, config) {

      var deferred = $q.defer();

      if (angular.isArray(dataSet)) {
        var pages = [],
            len = dataSet.length,
            i = 0;

        for (; i < len; ++i) {
          if (i % config.perPage === 0) {
            pages[Math.floor(i / config.perPage)] = [dataSet[i]];
          } else {
            pages[Math.floor(i / config.perPage)].push(dataSet[i]);
          }
        }

        deferred.resolve({
          pages: pages, 
          total: pages.length,
          perPage: config.perPage,
          current: config.current
        });
      } else {
        deferred.reject({
          pages: [], 
          total: 0, 
          perPage: config.perPage, 
          current: config.current
        });
      }
      return deferred.promise;
    }

    return $paginate;
  }];

});
