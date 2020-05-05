var tm = $('.team_member_block')

for(var i = 0; tm.length > i; i++) {
    $(tm[i]).find('.member_block_info').find('.font_small').text().replace('RATING : ', '')
}