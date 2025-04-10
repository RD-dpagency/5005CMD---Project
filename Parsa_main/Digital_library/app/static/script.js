document.addEventListener('DOMContentLoaded', function () {
    document.body.classList.add('loaded');

    const scrollElements = document.querySelectorAll('.animate-on-scroll');
    const welcomeHeading = document.getElementById('welcome-heading');

    function checkSlide() {
        scrollElements.forEach(element => {
            const slideInAt = (window.scrollY + window.innerHeight) - element.offsetHeight / 2;
            const elementBottom = element.offsetTop + element.offsetHeight;
            const isHalfShown = slideInAt > element.offsetTop;
            const isNotScrolledPast = window.scrollY < elementBottom;

            if (isHalfShown && isNotScrolledPast) {
                element.classList.add('in-view');
            } else {
                element.classList.remove('in-view');
            }
        });
    }

    window.addEventListener('scroll', checkSlide);
    checkSlide();

    // Active link highlighting
    const navLinks = document.querySelectorAll('nav a');
    const currentPath = window.location.pathname;

    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Welcome Heading Lighting Effects
    if (welcomeHeading) {
        setInterval(function () {
            welcomeHeading.classList.toggle('light-on');
        }, 3500);

        setTimeout(function () {
            welcomeHeading.classList.add('color-change');
        }, 6000);
    }
});