var paginatorApp = angular.module('pascalprecht.paginator', ['ng']);

/**
 * @ngdoc object
 * @name pascalprecht.paginator.$paginateProvider
 *
 * @description
 * With $paginateProvider you're able to configure $paginate service application-
 * wide. It provides methods to set items per page.
 *
 */
paginatorApp.provider('$paginate', function () {

  var $perPage = 10;
      $current = 0;

 /**
   * @ngdoc function
   * @name pascalprecht.paginator.$paginateProvider#perPage
   * @methodOf pascalprecht.paginator.$paginateProvider
   *
   * @description
   * Configure amount of items per page.
   *
   * @param {number} count Items per page count.
   */
  this.perPage = function (count) {
    if (!count) {
      return $perPage;
    }
    $perPage = count;
  };

  /**
   * @ngdoc object
   * @name pascalprecht.paginator.$paginate
   * @requires $q
   *
   * @description
   * $paginate service to get paginated data. It access a data array or a promise
   * which will be resolve with an array.
   *
   * @param {object} someThing Could be array or promise.
   * @param {object=} options Optional options object to overwrite application-wide configurations.
   */
  this.$get = ['$q', function ($q) {

    var $paginate = function (someThing, options) {

      var config   = {},
          deferred = $q.defer();

      if (options) {
        config.perPage = options.perPage || $perPage;
        config.current = options.current || $current;
      } else {
        config.perPage = $perPage;
        config.current = $current;
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
            len   = dataSet.length,
            i     = 0;

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
