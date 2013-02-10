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
            promisePassed = !angular.isDefined(options.url);


        var promiseA = $q.when(options);

        promiseA.then(function (wtfValue) {
          console.dir(wtfValue);
        }, function (reason) {
          console.log(reason);
        });


        config.requestType = options.type || $config.requestType;
        config.itemsPerPage = options.itemsPerPage || $config.itemsPerPage;

        if (promisePassed) {
          promise = options;
        } else {
          promise = $http[config.requestType](options.url);
        }

        promise = promise.then(function (successData) {

          var data = 
            angular.isDefined(options.url) && angular.isDefined(options.model) ? // ToDo: Property check is donw twice!
            successData.data[options.model] :
            successData.data;

          return paginate(data, config);
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

        if (!angular.isArray(dataSet)) {
          deferred.reject({
            pages: [],
            total: 0
          });
        } else {

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

          deferred.resolve({
            pages: pages,
            total: pages.length
          });
        }
        return deferred.promise;
      }

      return $paginator;
    }];
  }

  $provide.provider('$paginator', $PaginatorProvider);
}]);
