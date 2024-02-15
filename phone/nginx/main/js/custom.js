// JavaScript Document
(function ($) {



    $(document).ready(function () {



        var audio = document.getElementById('audio');
        $('html').on('touchstart', function () {
            audio.play();
        });
       

    });

}(jQuery));