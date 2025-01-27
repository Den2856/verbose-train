document.addEventListener('DOMContentLoaded', () => {
    const menuButton = document.querySelector('.header__menu-button');
    const menu = document.querySelector('.header__menu');
  
    menuButton.addEventListener('click', () => {
      menu.classList.toggle('header__menu--open');
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.slider__track');
    const slides = document.querySelectorAll('.slider__slide');
    const prevButton = document.querySelector('.slider__nav--prev');
    const nextButton = document.querySelector('.slider__nav--next');
    const slideWidth = slides[0].offsetWidth;
    let currentIndex = 0;

    function updateSliderPosition() {
        track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    }

    nextButton.addEventListener('click', () => {
        if (currentIndex < slides.length - 1) {
            currentIndex++;
            updateSliderPosition();
        }
    });

    prevButton.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateSliderPosition();
        }
    });

    window.addEventListener('resize', () => {
        const newSlideWidth = slides[0].offsetWidth;
        track.style.transform = `translateX(-${currentIndex * newSlideWidth}px)`;
    });

    let startX = 0;
    let currentX = 0;
    let isDragging = false;

    track.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
    });

    track.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        currentX = e.touches[0].clientX;
    });

    track.addEventListener('touchend', () => {
        if (!isDragging) return;
        const diff = startX - currentX;

        if (diff > 50 && currentIndex < slides.length - 1) {
            currentIndex++;
        } else if (diff < -50 && currentIndex > 0) {
            currentIndex--;
        }

        updateSliderPosition();
        isDragging = false;
    });
});
