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
        });
    });

    // Highlight active link
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
    });
});
