// Vegas Slider

$(document).ready(function () {

    //const sessionToken = checkSessionCookie();

    const username = document.getElementById("username");


    // User is authenticated, perform necessary actions
    console.log("User is authenticated");

    const request = indexedDB.open("Sneakerzz", 2);

    request.onsuccess = function (event) {
        const db = event.target.result;
        const transaction = db.transaction(['users'], 'readonly');
        const objectStore = transaction.objectStore('users');

        const userEmail = getCookie('userEmail');

        const getRequest = objectStore.get(userEmail);

        getRequest.onsuccess = function (event) {
            const userData = event.target.result;

            username.innerHTML = "Welcome " + userData.firstName;
        };

        transaction.oncomplete = function () {
            db.close();
        };
    };


    const $vegasSlider = $('#vegas-slider');
    const $vegasIndicators = $('#vegas-indicators');

    $vegasSlider.vegas({
        slides: [
            {src: 'https://cdn.wallpapersafari.com/25/79/Ad1IKq.jpg'},
            {src: 'https://media.wired.com/photos/5d154dd7c4e1580009f9fe26/master/w_2560%2Cc_limit/gear_new-balance-990.jpg'},
            {src: 'https://images.unsplash.com/flagged/photo-1556637640-2c80d3201be8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YWRpZGFzJTIwc2hvZXxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80'},
            {src: 'https://wallpaperaccess.com/full/1176897.jpg'},
            {src: 'https://www.yankodesign.com/images/design_news/2022/09/auto-draft/balenciaga_heel_concept_1.jpg'}
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

    $vegasSlider.on('vegaswalk', function () {
        updateSlideIndicator();
    });

    // Go to previous slide
    $('.vegas-prev').click(function () {
        $vegasSlider.vegas('previous');
    });

    // Go to next slide
    $('.vegas-next').click(function () {
        $vegasSlider.vegas('next');
    });
});

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
        return parts.pop().split(';').shift();
    }
}

