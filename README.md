# mk.slideshow

An AngularJS component for creating slide shows.

## Demo

[Monkeys](http://pgmmpk.github.io/mk-slideshow/dist/sample1.html)
([source](https://github.com/pgmmpk/mk-slideshow/blob/master/dist/sample1.html))

## Requirements

1. `angular.js`
2. `angular-animate.js`
2. `angular-touch.js`
3. `bootstrap.css`
4. `font-awesome.css`
5. `jquery.js`

## Usage

1. Add script and css resources to your web page:

	```
	<script src="//pgmmpk.github.io/mk-slideshow/dist/mk.slideshow.min.js"></script>
	<link href="//pgmmpk.github.io/mk-slideshow/dist/mk.slideshow.css" rel="stylesheet">
	```

2. Add module dependency to your AngularJS app:

	```
	...
	var app = angular.modume('myApp', ['mk.slideshow', 'ngAnimate']);
	...
	```

3. Now `mk-slides` and `mk-slide` elements are available - use them in your markup, like this:

	```
	<mk-slides>
		<mk-slide url='image1.jpg' />
		<mk-slide url='image2.jpg' />
		...
	</mk-slides>
	```

## Options

Directive `mk-slides` comes with number of useful attributes (a.k.a. options):

1. `auto-start`   --- if defined to anything but 'false', slideshow will automatically start playing as soon as the page loads. Defaults to no auto-start.
2. `showing-time` --- defines how fast slideshow goes. This value is the number of milliseconds for one slide to show. Default is 3000 (3 secs).
3. `on-exit`      --- define here code to be executed when user clicks "close" button in the UI. Sensible thing to do is to hide the slideshow component.
4. `start-index`  --- first slide to show. Defaults to 0 (shows from the beginning). This is useful if you want to show a specific image from a collection,
						but allow user to browse other images and/or run the slideshow.

## License
MIT