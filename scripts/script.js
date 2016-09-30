
$(document).ready(function($) {

    'use strict';

    // global variables
    var $rootObjest = $('html'),
        windowObject = $(window),
        $document = $(document),
        $alert = $('.alert'),
        desktopMinSize = 721,
        mobileSize = 720;

    $('.waypoint-nav').waypoint(function(){
        $('#primary-navigation').toggleClass('fixed');
    },{offset:'86px'});

    $(".mouse").click(function() {
        $('html, body').animate({
            scrollTop: $(".row-1").offset().top -78
        }, 400);
    });

    windowObject.load(mobileViewUpdate);
    windowObject.resize(mobileViewUpdate);

    // mobile

    var $links = $('#links');

    $('#toggle-menu').on('click',function(e){
        e.preventDefault();

        $(this).toggleClass('x');

        $links.toggleClass('show');

    });


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
                    $alert.html('<p>Thank you for message!</p>').fadeIn('fast');
                    setTimeout(function(){
                        $('#feedback').animate({bottom:'-564px'}, 200)
                    }, 200);
                    setTimeout(function(){
                        $alert.fadeOut('fast');
                    }, 2100);
                    $('form')[0].reset();
                }
                else {
                    $alert.html('<p>'+data.error+'</p>').fadeIn('fast');
                    setTimeout(function(){
                        $alert.fadeOut('fast');
                    }, 2100);
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
    if($('html').hasClass('desktop')) {
        $('#feedback').animate({bottom:'1px'}, 200)
    }
    else {
        $('#feedback').animate({left:'0'}, 200)
    }

}

function closeFeedback() {
    if($('html').hasClass('desktop')) {
        $('#feedback').animate({bottom: '-564px'}, 200)
    }
    else {
        $('#feedback').animate({left:'-100%'}, 200)
    }
}

function mobileViewUpdate() {
    var viewportWidth = $(window).width();
    if (viewportWidth <= 720) {
        $("html").removeClass("desktop").addClass("mobile");
    }
    else {
        $("html").removeClass("mobile").addClass("desktop");
        $("#feedback").removeAttr('style');
    }
}

