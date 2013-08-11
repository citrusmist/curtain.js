function aboveCurtainHeight( $curtain ) {
	var height = 0,
      $curtainsAbove = $curtain.prevAll();

	for (var j = $curtainsAbove.length - 1; j >= 0; j--) {
		height += $curtainsAbove.eq(j).outerHeight();
	}

	return height;
}
