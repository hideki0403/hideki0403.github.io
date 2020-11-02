jQuery('body').append('<script src="https://code.jquery.com/jquery-3.4.1.min.js"></script><link rel="stylesheet" href="//unpkg.com/swiper/swiper-bundle.min.css"><script src="//unpkg.com/swiper/swiper-bundle.min.js"></script>')

setTimeout(function() {
    $('#container').prepend('<div class="swiper-container" dir="rtl"><div id="manga-wrapper" class="swiper-wrapper"></div><div class="swiper-button-prev"></div><div class="swiper-button-next"></div><div class="swiper-scrollbar"></div></div>')
    $('figure>div>img').appendTo('#manga-wrapper')
    $('#manga-wrapper>img').addClass('swiper-slide')
    var sw = new Swiper('.swiper-container', {
        slidesPerView: 2,
        keyboard: true,
        pagination: {
          el: '.swiper-pagination',
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        scrollbar: {
          el: '.swiper-scrollbar',
        },
      })
    $('#manga-wrapper>img').css({height: '65vh',width: 'auto'})

    $(window).resize(function() {
        $('#manga-wrapper>img').css({height: '65vh',width: 'auto'})
    })
}, 1000)
