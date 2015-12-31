# $       = require 'jquery'
SM      = require './scroll-controller'

class SliderBox
  defaults =
    wrapper: '.slider__block'
    slider: '.slider'
    sliderTrack: '.slider__track'
    sliderItem: '.slider-item'
  constructor: (selector, options) ->
    @init selector, options
    return @

  init: (selector, options = {}) ->
    @el          = if selector instanceof $ then selector else $(selector)
    @props       = $.extend {}, defaults, options
    @wrapper     = @el.parent()
    @slider      = @el.find @props.slider
    @sliderTrack = @el.find @props.sliderTrack
    @sliderItem  = @el.find @props.sliderItem
    @duration    = null
    @count       = @sliderItem.length
    @heightSlide = @sliderItem.outerHeight()
    @whichSlide  = 1
    @prevSlide   = 0
    @myScroll = new IScroll 'body ',
      scrollX: false
      scrollY: true
      scrollbars: false
      probeType: 3
      click: false
      "onScroll":  ->
        console.log SM.controller
        SM.controller.update()

    do @_initSlider
    do @initSimpleScene

    return @

  makeFade: ->
    if (@whichSlide - @prevSlide) isnt 0
      @sliderTrack.css
        'opacity': '0'
      setTimeout =>
        @sliderTrack.css
          'opacity': '1'
      , 500
    @prevSlide = @whichSlide

  scrollSlider: (progress) ->
    for i in [1 ... @count+1]
      if progress > ((i-1) / @count) && progress < ((i) / @count)
        @whichSlide = i
        do @makeFade
        do (i) =>
          setTimeout =>
            @sliderTrack.css
              '-webkit-transform': 'translate(0,'+ (-(i-1))*@heightSlide+'px)'
              'transform': 'translate(0,'+ (-(i-1))*@heightSlide+'px)'
          , 250

  makeFixed: ->
    @el.css
      position: 'fixed'
      top: 0
      left: 0
      right: 0
    @wrapper.css
      height: @el.outerHeight()
      boxSizing: 'content-box'
      paddingBottom: @duration

  makeStatic: ->
    @el.css
      position: ''
      top: ''
      left: ''
      right: ''
    @wrapper.css
      height: ''
      boxSizing: ''
      paddingBottom: ''

  initSimpleScene: ->
    SM.addScene
      duration: @duration
      triggerHook: 'onLeave'
      triggerElement: @wrapper[0]
    .on 'progress', (e) =>
      @scrollSlider e.progress
    .setPin @el[0]



  _initSlider: ->
    wrapperHeight = @wrapper.outerHeight()
    paddingBottom =  (@count+1)*@heightSlide

    @wrapper.css
      height: wrapperHeight
      boxSizing: 'content-box'
      paddingBottom: paddingBottom
    @duration = (@count+2)*@heightSlide




module.exports = SliderBox
