
jQuery(document).ready(function($) {

    $('.navigate').on('click',function(e){
        e.preventDefault();
        $target = $($(this).attr('href'));
        scrollTo($target);
    });

    $('.waypoint-nav').waypoint(function(){
        $('#primary-navigation').toggleClass('fixed');
    },{offset:'86px'});

    // blog page

    $('#load-more').on('click',function(e){

        e.preventDefault();

        var $content = $('#content');
        var $this = $(this).attr('disabled',true);
        var next = $(this).data('next');
        var max = $(this).data('max');
        var url = $(this).attr('href');

        $.get(url, {paged: next}, function(data, textStatus, xhr) {

            var html = $(data).find('#content').html();

            $content.append(html);

            $this.data('next',next++).removeAttr('disabled');

            if (next > max) {
                $this.remove();
            }

        });

    });

    $(".mouse").click(function() {
        $('html, body').animate({
            scrollTop: $(".row-1").offset().top -78
        }, 400);
    });



    function inputCheck($input){

        if ($input.val() == '') {
            $input.parent().addClass('error');
        }else{
            $input.parent().removeClass('error');
        }

    }


    // work page

    $('.project-excerpt').each(function(index) {
        var ind = index * 175;
        var test = $(this);
        setTimeout(function(){
            test.removeClass('hidden');
        }, ind);
    });

    if (!Modernizr.touch) {

        $(window).load(function(){

            var workleftwidth = parseInt($('#work-pagers .left').outerWidth(),10);
            var workrightwidth = parseInt($('#work-pagers .right').outerWidth(),10);

            var left = workleftwidth-70;
            var right = workrightwidth-70;

            $('#work-pagers .left').css({marginLeft: '-'+ left +'px'}).removeClass('hidden');
            $('#work-pagers .right').css({marginRight: '-'+ right + 'px'}).removeClass('hidden');


        });

    }

    // mobile

    var $links = $('#links');

    $('#toggle-menu').on('click',function(e){
        e.preventDefault();

        $(this).toggleClass('x');

        $links.toggleClass('show');

    });

    preload();

    $('.rollover').on('mouseenter',function(){
        switchSrc($(this));
    })

    $('.rollover').on('mouseleave',function(){
        switchSrc($(this));
    })


    // helpers

    function scrollTo($element){
        $('html, body').animate({scrollTop: $element.offset().top-90}, 500);
    }

    function switchSrc($object){

        var original = $object.attr('src');
        var replacement = $object.data('rollover');

        $object.attr('src',replacement).data('rollover',original);

    }

    function preload(){

        var images = [];

        $('.rollover').each(function(i) {
            images[i] = new Image();
            images[i].src = $(this).data('rollover');
        });

    }

    $("#feedback-form").submit(function(e) {

        var url = "php/mail.php"; // the script where you handle the form input.

        $.ajax({
            type: "POST",
            url: url,
            dataType: 'json', // oтвeт ждeм в json фoрмaтe
            data: $("#feedback-form").serialize(), // serializes the form's elements.
            success: function(data, textStatus, jqXHR)
            {
                console.log(data); // show response from the php script.
                if(data.error == 0) {
                    $('.alert').fadeIn('fast');
                    setTimeout(function(){
                        $('#feedback').animate({bottom:'-564px'}, 200)
                    }, 200);
                    setTimeout(function(){
                        $('.alert').fadeOut('fast');
                    }, 2100);
                    $('#mail-address, #mail-name, #mail-text').text();
                }
            },
            error: function(jqXHR, textStatus, errorThrown)
            {
               console.log(errorThrown);
               console.log(textStatus);
            }
        });

        e.preventDefault(); //STOP default action
    });
});

function getInTouch() {
    $('#feedback').animate({bottom:'1px'}, 200)
}

function closeFeedback() {
    $('#feedback').animate({bottom:'-564px'}, 200)
}

