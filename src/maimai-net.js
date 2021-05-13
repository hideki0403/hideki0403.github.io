(function () {
    $('button').each((i, e) => {
        s = $(e).children().attr('src')
        $(e).replaceWith(`<a href="${s}" download="${s.replace(/.*user\/.{24}/, 'maimai-')}.png" target="_blank">${$(e).html()}</a>`)
    })
    $('.container').text('タップすると画像を新しいタブで開きます')
})()

(function(){$('button').each((i,e)=>{s=$(e).children().attr('src');$(e).replaceWith(`<a href="${s}" download="${s.replace(/.*user\/.{24}/,'maimai-')}.png" target="_blank">${$(e).html()}</a>`)});$('.container').text('ダウンロードしたい画像を選択してください')})()