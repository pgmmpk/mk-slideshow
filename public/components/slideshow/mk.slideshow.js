(function(angular) {
	'use strict';
	
	var module = angular.module('mk.slideshow', []);
	
	module.directive('mkSlides', [function() {
		return {
			restrict   : 'E',
			scope: {
				showingTime : '@',
				autoPlay    : '@',
				onExit      : '&'
			},
			transclude : true,
			replace    : true,
			template   : 
				'<div class="slides-container">' + 
					'<div class="slides" ng-transclude/>' +
					
					'<form class="controls controls-color" ng-class=\'{"ephemeral": !canPlay() || (hidden && playing)}\' ng-click="togglePlay()">' +
						'<i class="fa fa-play fa-2x" ng-hide="playing"></i>' +
						'<i class="fa fa-pause fa-2x" ng-hide="!playing"></i>' +
					'</form>' +
			
					'<form class="left-pager controls-color" ng-class=\'{"ephemeral": !canPrev() || (hidden && playing)}\' ng-click="pause(); prev()">' +
						'<i class="fa fa-chevron-left fa-2x"></i>' +
					'</form>' +
		
					'<form class="right-pager controls-color" ng-class=\'{"ephemeral": !canNext() || (hidden && playing)}\' ng-click="pause(); next()">' +
						'<i class="fa fa-chevron-right fa-2x"></i>' +
					'</form>' +
				
					'<form class="closer controls-color" ng-class=\'{"ephemeral": canPlay() && hidden && playing}\' ng-click="pause(); exit()">' +
						'<i class="fa fa-times fa-2x"></i>' +
					'</form>' +
				'</div>',
			controller: 'MkSlideshowCtrl',
			link: function(scope, elm, attrs, ctrl) {
				
				var eventTarget = null;
				
				elm.on('mousemove', function(evt) {
					if (evt.target === eventTarget) { // worksaround chrome issuing bogus mousemove when image shows...
						ctrl.registerActivity();
						scope.$apply();
					}
					eventTarget = evt.target;
				}).on('touchstart', function() {
					ctrl.registerActivity();
					scope.$apply();
				});

				scope.$on('$destroy', function() {
					elm.off('mousemove').off('touchstart');
				});
			}
		};
	}]);
	
	module.directive('mkSlide', [function() {
		
		return {
			restrict: 'E',
			require : '^mkSlides',
			replace : true,
			scope   : true,
			template:
				'<div class="slide" ng-show="slide.showing">' + 
					'<div class="slide-not-ready" ng-hide="slide.ready">' +
						'<i class="fa fa-spinner fa-spin fa-2x spinner"></i>' +
					'</div>' +
					'<div class="slide-ready" ng-show="slide.ready">' +
						'<img></img>' +
					'</div' +
				'</div',
			link    : function(scope, elm, attrs, ctrl) {
				var img = elm.find('img');
				
				attrs.$observe('url', function() {
					if (attrs.url && !scope.slide) {
						scope.slide = ctrl.addSlide(img, attrs.url);

						scope.slide.promise.then(function(slide) {
							var img = slide.elm;
							
							scope.$watch(function() {
								return elm.parent().height() ^ elm.parent().width();
							}, function() {
								
								var width = elm.parent().width();
								var height = elm.parent().height();
								
								var h = img[0].naturalHeight;
								var w = img[0].naturalWidth;
								
								if (width * h > height * w) {
									w = w * height / h;
									h = height;
								} else {
									h = h * width / w;
									w = width;
								}

								img.attr('width', w + 'px').attr('height', h + 'px');
							});
						});
					}
				});
			}
		};
	}]);
	
	module.controller('MkSlideshowCtrl', ['$scope', '$timeout', '$q', 
	                                        function($scope, $timeout, $q) {
		var slides = [];
		
		var currentIndex = 0;
		
		$scope.hidden = false;
		$scope.playing = false;
		$scope.autoPlay = $scope.autoPlay && ($scope.autoPlay !== 'false');
		
		if ($scope.autoPlay) {
			$scope.playing = true;
			$scope.hidden = true;
			$timeout(function() {
				showFrame();
			});
		}
		
		function scheduleNext() {
			
			if (!$scope.playing) {
				return;
			}
			
			$timeout(function() {
				if ($scope.playing && $scope.canNext()) {
					$scope.next();
				} else {
					$scope.pause();
				}
			}, $scope.showingTime || 3000);

		}

		function showFrame() {
			$scope.loading = true;
			
			slides.forEach(function(slide) {
				slide.showing = false;
			});
			
			var slide = slides[currentIndex];
			if (!slide) {
				return;
			}
			slide.showing = true;
			slide.promise.then(function() {
				$scope.loading = false;
				scheduleNext();
			}, function(error) {
				console.log("slide failed to load", slide);
				$scope.loading = false;
				scheduleNext();
			});
		}
		
		$scope.play = function() {

			if (currentIndex >= slides.length - 1) {
				currentIndex = 0;
			}
			
			$scope.playing = true;
			registerActivity();
			showFrame();
		};
		
		$scope.canPlay = function() {
			return slides.length > 1;
		};

		$scope.pause = function() {
			
			if (!$scope.playing) {
				return;
			}
			
			$scope.playing = false;
		};
		
		$scope.togglePlay = function() {
			if ($scope.playing) {
				$scope.pause();
			} else {
				$scope.play();
			}
		};
		
		$scope.next = function() {

			if ($scope.canNext()) {
				currentIndex += 1;
				showFrame();
			}
		};
		
		$scope.canNext = function() {
			return currentIndex < slides.length - 1;
		};
		
		$scope.prev = function() {

			if ($scope.canPrev()) {
				currentIndex -= 1;
				showFrame();
			}
		};
		
		$scope.canPrev = function() {
			return currentIndex > 0;
		};
		
		$scope.exit = function() {
			$scope.pause();
			$scope.onExit && $scope.onExit();
		};
		
		if (!$scope.autoPlay) {
			$timeout(function() {
				registerActivity(); // to trigger immediate hide countdown
				showFrame();
			});
		}
		
		function createSlide(elm, src) {
			var defer = $q.defer();
			
			var slide = {
				elm     : elm,
				src     : src,
				ready   : false,
				promise : defer.promise
			};
			
			slide.load = function(cb) {

				if (!slide.elm[0].src) {
					slide.elm[0].src = slide.src;
					slide.elm[0].onload = function() {

						slide.ready = true;

						defer.resolve(slide);
						cb(null, slide);
						$scope.$apply();

					};
					slide.elm[0].onerror = function(err) {
						slide.ready = true;
						slide.error = err;
						defer.reject(err);
						cb(err, slide);
						$scope.$apply();
					};
				} else {
					$timeout(function() {
						cb(slide.error, slide);
					});
				}
			};

			return slide;
		}
		
		var loading = false;
		var stopped = false;
		
		function maybeStartLoading() {
			
			if (loading || stopped) {
				return;
			}
			
			loading = true;
			
			var  i = 0;
			
			(function next() {
				var slide = slides[i++];
				if (!slide) {
					loading = false;
					return;
				}
				
				slide.load(next);
			})();
		}
		
		$scope.$on('$destroy', function() {
			stopped = true;
		});
		
		this.addSlide = function(elm, src) {
			var slide = createSlide(elm, src);
			slides.push( slide );
			
			maybeStartLoading();

			return slide;
		};
		
		// logic related to showing/hiding controls
		var delayedHide = null;
		var hideDelay = 1000; // controls will disappear after this
		
		var registerActivity = this.registerActivity = function() {
			$scope.hidden = false;
			if (delayedHide) {
				$timeout.cancel(delayedHide);
			}
			delayedHide = $timeout(function() {
				delayedHide = null;
				$scope.hidden = true;
			}, hideDelay);
		};
	}]);

})(angular);
