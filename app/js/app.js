// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
function onYouTubeIframeAPIReady() {
player = new YT.Player('player', {
  height: '547',
  width: '978',
  videoId: 'M7lc1UVf-VE',
  events: {
    'onReady': onPlayerReady,
    'onStateChange': onPlayerStateChange
  }
});
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
event.target.playVideo();
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;
function onPlayerStateChange(event) {
if (event.data == YT.PlayerState.PLAYING && !done) {
  setTimeout(stopVideo, 6000);
  done = true;
}
}
function stopVideo() {
player.stopVideo();
}




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
