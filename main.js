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



    $('[redirect-to]').each(function() {
        $(this).css("cursor", "pointer");
        $(this).click(function () {
            const attr = $(this).attr('redirect-to');
            window.open(attr, '_blank');
        })
    })
});

function isDarkMode() {
    return localStorage.getItem('darkMode') === 'true';
}