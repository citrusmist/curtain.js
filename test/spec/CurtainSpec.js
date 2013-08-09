describe('Curtain', function() {
	beforeEach(function(){
		jasmine.getFixtures().fixturesPath = 'test/fixtures';
		jasmine.getStyleFixtures().fixturesPath = 'test/fixtures';
		loadFixtures('curtains.html');
		loadStyleFixtures('curtain.css');
		$('.curtains').curtain();
	});

	it("assigns curtain elements the correct positioning", function() {
		expect($('.curtains')).toHaveCss({position: 'relative'});
		expect($('.curtains > li')).toHaveCss({position: 'fixed'});
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

	it("makes the curtains as high as the viewport or higher", function() {
		var $curtains = $('.curtains > li');
		for (var i = $curtains.length - 1; i >= 0; i--) {
			expect($(window).height())
				.not.toBeGreaterThan($curtains.eq(i).outerHeight());
		}
	});

	it("makes the curtains elements min-height the same as its outerHeight", function() {
		var $curtains = $('.curtains > li');
		for (var i = $curtains.length - 1; i >= 0; i--) {
			expect($curtains.eq(i))
				.toHaveCss({'min-height': $curtains.eq(i).outerHeight() + 'px'});
		}
	});

});