(function(angular) {
	
	var module = angular.module('slideshowDemo', ['mk.slideshow']);

    module.controller('RootCtrl', ['$scope', '$location', function($scope, $location) {
		
		$scope.urls = [
			'http://upload.wikimedia.org/wikipedia/commons/b/b1/Bijilo-Portrait-of-a-Callithrix-Monkey.jpg',
			'http://www.thelostogle.com/wp-content/uploads/2013/12/happy-monkey.jpg',
			'http://www.metalsucks.net/wp-content/uploads/2013/03/superfunnypetmonkey01big.jpg',
			'http://www.newscientist.com/blogs/shortsharpscience/assets_c/2011/07/SelfMonkey-thumb-600x723-131986.jpg',
			'http://intervexion.com/wp-content/uploads/2012/12/monkey.jpg',
			'http://upload.wikimedia.org/wikipedia/commons/0/0d/Northern_Pigtailed_macaque_at_Koh_Lanta_Yai_Monkey_School.JPG'
		];
		
		$scope.exitCalled = function() {
			$scope.slideshow = false;
		};
		
		$scope.slideshow = false;
	}]);
	
})(angular);