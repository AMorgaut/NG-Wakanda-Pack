// @codekit-prepend "../bower_components/jquery/dist/jquery.min.js"
// @codekit-prepend "../bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/tab.js"
// @codekit-prepend "../bower_components/highlightjs/highlight.pack.js"


jQuery(document).ready(function($) {
	
	// Tabs
	$('.nav-tabs a').click(function(e) {
		e.preventDefault();
		$(this).tab('show');
	});

	// HighlightJs
	hljs.initHighlightingOnLoad();

	// Smooth scroll
	$(function() {
		$('.smooth-scroll').click(function() {
			if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
				var target = $(this.hash);
				target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
				if (target.length) {
					$('html,body').animate({
						scrollTop: target.offset().top
					}, 500);
					return false;
				}
			}
		});
	});

});