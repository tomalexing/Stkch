export function animateMenu(menu, trigger_anchor, anchor_page, trigger_nenu) {
	const $menu     = menu instanceof $ ? menu : $(menu);
	const $trigger_anchor     = trigger_anchor instanceof $ ? trigger_anchor : $(trigger_anchor);
	const $links    = $(''+ menu + ' a[href^="#"]');
	const $anchorLeadToPage    = $(''+ menu + ' a[href^='+anchor_page+']');
	const $openMenuPage    = trigger_nenu instanceof $ ? trigger_nenu : trigger_nenu === undefined ? $('[name='+anchor_page.substring(1)+']') : $('[name='+trigger_nenu+']');
	const $win    = $(window);

	//active menu
	$win.on("scroll",function() {
		let scrollPos = $win.scrollTop();
		if ($openMenuPage.position().top - 80 <= scrollPos ) {
			$('.out').addClass('is-menu-open')
		}else{
			$('.out').removeClass('is-menu-open')
		};
	

	});

	//add active class
	$links.on('click', function (e) {
		e.preventDefault();

		$win.off("scroll",onScroll);
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
			$win.on("scroll",onScroll);
		});
	});
	// anchore
	$trigger_anchor.on('click',function(){
		$links.trigger.call($anchorLeadToPage,"click" );
	})
	// clickable scroll menu
	$win.on("scroll",onScroll);
	function onScroll(e){
		let scrollPos = $win.scrollTop();
		$links.each(function () {
			let currLink = $(this);
			let refElement = $('[name='+currLink.attr("href").substring(1)+']');
			if (refElement.position().top - 80 <= scrollPos && refElement.position().top + refElement.outerHeight() > scrollPos) {
				$links.removeClass("is-active");
				currLink.addClass("is-active");
			}	
			else{
				currLink.removeClass("is-active");
			}
		});
	}


};


