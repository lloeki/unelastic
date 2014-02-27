(function () {

var debug = 0;
var mode;

//mode = 'css'
mode = 'js'
//mode = 'hybrid'

var scroll = function(e) {
    var stopScroll = false;
    var stopScrollX = false;
    var stopScrollY = false;

    var deltaX = e.wheelDeltaX;
    var deltaY = e.wheelDeltaY;

    var scrollToX = window.scrollX - deltaX;
    var scrollToY = window.scrollY - deltaY;

    var scrollMaxX = document.body.scrollWidth - window.innerWidth;
    var scrollMaxY = document.body.scrollHeight - window.innerHeight;

    var scrollX = window.scrollX;
    var scrollY = window.scrollY;

    if (debug > 1) {
        console.log("body", document.body.scrollWidth, document.body.scrollHeight);
        console.log("window", window.innerWidth, window.innerHeight);
        console.log("scroll", window.scrollX, window.scrollY);
        console.log("scrollMax", scrollMaxX, scrollMaxY);
        console.log("delta", deltaX, deltaY);
    }

    if (deltaX > 0 && scrollX <= 0) {
        stopScrollX = true;
        scrollToX = 0;
    }

    if (deltaY > 0 && scrollY <= 0) {
        stopScrollY = true;
        scrollToY = 0;
    }

    if (deltaX < 0 && scrollX >= scrollMaxX) {
        stopScrollX = true;
        scrollToX = scrollMaxX;
    }

    if (deltaY < 0 && scrollY >= scrollMaxY) {
        stopScrollY = true;
        scrollToY = scrollMaxY;
    }

    if (debug > 0) {
        console.log("stopScroll", stopScrollX, stopScrollY);
    }

    if (mode == 'hybrid') {
        document.documentElement.classList.remove('unelasticX');
        document.documentElement.classList.remove('unelasticY');

        if (stopScrollX) {
            document.documentElement.classList.add('unelasticX');
        }

        if (stopScrollY) {
            document.documentElement.classList.add('unelasticY');
        }
    }

    if (mode == 'js') {
        if (stopScrollX || stopScrollY) {
            e.preventDefault();
            e.stopPropagation();
            window.scroll(scrollToX, scrollToY);
        }

        return (stopScrollX || stopScrollY);
    }
};

if (mode == 'hybrid' || mode == 'js') {
    document.addEventListener('mousewheel', scroll, false);
}


if (mode == 'css') {
    document.addEventListener('DOMContentLoaded', function() {
        document.documentElement.classList.add('unelastic');
    });
}

})();
