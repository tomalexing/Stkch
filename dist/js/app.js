(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _player = require('./modules/player');

var _player2 = _interopRequireDefault(_player);

var _modal = require('./modules/modal');

var _modal2 = _interopRequireDefault(_modal);

var _menu = require('./modules/menu');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//modal youtube player
_player2.default.initPlayerApi();
new _player2.default.ModalPlayer('#player', '#play');

//new EEe();

(0, _menu.AnimateMenu)('.nav');

// import scroll     from './modules/scroll-controller';
// import events     from './modules/events';
// import animations from './modules/animations';
// import activateFullpage from './modules/fp';

// const $win          = $(window);
// const mq            = window.matchMedia('(min-width: 1024px)');
// let lastSectionName = null;

// // functions
// function disableScroll() {
//     scroll.disable();
//     $.fn.fullpage.setAllowScrolling(false);
//     $.fn.fullpage.setKeyboardScrolling(false);
// }

// function enableScroll() {
//     scroll.enable();
//     $.fn.fullpage.setAllowScrolling(true);
//     $.fn.fullpage.setKeyboardScrolling(true);
// }

// function setAnimationsProgress(val = 0) {
//     for (let key in animations) {
//         if (!animations.hasOwnProperty(key) || key === 'intro') continue;
//         animations[key].progress(val);
//     }
// }

// function windowResizeHandler(mediaQuery) {
//     if (mediaQuery.matches) {
//         setAnimationsProgress(0);
//     } else {
//         setAnimationsProgress(1);
//     }
// }

// // events
// mq.addListener(function() {
//     windowResizeHandler(this);
// });

// $win.on('mousewheel DOMMouseScroll scroll touchmove', (e) => {
//     if (!intro.wasAnimated()) {
//         intro.disableParallax();
//         intro.playAnimations();
//     }
// });

// events.subscribe(events.names.FP_INIT, (props) => {
//     let { slides } = props;
//     let activeSlide = slides.filter('.active');
//     activeSlide.prevAll().addClass('prev');
//     activeSlide.nextAll().addClass('next');
// });

// events.subscribe(events.names.INTRO_END_ANIMATIONS, enableScroll);

// events.subscribe(events.names.FP_BEFORE_CHANGE, (props) => {
//     let { slide, direction } = props;

//     slide.prevAll().removeClass('next').addClass('prev');
//     slide.nextAll().removeClass('prev').addClass('next');

//     switch (direction) {
//     case 'down':
//         slide.addClass('prev');
//         break;
//     case 'up':
//         slide.addClass('next');
//         break;
//     }
// });

// events.subscribe(events.names.FP_AFTER_CHANGE, (props) => {
//     let { slide, index, anchorLink } = props;
//     let sectionAnim = animations[anchorLink];
//     let prevSectionAnim = animations[lastSectionName];

//     slide.removeClass('prev next');

//     $('.pagination__link')
//         .removeClass('is-active')
//         .eq(index - 1)
//         .addClass('is-active');

//     if (mq.matches) {
//         if (sectionAnim) sectionAnim.play();
//         if (prevSectionAnim) prevSectionAnim.progress(0).pause();
//     }
//     lastSectionName = anchorLink;
// });

// // events.subscribe(events.names.FP_LOOP_TOP, (props) => {
// //     disableScroll();
// //     intro.playAnimationsReverse();
// // });

// events.subscribe(events.names.FP_INTRO_FOCUSIN, () => {
//     $('.links').removeClass('is-dark');
//     $('.pagination').removeClass('is-dark');
// });

// events.subscribe(events.names.FP_INTRO_FOCUSOUT, () => {
//     $('.links').addClass('is-dark');
//     $('.pagination').addClass('is-dark');
// });

// // initial actions
// activateFullpage();
// intro.enableParallax();
// disableScroll();
// windowResizeHandler(mq);

},{"./modules/menu":3,"./modules/modal":4,"./modules/player":5}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var events = (function () {
    var topics = {};
    var hOP = topics.hasOwnProperty;

    return {
        subscribe: function subscribe(topic, listener) {
            var index = undefined;
            // Create the topic's object if not yet created
            if (!hOP.call(topics, topic)) topics[topic] = [];

            // Add the listener to queue
            index = topics[topic].push(listener) - 1;

            // Provide handle back for removal of topic
            return {
                remove: function remove() {
                    delete topics[topic][index];
                }
            };
        },
        publish: function publish(topic, info) {
            // If the topic doesn't exist, or there's no listeners in queue, just leave
            if (!hOP.call(topics, topic)) return;

            // Cycle through topics queue, fire!
            topics[topic].forEach(function (item) {
                item(info != undefined ? info : {});
            });
        },
        names: {
            INTRO_END_ANIMATIONS: 'introAnimEnd',
            FP_INTRO_FOCUSIN: 'fpIntroFocusIn',
            FP_INTRO_FOCUSOUT: 'fpIntroFocusOut',
            FP_BEFORE_CHANGE: 'fpBeforeChange',
            FP_AFTER_CHANGE: 'fpAfterChange',
            FP_LOOP_TOP: 'fpLoopTop',
            FP_INIT: 'fpInit'
        }
    };
})();

