angular.module('ngPaginator', []);

angular.module('ngPaginator').config(['$provide', function ($provide) {

  $PaginatorProvider = function () {

    var $config = {
      itemsPerPage: 10,
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
            config = {};

        config.requestType = options.type || $config.requestType;
        config.itemsPerPage = options.itemsPerPage || $config.itemsPerPage;

        if (!angular.isDefined(options.url)) {
          promise = options;
        } else {
          promise = $http[config.requestType](options.url);
        }

        promise = promise.then(function (successData) {
          return paginate(successData.data.data, config);
        });

        promise.done = function (fn) {
          promise.then(function (paginatedData) {
            fn(paginatedData);
          });
          return promise;
        };

        promise.error = function (fn) {
          promise.then(function (response) {
            fn(response);
          });
          return promise;
        };
 
        return promise;
      };

      $paginator.paginate = function (options) {
        return $paginator(options);
      };

      $paginator.itemsPerPage = function () {
        return config.itemsPerPage;
      };

      $paginator.requestType = function () {
        return config.requestType;
      };

      function paginate(dataSet, config) {

        var deferred = $q.defer(),
            paginatedData = [],
            len = dataSet.length,
            i = 0;

        for (; i < len; ++i) {
          if (i % config.itemsPerPage === 0) {
            paginatedData[Math.floor(i / config.itemsPerPage)] = [dataSet[i]];
          } else {
            paginatedData[Math.floor(i / config.itemsPerPage)].push(dataSet[i]);
          }
        }
 
        deferred.resolve(paginatedData);
        return deferred.promise;
      }

      return $paginator;
    }];
  }

  $provide.provider('$paginator', $PaginatorProvider);
}]);
