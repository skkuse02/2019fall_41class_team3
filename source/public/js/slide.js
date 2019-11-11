jQuery(document).ready(function($) {

    // 버튼 애니메이션 구현
    $('#slide').hover(function() {
        $(this).find('.prev, .next').clearQueue().stop().fadeIn();
    }, function() {
        $(this).find('.prev, .next').clearQueue().stop().fadeOut();
    });

    // 슬라이드 애니메이션 구현
    $('#slide > .prev').click(function() {
        var index = $('#slide .list li:visible').index();
        var prev = (index == 0 ? $('#slide .list li').length - 1 : index - 1);

        if (!$('#slide .list li').is(':animated')) {
            $('#slide .list li').eq(index).css('z-index', -1);
            $('#slide .list li').eq(prev).css('z-index', 0).fadeIn(function() {
                $('#slide .list li').eq(index).hide();
            });
        }
    });
    $('#slide > .next').click(function() {
        var index = $('#slide .list li:visible').index();
        var next = (index == $('#slide .list li').length - 1 ? 0 : index + 1);

        if (!$('#slide .list li').is(':animated')) {
            $('#slide .list li').eq(index).css('z-index', -1);
            $('#slide .list li').eq(next).css('z-index', 0).fadeIn(function() {
                $('#slide .list li').eq(index).hide();
            });
        }
    });
    setInterval(function() {
        $('#slide > .next').click();
    }, 5000);
});