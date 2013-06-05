describe('pascalprecht.paginator', function() {
  beforeEach(module('pascalprecht.paginator'));
  it('should have $paginate service', function() {
    inject(function($paginate) {
      expect($paginate).toBeDefined();
    });
  });
  describe('$paginate', function() {
    it('should be a function', function() {
      inject(function($paginate) {
        expect(typeof $paginate).toBe('function');
      });
    });
    it('should return object', function() {
      inject(function($paginate) {
        var items = [{},{},{},{}];
        $paginate(items).then(function(data) {
          expect(typeof data).toBe('object');
        });
      });
    });
    it('should return paginator data object', function() {
      inject(function($paginate) {
        var items = [{},{},{},{}];
        var obj;
        $paginate(items).then(function(data) {
          obj = data;
          // 4 lines should be here moved from line 35
          expect(obj.pages).toBeDefined();
          expect(obj.total).toBeDefined();
          expect(obj.current).toBeDefined();
          exoect(obj.perPage).toBeDefined();
        });
//        this 4 lines should not be here because the promise object is not ready yet moved up to line 29
//        expect(obj.pages).toBeDefined();
//        expect(obj.total).toBeDefined();
//        expect(obj.current).toBeDefined();
//        exoect(obj.perPage).toBeDefined();
      });
    });
    describe('paginatorObject#pages', function() {
      it('should be an array', function() {
        inject(function($paginate) {
          var items = [{},{},{},{}];
          $paginate(items).then(function(data) {
            expect(typeof data.pages).toBe('array');
          });
        });
      });
    });
    describe('paginatorObject#current', function() {
      it('should be a number', function() {
        inject(function($paginate) {
          var items = [{},{},{},{}];
          $paginate(items).then(function(data) {
            expect(typeof data.current).toBe('number');
          });
        });
      });
    });
    describe('paginatorObject#perPage', function() {
      it('should be a number', function() {
        inject(function($paginate) {
          var items = [{},{},{},{}];
          $paginate(items).then(function(data) {
            expect(typeof data.perPage).toBe('number');
          });
        });
      });
    });
    describe('paginatorObject#total', function() {
      it('should be a number', function() {
        inject(function($paginate) {
          var items = [{},{},{},{}];
          $paginate(items).then(function(data) {
            expect(typeof data.total).toBe('number');
          });
        });
      });
    });
  });
});
