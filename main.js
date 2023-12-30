$(document).ready(function() {
    if (localStorage.getItem('darkMode') === null) {
        localStorage.setItem('darkMode', 'true');
    }

    if (isDarkMode()) {
        $('body').addClass('dark-mode-variables');
    } else {
        $('.dark-mode-toggler span').toggleClass('active');
    }

    $('.dark-mode-toggler').click(function() {
        $('body').toggleClass('dark-mode-variables');
        $('.dark-mode-toggler span').toggleClass('active');
        localStorage.setItem('darkMode', '' + !isDarkMode());
    });

    $('.hamburger').click(function() {
        $('.navbar-content').toggleClass('active');
    });

    $('.navbar-content a').click(function() {
        $('.navbar-content').removeClass('active');
    });

    let currentSlide = 0;
    const slides = $('.slide');

    function showSlide(n) {
        slides.each(function(index) {
            const distance = index - n;
            const slide = $(this);

            if (n === index) {
                slide.removeClass('hide blur');
            } else if (distance === 1 || distance === -1) {
                slide.addClass('blur')
            } else {
                slide.addClass('hide');
            }
        });
    }

    $('#slide-prev').on('click', function() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    });

    $('#slide-next').on('click', function() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    });

    showSlide(currentSlide);
});

function isDarkMode() {
    return localStorage.getItem('darkMode') === 'true';
}