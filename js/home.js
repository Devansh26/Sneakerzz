// Vegas Slider

$(document).ready(function() {
    const $vegasSlider = $('#vegas-slider');
    const $vegasIndicators = $('#vegas-indicators');

    $vegasSlider.vegas({
        slides: [
            {src: 'https://wallpaperaccess.com/full/1621057.jpg'},
            {src: 'https://free4kwallpapers.com/uploads/originals/2015/07/18/nike-shoes.jpg'},
            {src: 'https://wallpapercave.com/wp/wp2461042.jpg'}
        ],
        transition: 'fade',
        navigation: true,
        transitionDuration: 2000,
        delay: 5000,
        animationDuration: 2000,
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


