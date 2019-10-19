"use strict";

$(document).ready(function() {

  /**
  * FancyBox 3
  * Docs: http://fancyapps.com/fancybox/3/docs/
  */

  $("[data-fancybox]").fancybox({
    buttons : [
      'close',
    ],
    touch: false
  });


  /**
  * Слайдеры
  * Docs: http://kenwheeler.github.io/slick/
  */

  // слайдер отчетов
  $('.report').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: '<button class="report__arrow slick-prev">Предыдущий</button>',
    nextArrow: '<button class="report__arrow slick-next">Следующий</button>',
    dots: false,
  });

  /**
  * Ползунок
  * Docs: http://api.jqueryui.com/slider/
  */

  var min = Number($('.calc__range').data('min'));
  var max = Number($('.calc__range').data('max'));
  var value = parseInt($('#square').text());

  // цена за квадрат
  var costFirst = Number($('.calc__cost-first').data('square'));
  var costSecond = Number($('.calc__cost-second').data('square'));
  var costThird = Number($('.calc__cost-third').data('square'));

  // цена за фикс. услугу
  var fixSecond = Number($('.calc__cost-second').data('fix'));
  var fixThird = Number($('.calc__cost-third').data('fix'));

  $('.calc__range').slider({
    min: min,
    max: max,
    step: 1,
    value: value,
    range: "min",
    animate: true,
    slide: function( event, ui ) {
      $('#square').text(ui.value);
      var totalFirst = ui.value * costFirst;
      var resultFirst = (totalFirst <= 3500) ? 3500 : totalFirst;

      var totalSecond = ui.value * costSecond + fixSecond;
      var resultSecond = (totalSecond <= 4500) ? 4500 : totalSecond;

      var totalThird = ui.value * costThird + fixThird;
      var resultThird = (totalThird <= 5500) ? 5500 : totalThird;

      $('.calc__cost-first').text(resultFirst);
      $('.calc__cost-second').text(resultSecond);
      $('.calc__cost-third').text(resultThird);
    }
  });

  /**
  * Открыть форму с выбранным типом приемки из калькулятора
  */

  $('.calc__group').click(function() {

    var calcType = $(this).find('.calc__label-type').text();
    var calcCost = $(this).find('[data-square]').text();
    var calcSquare = $('#square').text();

    $('#form_type').show();
    $('#form_calc').show();
    $('#form_type').text(calcType);
    $('#value_type').val(calcType);
    $('#form_cost').text(calcCost);
    $('#value_cost').val(calcCost);
    $('#form_square').text(calcSquare);
    $('#value_square').val(calcSquare);

    $.fancybox.open({
      src  : '#modal-order-calc',
      buttons : [
        'close',
      ],
      touch: false,
      opts : {
          afterClose : function( instance, current ) {
            $('#form_type').hide();
            $('#form_calc').hide();
            $('#value_type, #value_square, #value_cost').val('');
          }
        }
    });

  });


  /**
  * Адаптивное меню
  */

  $('.nav-toggle').click(function(e) {
    e.preventDefault();
    $('.header__nav').toggleClass('header__nav_open');
  });

  $(document).click(function(event) {
    if ($(event.target).closest('.header__nav').length) return;
    $('.header__nav').removeClass('header__nav_open');
    event.stopPropagation();
  });


  /**
  * Та еще стрелка
  */

  if ($('.what__main').length) {

    var mainHeight = $('.what__main').outerHeight();
    // var lastSectionHeight = $('.what__section:last-child').outerHeight();
    // var mainHeightArrow = mainHeight - lastSectionHeight;
    var mainHeightArrow = mainHeight;
    var mainPositionTop = $('.what__main').offset().top;
    var mainPositionCenter = mainPositionTop + mainHeightArrow;

    $(window).scroll(function(){ 
      var scroll = $(window).scrollTop();
      var scrollBottom = scroll + ($(window).height() / 2);

      if (scrollBottom >= mainPositionTop && scrollBottom <= mainPositionCenter) {
        var arrowHeightPx = (mainPositionTop - scrollBottom)*-1;
        $('.what__arrow').css('height', arrowHeightPx+'px');
      }

    });
  }


  /**
  * Плавная прокрутка по якорю
  */

  $('.scroll-link').on('click', function (event) {
    event.preventDefault();
    var target = $(this),
      url = target.attr('href');
    $('html, body').animate({
      scrollTop: $(url).offset().top - 30
    }, 750);
  });


  /**
  * Отправка форм
  */

  $("form").submit(function() {
      var th = $(this);
      $.ajax({
          type: "POST",
          url: "mail.php",
          data: th.serialize()
      }).done(function(data) {

        $.fancybox.close();

        $.fancybox.open({
          src  : '#modal-success',
        });

        setTimeout(function() {
            // очистить форму
            th.trigger("reset");
        }, 1000);

      });
      return false;
  });

});