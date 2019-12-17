var btn;
var instruction;
var content;
var myAlert;
var keyboardContainer;
var speakerIcon;
var contentLine;
var lineRoom;
var linePadding;

// detect touch
// include the 'heartz' as a way to have a non matching MQ to help terminate the join
// https://git.io/vznFH
function is_touch_device() {
    var prefixes = ' -webkit- -moz- -o- -ms- '.split(' ');
    var mq = function (query) {
        return window.matchMedia(query).matches;
    }

    if (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) {
        return true;
    }

    var query = ['(', prefixes.join('touch-enabled),('), 'heartz', ')'].join('');
    return mq(query);
}


$(function () {
    btn = $('#close-btn');
    instruction = $('#instruction');
    content = $('#content');
    myAlert = $('#alert');
    keyboardContainer = $('.keyboard-container');
    speakerIcon = $('#speaker-icon');
    contentLine = $('.content-line');

    // assign click event 
    $(btn).on('click', function () {
        $(instruction).hide();
    });

    // adjusting instruction composition
    lineRoom = $(content).outerWidth(true) - $(keyboardContainer).outerWidth(true) - $(speakerIcon).outerWidth(true);
    linePadding = lineRoom * 0.1 - 1;
    $(contentLine).css({
        'width': lineRoom * 0.8,
        'margin-right': linePadding,
        'margin-left': linePadding
    });

    // reCal the insturction composition when resize
    $(window).resize(function () {
        lineRoom = $(content).outerWidth(true) - $(keyboardContainer).outerWidth(true) - $(speakerIcon).outerWidth(true);
        linePadding = lineRoom * 0.1 - 1;
        $(contentLine).css({
            'width': lineRoom * 0.8,
            'margin-right': linePadding,
            'margin-left': linePadding
        });
    });

    // alert if is touch device;

    if (is_touch_device()) {
        $(content).css({
            'display': 'none'
        });
        $(myAlert).css({
            'display': 'block'
        });
        $(instruction).css({
            'width': '100%',
            'height': '100%'
        });
    }
});
