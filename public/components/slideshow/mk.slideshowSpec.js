
describe('ZuzaImgLoader', function() {
	var loader = null, rootScope = null;
	
	beforeEach(function() {
		module('zuza.slideshow');
		inject(function(ZuzaImgLoader, $timeout, $rootScope) {
			loader = ZuzaImgLoader();
			rootScope = $rootScope;
		});
	});
	
	it('must correctly load a single image', function(done) {
		loader.images(['http://upload.wikimedia.org/wikipedia/commons/4/4b/Two_silhouette_profile_or_a_white_vase.jpg']);
		loader.start();
		
		loader.promise(0).then(done);
		
		rootScope.$digest();
	});
});