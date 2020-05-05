$(document).ready(function() {
    $('.sidenav').sidenav()
})

const Base64 = {
    encode: function(str) {
        return btoa(unescape(encodeURIComponent(str)))
    },
    decode: function(str) {
        return decodeURIComponent(escape(atob(str)))
    }
}

function takeover() {
    var temp = {}
    for(var i = 0; i < localStorage.length; i++ ){
        var key = localStorage.key(i)
        temp[key] = localStorage.getItem(key)
    }

    $.ajax({
        url:'https://sp-wtr-api.gq/api/v1/circlelist/move-data-send',
        type:'POST',
        data: temp
    })
    .done(data => {
        console.log(data)
        location.href = 'https://circlelist.ga/?movedata=' + data.id
    })
    .fail(data => {
        M.toast({html: '<b class="red-text text-accent-1" style="font-weight: bold;">引き継ぎ用データをサーバーに送信出来ませんでした。時間を置いて再度お試しください。</b>'})
    })
}