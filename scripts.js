/*--- GALERIE PORTFOLIO ---*/

document.addEventListener('DOMContentLoaded', () => {
    applyFilter('tout'); // Initial call to set the default filter
});

function filterProjects(category) {
    const projects = document.querySelectorAll('.projet_vignette');
    projects.forEach(project => {
        if (category === 'tout') {
            project.style.display = 'flex';
        } else {
            if (project.classList.contains(category)) {
                project.style.display = 'flex';
            } else {
                project.style.display = 'none';
            }
        }
    });

    const buttons = document.querySelectorAll('.filter-buttons button');
    buttons.forEach(button => {
        if (button.getAttribute('data-category') === category) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });

    applyFilter(category);
}

function applyFilter(category) {
    const gallery = document.querySelector('.gallery');
    gallery.className = 'gallery'; // Reset class list
    if (category !== 'tout') {
        gallery.classList.add(category);
    }
}



/*--- TOP BUTTON ---*/

// Get the button
var mybutton = document.getElementById("topBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () { scrollFunction() };

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

// When the user clicks on the button, scroll to the top of the document smoothly
function topFunction() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // Smooth scroll
    });
}



/*--- PAGINATION VERTICALE ---*/

document.addEventListener('DOMContentLoaded', function () {
    const links = document.querySelectorAll('.pagination-nav a');

    // Set initial active link
    document.querySelector('.pagination-nav a[href="#part1"]').classList.add('active');

    // Add smooth scrolling behavior
    links.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            window.scrollTo({
                top: targetElement.offsetTop - 10, // Adjust offset as needed
                behavior: 'smooth'
            });
            // Remove active class from all links
            links.forEach(link => link.classList.remove('active'));
            // Add active class to the clicked link
            this.classList.add('active');
        });
    });

    // Highlight active link on scroll
    window.addEventListener('scroll', function () {
        let fromTop = window.scrollY + 20;

        links.forEach(link => {
            let section = document.querySelector(link.getAttribute('href'));
            if (
                section.offsetTop <= fromTop &&
                section.offsetTop + section.offsetHeight > fromTop
            ) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });

        // Check if we are at the bottom of the page to highlight the last section
        const lastLink = links[links.length - 1];
        const lastSection = document.querySelector(lastLink.getAttribute('href'));
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 2) {
            links.forEach(link => link.classList.remove('active'));
            lastLink.classList.add('active');
        }
    });
});



/*--- PRESTATIONS SLIDES ---*/

document.addEventListener('DOMContentLoaded', function () {
    const track = document.querySelector('.carousel-track');
    const slides = Array.from(track.children);
    const nextButton = document.querySelector('.carousel-button-right');
    const prevButton = document.querySelector('.carousel-button-left');
    const pagination = document.querySelector('.carousel-pagination');
    let currentSlideIndex = 0;
    let autoSlideInterval;

    // Arrange the slides next to one another
    slides.forEach((slide, index) => {
        slide.style.left = index * 100 + '%';
    });

    // Create pagination dots
    const createPagination = () => {
        pagination.innerHTML = ''; // Clear existing pagination to avoid duplication
        slides.forEach((_, index) => {
            const button = document.createElement('button');
            if (index === 0) button.classList.add('active');
            pagination.appendChild(button);
            button.addEventListener('click', () => {
                moveToSlide(currentSlideIndex, index);
                updatePagination(index);
                currentSlideIndex = index;
            });
        });
    };

    const moveToSlide = (fromIndex, toIndex) => {
        track.style.transform = 'translateX(-' + toIndex * 100 + '%)';
        slides[fromIndex].classList.remove('current-slide');
        slides[toIndex].classList.add('current-slide');
        animateImages(slides[toIndex]);
    };

    const updatePagination = (index) => {
        const buttons = Array.from(pagination.children);
        buttons.forEach(button => button.classList.remove('active'));
        buttons[index].classList.add('active');
    };

    const animateImages = (slide) => {
        const images = slide.querySelectorAll('img');
        images.forEach((img, index) => {
            img.classList.remove('show');
            img.style.animation = 'none';
            // Force reflow
            img.offsetHeight;
            img.style.animation = `fadeIn 1s ${index * 0.5}s ease-in-out forwards`;
            setTimeout(() => {
                img.classList.add('show');
            }, index * 1000);
        });
    };

    nextButton.addEventListener('click', () => {
        const nextIndex = (currentSlideIndex + 1) % slides.length;
        moveToSlide(currentSlideIndex, nextIndex);
        updatePagination(nextIndex);
        currentSlideIndex = nextIndex;
    });

    prevButton.addEventListener('click', () => {
        const prevIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
        moveToSlide(currentSlideIndex, prevIndex);
        updatePagination(prevIndex);
        currentSlideIndex = prevIndex;
    });

    const startAutoSlide = () => {
        autoSlideInterval = setInterval(() => {
            const nextIndex = (currentSlideIndex + 1) % slides.length;
            moveToSlide(currentSlideIndex, nextIndex);
            updatePagination(nextIndex);
            currentSlideIndex = nextIndex;
        }, 8000); // Adjusted interval for smoother transitions
    };

    const stopAutoSlide = () => {
        clearInterval(autoSlideInterval);
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startAutoSlide();
            } else {
                stopAutoSlide();
            }
        });
    }, {
        threshold: 0.5
    });

    observer.observe(document.getElementById('part3'));

    document.querySelector('.carousel').addEventListener('mouseover', stopAutoSlide);
    document.querySelector('.carousel').addEventListener('mouseout', startAutoSlide);

    // Initial call to animate the images in the current slide
    animateImages(slides[currentSlideIndex]);

    // Initial call to create pagination
    createPagination();
});
