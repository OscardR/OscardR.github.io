$(function() {
	$('a').on('click', function(e) {
		$(this).closest('li').addClass('active').siblings().removeClass('active');
		$('html, body')
			.animate({
        		scrollTop: $( $.attr(this, 'href') ).offset().top - 50
    		}, 
    		500
    	);
	});
});