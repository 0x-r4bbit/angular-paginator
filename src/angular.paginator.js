angular.module('ngPaginator', []);

angular.module('ngPaginator').config(['$provide', function ($provide) {

  $PaginatorProvider = function () {

    var $config = {
      itemsPerPage: 10,
      currentPage: 1,
      requestType: 'jsonp'
    };

    this.itemsPerPage = function (count) {
      if (count) {
        $config.itemsPerPage = count;
      } else {
        return $config.itemsPerpage;
      }
    };

    this.requestType = function (type) {
      if (type) {
        $config.requestType = type;
      } else {
        return $config.requestType;
      }
    };

    this.$get = ['$http', '$q', function ($http, $q) {

      function $paginator(options) {
        var promise,
            config = {},
            usingHttpService = angular.isDefined(options.url);

        config.requestType = options.type || $config.requestType;
        config.itemsPerPage = options.itemsPerPage || $config.itemsPerPage;

        if (!usingHttpService) {
          promise = options;
        } else {
          promise = $http[config.requestType](options.url);
        }

        promise = promise.then(function (res) {
          if (!usingHttpService || !angular.isDefined(options.model)) {
            console.dir(res);
            return paginate(res, config);
          }
          return paginate(res[options.model], config);
        }, function (reason) {
          return $q.reject(reason);
        });

        promise.done = function (fn) {
          promise.then(function (data) {
            fn(data.pages, data.total);
          });
          return promise;
        };

        promise.error = function (fn) {
          promise.then(null, function (reason) {
            fn(reason);
          });
          return promise;
        };

        return promise;
      };

      function paginate(dataSet, config) {

        var deferred = $q.defer();

        if (angular.isArray(dataSet)) {
          var pages = [],
              len = dataSet.length,
              i = 0;

          for (; i < len; ++i) {
            if (i % config.itemsPerPage === 0) {
              pages[Math.floor(i / config.itemsPerPage)] = [dataSet[i]];
            } else {
              pages[Math.floor(i / config.itemsPerPage)].push(dataSet[i]);
            }
          }

          deferred.resolve({pages: pages, total: pages.length});
        } else {
          deferred.reject({pages: [], total: 0});
        }
        return deferred.promise;
      }
      return $paginator;
    }];
  }

  $provide.provider('$paginator', $PaginatorProvider);
}]);
