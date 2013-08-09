describe('Curtain', function() {
	beforeEach(function(){
		jasmine.getFixtures().fixturesPath = 'test/fixtures';
		jasmine.getStyleFixtures().fixturesPath = 'test/fixtures';
		loadFixtures('curtains.html');
		loadStyleFixtures('curtain.css');
		$('.curtains').curtain();
	});

	it("has the correct DOM structure", function() {
		expect($('.curtains')).toExist();
		expect($('.curtains')).toContain('li');
	});

	it("assigns curtain elements the correct positioning", function() {
		expect($('.curtains')).toHaveCss({position: 'relative'});
		expect($('.curtains > li')).toHaveCss({position: 'fixed'});
	});

});