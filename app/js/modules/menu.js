
// //smoothscroll start
// 	$('a[href^="#"]').on('click', function (e) {
// 		e.preventDefault();
// 		$(document).off("scroll");

// 		$('.start_nav a').each(function () {
// 			$(this).removeClass('is-active');
// 		})
// 		$(this).addClass('is-active');
		
// 		var target = this.hash,
// 		menu = target;
// 		$target = $('[name='+target.substring(1)+']');

// 		$('html, body').stop().animate({
// 			'scrollTop': $target.offset().top- 90
// 		}, 500, 'swing', function () {
// 			window.location.hash = target;
// 			$(document).on("scroll", onScroll);
// 		});
// 	});

// 	function onScroll(event){
// 		var scrollPos = $(document).scrollTop();
// 		$('.start_nav li a').each(function () {
// 			var currLink = $(this);
// 			var refElement = $('[name='+currLink.attr("href").substring(1)+']');
// 			if (refElement.position().top - 250 <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
// 				$('.start_nav a').removeClass("is-active");
// 				currLink.addClass("is-active");
// 			}
// 			else{
// 				currLink.removeClass("is-active");
// 			}
// 		});
// 	}


// 	$(window).scroll(function() {
// 		if( $(window).width() > 768 ){
// 		   if($(window).scrollTop() >= $('[name=block1]').offset().top-600 ) {
// 			   // alert("bottom!");
// 			   $('body').addClass('active-menu');
// 			} else {
// 				$('body').removeClass('active-menu');
// 			}
// 			if($(window).scrollTop() >= $('[name=block4]').offset().top-200) {
// 				// alert("bottom!");
// 				$('body').addClass('is-review ');
// 				$(".review").addClass('is-show-preview1 is-show-preview2 is-show-preview3');
// 				} else{
// 					$('body').removeClass('is-review ');
// 				}
// 	   }else{	
// 		if($(window).scrollTop() >= 90) {$('body').addClass('gone-logo');}
// 		else {$('body').removeClass('gone-logo');}
// 		// if($(window).scrollTop() >= $('[name=block1]').offset().top-160) {
// 		// 	$('body').addClass('show-title');}
// 		// else {$('body').removeClass('show-title');}
// 		$('body').addClass('is-review ');
// 		$(".review").addClass('is-show-preview1 is-show-preview2 is-show-preview3');
// 		}

// 	});
import events from './events';
export function AnimateMenu(menu) {
	const $menu     = menu instanceof $ ? menu : $(menu);
	const $links    = $(''+ menu + ' a[href^="#"]');
	// console.log( $links instanceof $);
	// console.log($menu instanceof $)
	const $win    = $(window);
	$win.on("scroll", function(){
		events.publish('onScroll');
	});

	 // $win.on("scroll", onScroll1);
	 // $win.on("scroll", onScroll)


	$links.on('click', function (e) {
		e.preventDefault();
		$win.off("scroll");
		$links.each(function () {
			$(this).removeClass('is-active');
		});

		$(this).addClass('is-active');
		let target = this.hash,
		$target = $('[name='+target.substring(1)+']');

		$('html, body').stop().animate({
			'scrollTop': $target.offset().top
		}, 500, 'swing', function () {
			window.location.hash = target;
			$win.on("scroll", onScroll);
		});
	});
	// events.publish('onScroll');
	// function onScroll(event){
	// 	let scrollPos = $win.scrollTop();
	// 	$links.each(function () {
	// 		let currLink = $(this);
	// 		let refElement = $('[name='+currLink.attr("href").substring(1)+']');
	// 		if (refElement.position().top - 80 <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
	// 			$links.removeClass("is-active");
	// 			currLink.addClass("is-active");
	// 		}
	// 		else{
	// 			currLink.removeClass("is-active");
	// 		}
	// 	});
	// }
	const rH = events.subscribe('onScroll', (props) => {
		event =props;
		let scrollPos = $win.scrollTop();
		setInterval(console.log(event),100);
		$links.each(function () {
			let currLink = $(this);
			let refElement = $('[name='+currLink.attr("href").substring(1)+']');
			if (refElement.position().top - 80 <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
				$links.removeClass("is-active");
				currLink.addClass("is-active");
			}
			else{
				currLink.removeClass("is-active");
			}
		});
	});

	function onScroll1(event){
		console.log('onScroll1')
	}

};
