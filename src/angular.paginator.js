angular.module('ngPaginator', []);

angular.module('ngPaginator').config(['$provide', function ($provide) {

  $PaginatorProvider = function () {

    var $config = {
      itemsPerPage: 10,
      currentPage: 0,
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
            return paginate(res, config);
          }
          return paginate(res[options.model], config);
        }, function (reason) {
          return $q.reject(reason);
        });

        promise.done = function (fn) {
          promise.then(function (data) {
            fn(data);
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

angular.module('ngPaginator').directive('paginatorPages', function () {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      count: '@'
    },
    template: '<ul class="pagination"><li ng-repeat="n in range(count)">{{n+1}}</li></ul>',
    link: function (scope, element, attrs) {

      scope.range = function (start, end) {
        var ret = [];

        if (!end) {
          end = start;
          start = 0;
        }

        for (var i = start; i < end; i++) {
          ret.push(i);
        }
        return ret;
      };
    }
  };
});
