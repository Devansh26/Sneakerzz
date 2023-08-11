
// Retrieve the session token from cookie
function checkSessionCookie() {
    const cookies = document.cookie.split('; ');
    for (const cookie of cookies) {
        const [name, value] = cookie.split('=');
        if (name === 'sessionToken') {
            return value;
        }
    }
    return null;
}


// Vegas Slider

$(document).ready(function() {

    const sessionToken = checkSessionCookie();

    if (sessionToken) {
        // User is authenticated, perform necessary actions
        console.log("User is authenticated");
    } else {
        // User is not authenticated, handle accordingly
        console.log("User is not authenticated");
        window.location.href="../html/login.html";
    }

    const $vegasSlider = $('#vegas-slider');
    const $vegasIndicators = $('#vegas-indicators');

    $vegasSlider.vegas({
        slides: [
            {src: 'https://cdn.wallpapersafari.com/25/79/Ad1IKq.jpg'},
            {src: 'https://media.wired.com/photos/5d154dd7c4e1580009f9fe26/master/w_2560%2Cc_limit/gear_new-balance-990.jpg'},
            {src: 'https://images.unsplash.com/flagged/photo-1556637640-2c80d3201be8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YWRpZGFzJTIwc2hvZXxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80'},
            {src: 'https://wallpaperaccess.com/full/1176897.jpg'},
            {src: 'https://wallpaperboat.com/wp-content/uploads/2020/10/20/57135/yeezy-20.jpg'}
        ],
        transition: 'slideLeft2',
        navigation: true,
        transitionDuration: 1000,
        delay: 2500,
        animationDuration: 1000,
        timer: true,
        timerProgressBar: true,
        slidesToKeep: 3,
        firstTransition: 'fade'
    });

    // Generate slide indicators dynamically
    const slideCount = $vegasSlider.vegas('options', 'slides').length;
    for (let i = 0; i < slideCount; i++) {
        $vegasIndicators.append('<div class="vegas-indicator"></div>');
    }

    // Highlight current slide indicator
    function updateSlideIndicator() {
        const currentSlide = $vegasSlider.vegas('current');
        $vegasIndicators.find('.vegas-indicator').removeClass('current');
        $vegasIndicators.find('.vegas-indicator').eq(currentSlide).addClass('current');
    }

    $vegasSlider.on('vegaswalk', function() {
        updateSlideIndicator();
    });

    // Go to previous slide
    $('.vegas-prev').click(function() {
        $vegasSlider.vegas('previous');
    });

    // Go to next slide
    $('.vegas-next').click(function() {
        $vegasSlider.vegas('next');
    });
});


