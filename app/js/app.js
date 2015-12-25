//import  './modules/restore'
import initPlayerApi   from './modules/player'
import ModalPlayer     from './modules/modal'
import {animateMenu}     from './modules/menu'
import SliderBox     from './modules/slider-box'
import {mail}     from './modules/mail'
//modal youtube player
initPlayerApi.initPlayerApi();
new initPlayerApi.ModalPlayer('#player', '#play');
//nemu + anchor
animateMenu('.nav','.anchor-down','#hdiw');
new SliderBox('.slider__block .slider__block-in');
mail('#formOrder');


//$(document).load($(window).bind("resize", openMenu));
let tooglemenu = true;
function openMenu(){
    if($(window).width() <= 768){
    	if(tooglemenu){
	        $(".header").css({
	        	"height" : $(window).height()
	        });
	        tooglemenu = false;
		}else{
			$(".header").css({
				"height" : "80px",
			});
			tooglemenu = true;
		}
    }
};

$('.header').delegate('.mobile__menu','click',function(){
	$(this).toggleClass('openMemu');
	openMenu();
})