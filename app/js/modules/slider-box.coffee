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
    do @_initSlider
    do @initSimpleScene


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
    if progress > 0 && progress < .3
      @whichSlide = 1
      do @makeFade
      setTimeout =>
        @sliderTrack.css
          '-webkit-transform': 'translate(0,0)'
          'transform': 'translate(0,0)'
      , 250

    if progress > .3 && progress < .6
      @whichSlide = 2
      do @makeFade
      setTimeout =>
        @sliderTrack.css
          '-webkit-transform': 'translate(0,'+ (-1)*@heightSlide+'px)'
          'transform': 'translate(0,'+ (-1)*@heightSlide+'px)'
      , 250

    if progress > .6
      @whichSlide = 3
      do @makeFade
      setTimeout =>
        @sliderTrack.css
          '-webkit-transform': 'translate(0,'+ (-1)*@heightSlide+'px)'
          'transform': 'translate(0,'+ (-2)*@heightSlide+'px)'
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
    @duration = (@count+1)*@heightSlide + 815


module.exports = SliderBox
