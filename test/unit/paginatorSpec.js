describe('pascalprecht.paginator', function () {

  var $paginate, $q, $rootScope;

  beforeEach(module('pascalprecht.paginator'));

  beforeEach(inject(function (_$paginate_, _$q_, _$rootScope_) {
    $paginate = _$paginate_;
    $q = _$q_;
    $rootScope = _$rootScope_;
  }));

  it('should have $paginate service', function () {
    expect($paginate).toBeDefined();
  });

  describe('$paginate', function () {

    it('should be a function', function () {
      expect(typeof $paginate).toBe('function');
    });

    it('should return object', function () {
      var items = [{},{},{},{}],
          deferred = $q.defer(),
          promise = deferred.promise,
          data;

      promise.then(function (value) {
        data = value;
      });

      $paginate(items).then(function (data) {
        deferred.resolve(data);
      });

      $rootScope.$apply();

      expect(typeof data).toBe('object');
    });

    it('should return paginator data object', function () {
      inject(function ($paginate) {
        var items = [{},{},{},{}],
            deferred = $q.defer(),
            promise = deferred.promise,
            obj;

        promise.then(function (value) {
          obj = value;
        });

        $paginate(items).then(function (data) {
          obj = data;
        });

        $rootScope.$apply();

        expect(obj.pages).toBeDefined();
        expect(obj.total).toBeDefined();
        expect(obj.current).toBeDefined();
        expect(obj.perPage).toBeDefined();
      });
    });

    describe('paginatorObject#pages', function () {
      it('should be an array', function () {
        var items = [{},{},{},{}],
            deferred = $q.defer(),
            promise = deferred.promise,
            obj;

        promise.then(function (value) {
          obj = value;
        });

        $paginate(items).then(function (data) {
          obj = data;
        });

        $rootScope.$apply();
        expect(obj.pages.length).toBeDefined();
      });
    });

    describe('paginatorObject#current', function () {

      it('should be a number', function () {
        var items = [{},{},{},{}],
            deferred = $q.defer(),
            promise = deferred.promise,
            obj;

        promise.then(function (value) {
          obj = value;
        });

        $paginate(items).then(function (data) {
          deferred.resolve(data);
        });

        $rootScope.$apply();

        expect(typeof obj.current).toBe('number');
      });
    });

    describe('paginatorObject#perPage', function () {

      it('should be a number', function () {
        var items = [{},{},{},{}],
            deferred = $q.defer(),
            promise = deferred.promise,
            obj;

        promise.then(function (value) {
          obj = value;
        });

        $paginate(items).then(function (data) {
          deferred.resolve(data);
        });

        $rootScope.$apply();
        expect(typeof obj.perPage).toBe('number');
      });
    });

    describe('paginatorObject#total', function () {

      it('should be a number', function () {
        var items = [{},{},{},{}],
            deferred = $q.defer(),
            promise = deferred.promise,
            obj;

        promise.then(function (value) {
          obj = value;
        });

        $paginate(items).then(function (data) {
          deferred.resolve(data);
        });

        $rootScope.$apply();
        expect(typeof obj.total).toBe('number');
      });
    });
  });
});
