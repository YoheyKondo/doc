
//Menu, Scroll event 
$(function(){
	$('.scrollDown').on('click',function () {
		$("html,body").animate({
			scrollTop:$('#skill').offset().top
		}, 500);
		event.preventDefault();
	});
	// navigation scroll
	$('nav a').on('click',function(event) {
		var id = $(this).attr("href");
		var offset = 0;
		var target = $(id).offset().top - offset;
		$('html, body').animate({
			scrollTop: target
		}, 500);
		event.preventDefault();
	});
	/* Scroll-Top-Button on click event */
	$('.scrollup').on('click',function () {
		$("html, body").animate({
			scrollTop: 0
		}, 600);
		return false;
	});
	/* BGIMAGE SCROLL EVENT */
	var sections = $('section'), nav = $('nav'), nav_height = nav.outerHeight();
	$(window).on('scroll', function () {
		var cur_pos = $(this).scrollTop();
		sections.each(function() {
			var top = $(this).offset().top - nav_height, bottom = top + $(this).outerHeight();
			//console.log(top);

			
			if (cur_pos >= top - 175 && cur_pos <= bottom + 100) {
				nav.find('a').removeClass('active');
				sections.removeClass('active');
				var this_id = $(this).attr('id');
				console.log(this_id);

				switch (this_id){
					case "work":
						$(this).addClass('slidein');
						break;
					case "ci":
						$(this).addClass('slideleft');
						break;
					case "about":
						$(this).addClass('slideright');
						break;
					case "access":
						$(this).addClass('zoomin');
						break;
					default:
						$(this).addClass('slidein');
						break;
				}
				$(this).addClass('active');
				nav.find('a[href="#'+$(this).attr('id')+'"]').addClass('active');
			}
		});
	});
});
//


//window onload
/*
$(window).on('load', function(){
	//高さ揃え
	resizeHeight();	
})
*/


