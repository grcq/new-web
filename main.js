const lang = {};

function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}

$(document).ready(function() {
    ['en', 'no', 'nl'].forEach(function (item, index) {
        readTextFile(`./lang/${item}.json`, function(text){
            try {
                lang[item] = JSON.parse(text);
            } catch(e) {
                console.log("Error parsing language '" + item + "'. Error:\n" + e + "\n\nText: " + text)
            }
        });
    });

    if (localStorage.getItem('darkMode') === null) {
        localStorage.setItem('darkMode', 'true');
    }

    if (isDarkMode()) {
        $('body').addClass('dark-mode-variables');
    } else {
        $('.dark-mode-toggler span').toggleClass('active');
    }

    if (!getLanguage()) {
        localStorage.setItem('language', 'en');
    }

    $('.lang').each(function() {
        if ($(this).attr('id') === getLanguage()) {
            $(this).children('.enabled').addClass('active');
        }
    });

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

    $('.dropdown-toggler').click(function() {
        $(this).parent().children(".dropdown-content").toggleClass('active');
    });

    $('.lang').click(function() {
        const lang = $(this).attr('id');
        localStorage.setItem('language', lang);
        location.reload();

        $('.lang').children('.enabled').removeClass('active');
        $(this).children('.enabled').addClass('active');
    });

    $('[lang-id]').each(function() {
        const langId = $(this).attr('lang-id');
        $(this).html(lang[getLanguage()][langId]);
    });
});

function isDarkMode() {
    return localStorage.getItem('darkMode') === 'true';
}

function getLanguage() {
    return localStorage.getItem('language');
}

