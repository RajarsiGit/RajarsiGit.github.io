jQuery(window).on('load', function() {
	"use strict";
    // HIDE PRELOADER
    $(".preloader").addClass("hide-preloader");   
    // SHOW/ANIMATE ANIMATION CONTAINER
    setTimeout(function(){
        $("#intro .animation-container").each(function() {
            var e = $(this);
            setTimeout(function(){
                e.addClass("run-animation");
            }, e.data("animation-delay") );
        });
    }, 700 );
});

jQuery(document).ready(function($) {
	"use strict";
    // SMOOTH SCROLL FOR SAME PAGE LINKS
    $(document).on('click', 'a.smooth-scroll', function(event) {
        // event.preventDefault();
        $('html, body').animate({
            scrollTop: $( $.attr(this, 'href') ).offset().top - 80
        }, 500);
    });
    
    // SCROLL REVEAL SETUP
    window.sr = ScrollReveal();
    sr.reveal(".scroll-animated-from-right", { 
        duration: 600,
        delay: 0,
        origin: "right",
        rotate: { x: 0, y: 0, z: 0 },
        opacity: 0,
        distance: "20vh",
        viewFactor: 0.4,
        scale: 1,
    });
    
    // AJAX CONTACT FORM SUBMIT
    $("#contact-form").submit(function(e) {
        // e.preventDefault();
        var postdata = $(this).serialize();
        var url = $(this).attr('action');
        var name = $('#contact-form-name').val();
        var email = $('#contact-form-email').val();
        var body = $('#contact-form-message').val();
        $.ajax({
            type: "POST",
            url: url,
            data: postdata,
            dataType: "json",
            success: function(json) {
                $("#contact-form input, #contact-form textarea").removeClass("error");
                setTimeout(function(){
                    if (json.nameMessage === "x") {
                        $("#contact-form-name").addClass("error");
                    }
                    if (json.emailMessage === "x") {
                        $("#contact-form-email").addClass("error");
                    }
                    if (json.messageMessage === "x") {
                        $("#contact-form-message").addClass("error");
                    }
                    if (json.captchaMessage === "x") {
                        alert("Please check I'm not a robot!");
                    }
                }, 10);
                if (json.nameMessage === "" && json.emailMessage === "" && json.messageMessage === "" && json.captchaMessage === "") {
                    $("#contact-form.error input, #contact-form.error textarea").removeClass("error");
                    $('#contact-form').addClass("success");
                    $('#contact-form textarea, #contact-form input').attr("placeholder", "");
                    $('#contact-form input, #contact-form button, #contact-form textarea').val('').prop('disabled', true);
                    $('#g-recaptcha').hide();
                }
            },
            error: function() {
                $("#contact-form input, #contact-form textarea").removeClass("error");
                setTimeout(function(){
                    if (name === "") {
                        $("#contact-form-name").addClass("error");
                    }
                    if (email === "") {
                        $("#contact-form-email").addClass("error");
                    }
                    if (body === "") {
                        $("#contact-form-message").addClass("error");
                    }
                    if (name !== "" && email !== "" && body !== "") {
                        Email.send({
                            Host: "smtp.gmail.com",
                            Username: "rajarsi3997@gmail.com",
                            Password: "hdpnakgvwjpauohh",
                            To: 'rajarsi3997@gmail.com',
                            From: name + " " + email,
                            Subject: "Message fron Resume Website",
                            Body: body,
                        })
                        .then(function (message) {
                            $("#contact-form.error input, #contact-form.error textarea").removeClass("error");
                            $('#contact-form').addClass("success");
                            $('#contact-form textarea, #contact-form input').attr("placeholder", "");
                            $('#contact-form input, #contact-form button, #contact-form textarea').val('').prop('disabled', true);
                            $('#g-recaptcha').hide();
                        });
                    }
                }, 10);
            }
        });
    });
});