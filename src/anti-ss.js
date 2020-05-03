fetch('https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js').then(res => res.text()).then(txt => eval(txt)).then(() => {
    hws = $($('ul')[1]).children('li')
    main()
})

function main() {
    setTimeout(function() {
        for(var i = 0; hws.length > i; i++) {
            var hw = $(hws[i])
            if(findNotYet(hw)) {
                hw.children('a')[0].click()
                setTimeout(function() {
                    $('.bmpui-image')[0].click()
                    $('video').on('ended', function() {main()})
                }, 2500)
                break
            }
    
            if(hws.length === i) {
                alert('完了')
            }
        }
    }, 2500)
}

function findNotYet(hw) {
    if(hw.find('use').attr('xlink:href') === '#notyet' && !hw.text().match('確認テスト')) {
        return true
    } else {
        return false
    }
}