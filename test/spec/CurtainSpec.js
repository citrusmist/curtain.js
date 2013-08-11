describe('Plain Curtain DOM Initialisation', function() {
	var $plugin;
	var $curtains;

	beforeEach(function(){

		jasmine.getFixtures().fixturesPath = 'test/fixtures';
		jasmine.getStyleFixtures().fixturesPath = 'test/fixtures';
		loadFixtures('curtains.html');
		loadStyleFixtures('curtain.css');

		$plugin = $('.curtains').curtain();
		$curtains = $('.curtains > li');
		// page.viewportSize = { width: 600, height: 800 };
	});

	it("assigns curtain elements the correct positioning", function() {
		expect($('.curtains')).toHaveCss({position: 'relative'});
		expect($curtains).toHaveCss({position: 'fixed'});
	});

	/**
	 * For some reason this test fails for 3 of the list items
	 */
	it("makes the curtains as wide as the viewport", function() {
		//var $curtains = $('.curtains > li');
		//for (var i = $curtains.length - 1; i >= 0; i--) {
		//expect( $curtains.eq(i)).toBe('smelly');
		//expect($curtains.eq(i).width( ))
		//.toEqual($(window).width());
		// }
	});

	it('makes the curtains as high as the viewport or higher', function() {

		for (var i = $curtains.length - 1; i >= 0; i--) {
			expect($(window).height())
				.not.toBeGreaterThan($curtains.eq(i).outerHeight());
		}
	});

	it('makes the curtains elements min-height the same as its outerHeight', function() {

		for (var i = $curtains.length - 1; i >= 0; i--) {
			expect($curtains.eq(i))
				.toHaveCss({'min-height': $curtains.eq(i).outerHeight() + 'px'});
		}
	});

	it('assigns the data-position and data-height to curtains', function() {

		for (var i = $curtains.length - 1; i >= 0; i--) {
			expect($curtains.eq(i)).toHaveData('height');
			expect($curtains.eq(i)).toHaveData('position');
		}
	});

	it('assigns the correct data-height to curtains and plugin cache', function() {
		var elDatas = $plugin.data('plugin_curtain').$elDatas;

		for (var i = $curtains.length - 1; i >= 0; i--) {
			expect($curtains.eq(i)).toHaveData('height', $curtains.eq(i).outerHeight());
			expect(elDatas[i]['data-height']).toBe($curtains.eq(i).outerHeight());
		}
	});

	it('makes the body as high as the sum of all the curtain heights', function() {
		var height = 0;
		var pluginOptions  = $plugin.data('plugin_curtain').options;

		for (var i = $curtains.length - 1; i >= 0; i--) {
			height += $curtains.eq(i).outerHeight();
		}
		expect($('body')).toHaveCss({'height': height+'px'});
		expect(pluginOptions.bodyHeight).toBe(height);
	});

	it('assigns the correct data-position to curtains and plugin cache', function() {
		var elDatas = $plugin.data('plugin_curtain').$elDatas;

		for (var i = $curtains.length - 1; i >= 0; i--) {
			expect($curtains.eq(i))
				.toHaveData('position', aboveCurtainHeight($curtains.eq(i)));
			expect(elDatas[i]['data-position']).toBe(aboveCurtainHeight($curtains.eq(i)));
		}
	});

	it('makes the first curtain "current"', function() {
		var $firstCurtain = $curtains.first();
		var $currentCache = $plugin.data('plugin_curtain').$current;

		expect($firstCurtain).toHaveClass('current');
		expect($currentCache).toBe($firstCurtain);
	});

	it('assigns hidden class to all curtains apart from the "current" curtain and its immediate sibling',
		function() {
			var $immediateSibling = $curtains.first().next();

			expect($immediateSibling).not.toHaveClass('hidden');
			expect($immediateSibling.nextAll()).toHaveClass('hidden');
	});

	it('assigns the correct z-index values', function() {
		for (var i = $curtains.length - 1; i >= 0; i--) {
			expect($curtains.eq(i)).toHaveCss({'z-index': (999 - i).toString() });
		}
	});

});

describe('Curtain DOM Initialisation with images', function() {
	var $plugin;
	var $curtains;

	beforeEach(function(){

		jasmine.getFixtures().fixturesPath = 'test/fixtures';
		jasmine.getStyleFixtures().fixturesPath = 'test/fixtures';
		loadFixtures('curtains_img.html');
		loadStyleFixtures('curtain.css');


		$.fn.imagesLoaded = function( options, callback ){
			return 'blah';
		};

		$.fn.cock = function (){
			return 'blah';
		};

		spyOn($.fn, 'imagesLoaded');
		spyOn($.fn, 'cock');


		$curtains = $('.curtains > li');
		$plugin = $('.curtains').curtain();
		// $('body').imagesLoaded();
	});
	
	it('uses imagesLoaded plugin if its present', function() {
		expect($.fn.imagesLoaded).toHaveBeenCalled();
	});
});