exports.default = events;

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.AnimateMenu = AnimateMenu;

var _events = require('./events');

var _events2 = _interopRequireDefault(_events);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function AnimateMenu(menu) {
	var $menu = menu instanceof $ ? menu : $(menu);
	var $links = $('' + menu + ' a[href^="#"]');
	// console.log( $links instanceof $);
	// console.log($menu instanceof $)
	var $win = $(window);
	$win.on("scroll", function () {
		_events2.default.publish('onScroll');
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
		var target = this.hash,
		    $target = $('[name=' + target.substring(1) + ']');

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
	var rH = _events2.default.subscribe('onScroll', function (props) {
		event = props;
		var scrollPos = $win.scrollTop();
		setInterval(console.log(event), 100);
		$links.each(function () {
			var currLink = $(this);
			var refElement = $('[name=' + currLink.attr("href").substring(1) + ']');
			if (refElement.position().top - 80 <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
				$links.removeClass("is-active");
				currLink.addClass("is-active");
			} else {
				currLink.removeClass("is-active");
			}
		});
	});

	function onScroll1(event) {
		console.log('onScroll1');
	}
}
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
;

},{"./events":2}],4:[function(require,module,exports){
var openModal;

openModal = function(selector, options) {
  var closeBtn, modal;
  if (options == null) {
    options = {};
  }
  modal = selector instanceof $ ? selector : $(selector);
  closeBtn = modal.find('.modal__close');
  modal.fadeIn(500, function() {
    modal.addClass('is-open');
    return setTimeout(function() {
      return typeof options.afterOpen === "function" ? options.afterOpen() : void 0;
    }, 500);
  });
  return closeBtn.one('click', function(e) {
    e.preventDefault();
    if (typeof options.beforeClose === "function") {
      options.beforeClose();
    }
    return modal.removeClass('is-open').delay(500).fadeOut(500);
  });
};

module.exports = openModal;


},{}],5:[function(require,module,exports){
var EVENT_NAME, ModalPlayer, openModal,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

openModal = require('./modal');

EVENT_NAME = 'YTAPIReady';

module.exports.initPlayerApi = function() {
  var firstScriptTag, tag;
  tag = document.createElement('script');
  tag.src = "https://www.youtube.com/iframe_api";
  firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  return window.onYouTubeIframeAPIReady = function() {
    return $(window).trigger(EVENT_NAME);
  };
};

module.exports.ModalPlayer = ModalPlayer = (function() {
  function ModalPlayer(element, triggerElement, options) {
    if (options == null) {
      options = {};
    }
    this.pauseVideo = bind(this.pauseVideo, this);
    this.playVideo = bind(this.playVideo, this);
    this.init(element, triggerElement, options);
    return this;
  }

  ModalPlayer.prototype.init = function(element, triggerElement, options) {
    this.videoContainer = element instanceof $ ? element : $(element);
    this.triggerElement = triggerElement instanceof $ ? triggerElement : $(triggerElement);
    this.modal = this.videoContainer.parents('.modal');
    this.videoId = options.videoId || this.videoContainer.attr('data-video-id') || 'xEhaVhta7sI';
    this.player = null;
    return this._initEvents();
  };

  ModalPlayer.prototype.playVideo = function() {
    if (this.player) {
      return this.player.playVideo();
    }
  };

  ModalPlayer.prototype.pauseVideo = function() {
    if (this.player) {
      return this.player.pauseVideo();
    }
  };

  ModalPlayer.prototype._buildPlayer = function() {
    return this.player = new YT.Player(this.videoContainer[0], {
      height: '100%',
      width: '100%',
      videoId: this.videoId
    });
  };

  ModalPlayer.prototype._initEvents = function() {
    $(window).on(EVENT_NAME, (function(_this) {
      return function() {
        return _this._buildPlayer();
      };
    })(this));
    return this.triggerElement.on('click', (function(_this) {
      return function(e) {
        e.preventDefault();
        return openModal(_this.modal, {
          afterOpen: _this.playVideo,
          beforeClose: _this.pauseVideo
        });
      };
    })(this));
  };

  return ModalPlayer;

})();


},{"./modal":4}]},{},[1]);

//# sourceMappingURL=app.js.map
