$(document).ready(function() {
    M.updateTextFields()
})

$('#base-score').on('input', function() {
    var base_score = $(this).val()
    var info = $('#info')

    if(base_score < 10000000) {
        info.text('スコアは10,000,000以上を入力してください')
        $('#goal-score').prop('disabled', true)
    } else {
        $('#goal-score').prop('disabled', false)
        info.text('')
        var notes = base_score - 10000000
        var note_score = Math.round(10000000 / notes)

        $('#result-notes').text(notes)
        $('#result-score').text(note_score)
    }
})

$('#goal-score').on('input', function() {
    var goal_score = $(this).val()
    var info = $('#info2')
    if(goal_score > 10000000) {
        info.text('スコアは10,000,000以下を入力してください (PM前提のスコア計算はできません)')
    } else {
        info.text('')
        var note_score = $('#result-score').text()
        var score_tmp = (10000000 - goal_score)

        var goal = Math.round(score_tmp / note_score)

        $('#goal-lost').text(goal)
        $('#goal-far').text(goal * 2)
        
    }
})