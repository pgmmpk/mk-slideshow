# mk.slideshow

An AngularJS component for creating slide shows.

## Demo

1. Minimal: [Monkeys](http://pgmmpk.github.io/mk-slideshow/dist/samples/minimal.html)
            ([source](https://github.com/pgmmpk/mk-slideshow/blob/master/dist/samples/minimal.html))
2. Triggered by button: [Monkeys](http://pgmmpk.github.io/mk-slideshow/dist/samples/button.html)
            ([source](https://github.com/pgmmpk/mk-slideshow/blob/master/dist/samples/button.html))
3. Slide show powered by Google image search: [Donkeys](http://pgmmpk.github.io/mk-slideshow/dist/samples/search.html)
            ([source](https://github.com/pgmmpk/mk-slideshow/blob/master/dist/samples/search.html))

## Requirements

1. `angular.js`
2. `angular-animate.js`
2. `angular-touch.js`
3. `bootstrap.css`
4. `font-awesome.css`
5. `jquery.js`

## Features
1. Auto-play mode available: will automatically start slide show (if set)
2. Smart background image loading: if playing, tries to pre-fetch images in background. If not playing, loads only on-demand
   (when user flips slides).
3. Suitable for single-image preview - use `start-index` together with `auto-play=false`.
4. Mobile-ready.

## Usage

1. Add required dependencies to your web page. See [Sample](https://github.com/pgmmpk/mk-slideshow/blob/master/dist/sample1.html).

2. Add script and css resources to your web page:

	```html
	<script src="//pgmmpk.github.io/mk-slideshow/dist/0.0.2/mk.slideshow.min.js"></script>
	<link href="//pgmmpk.github.io/mk-slideshow/dist/0.0.2/mk.slideshow.css" rel="stylesheet">
	```

3. Add module dependency to your AngularJS app:

	```javascript
	...
	var app = angular.modume('myApp', ['mk.slideshow']);
	...
	```

4. Now `mk-slides` and `mk-slide` elements are available - use them in your markup, like this:

	```html
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
3. `on-exit`      --- define here the code to be executed when user clicks "close" button in the UI. Sensible thing to do is to hide the slideshow component.
4. `start-index`  --- first slide to show. Defaults to 0 (shows from the beginning). This is useful if you want to show a specific image from a collection,
						but also allow user to browse other images and/or run the slideshow.

## License
MIT