// --- Existing JavaScript from your site (if any) would go here ---
// Example: Mobile menu toggle (assuming you have this functionality)
document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navUl = document.querySelector('header.site-header nav ul');

    if (mobileMenuToggle && navUl) {
        mobileMenuToggle.addEventListener('click', () => {
            navUl.classList.toggle('active'); // You'd need CSS for .active to show/hide
        });
    }

    // Example: Gallery filter
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filter = button.dataset.filter;

            galleryItems.forEach(item => {
                if (filter === 'all' || item.dataset.category === filter) {
                    item.style.display = 'block'; // Or 'grid-item' if using grid display
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Example: Testimonial Slider
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const testimonialDots = document.querySelectorAll('.testimonial-dot');
    const prevTestimonialBtn = document.querySelector('.prev-testimonial');
    const nextTestimonialBtn = document.querySelector('.next-testimonial');
    let currentSlide = 0;

    function showSlide(index) {
        testimonialSlides.forEach((slide, i) => {
            slide.classList.remove('active');
            testimonialDots[i].classList.remove('active');
        });
        testimonialSlides[index].classList.add('active');
        testimonialDots[index].classList.add('active');
    }

    if (prevTestimonialBtn && nextTestimonialBtn) {
        prevTestimonialBtn.addEventListener('click', () => {
            currentSlide = (currentSlide - 1 + testimonialSlides.length) % testimonialSlides.length;
            showSlide(currentSlide);
        });

        nextTestimonialBtn.addEventListener('click', () => {
            currentSlide = (currentSlide + 1) % testimonialSlides.length;
            showSlide(currentSlide);
        });

        testimonialDots.forEach(dot => {
            dot.addEventListener('click', (e) => {
                currentSlide = parseInt(e.target.dataset.slide);
                showSlide(currentSlide);
            });
        });

        showSlide(currentSlide); // Initialize slider
    }

    // Before/After Slider Logic
    document.querySelectorAll('.before-after-slider').forEach(slider => {
        const afterImage = slider.querySelector('.after-image');
        const sliderHandle = slider.querySelector('.slider-handle');
        let isDragging = false;

        // Function to update the slider position
        function updateSlider(x) {
            let newWidth = x - slider.getBoundingClientRect().left;
            if (newWidth < 0) newWidth = 0;
            if (newWidth > slider.offsetWidth) newWidth = slider.offsetWidth;

            afterImage.style.width = `${newWidth}px`;
            sliderHandle.style.left = `${newWidth}px`;
        }

        // Mouse events
        sliderHandle.addEventListener('mousedown', (e) => {
            isDragging = true;
            e.preventDefault(); // Prevent default drag behavior
        });

        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            updateSlider(e.clientX);
        });

        document.addEventListener('mouseup', () => {
            isDragging = false;
        });

        // Touch events
        sliderHandle.addEventListener('touchstart', (e) => {
            isDragging = true;
            e.preventDefault(); // Prevent scrolling while dragging
        }, { passive: false }); // Use passive: false for preventDefault

        document.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            // Use changedTouches[0] for the current touch point
            updateSlider(e.changedTouches[0].clientX);
        }, { passive: false });

        document.addEventListener('touchend', () => {
            isDragging = false;
        });

        // Initialize slider position (e.g., 50%)
        updateSlider(slider.getBoundingClientRect().left + slider.offsetWidth / 2);

        // Recalculate on window resize
        window.addEventListener('resize', () => {
            updateSlider(slider.getBoundingClientRect().left + slider.offsetWidth / 2);
        });
    });

    // Form Validation (Example - you might have more complex validation)
    const bookingForm = document.getElementById('booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent default form submission

            let isValid = true;
            const formStatus = document.getElementById('form-status');
            formStatus.style.display = 'none';
            formStatus.classList.remove('success', 'error');

            // Simple validation for required fields
            const requiredInputs = bookingForm.querySelectorAll('[required]');
            requiredInputs.forEach(input => {
                const errorElement = document.getElementById(`${input.id}-error`);
                if (input.value.trim() === '') {
                    isValid = false;
                    input.classList.add('input-error'); // Add a class for error styling
                    if (errorElement) errorElement.textContent = 'This field is required.';
                } else {
                    input.classList.remove('input-error');
                    if (errorElement) errorElement.textContent = '';
                }
            });

            // Basic email validation
            const emailInput = document.getElementById('email');
            const emailError = document.getElementById('email-error');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (emailInput && !emailRegex.test(emailInput.value)) {
                isValid = false;
                emailInput.classList.add('input-error');
                if (emailError) emailError.textContent = 'Please enter a valid email address.';
            } else {
                emailInput.classList.remove('input-error');
                if (emailError) emailError.textContent = '';
            }

            if (isValid) {
                // Simulate form submission
                setTimeout(() => {
                    formStatus.textContent = 'Appointment booked successfully! We will contact you shortly.';
                    formStatus.classList.add('success');
                    formStatus.style.display = 'block';
                    bookingForm.reset(); // Clear the form
                }, 1000);
            } else {
                formStatus.textContent = 'Please correct the errors in the form.';
                formStatus.classList.add('error');
                formStatus.style.display = 'block';
            }
        });
    }

    // Scroll animation for elements with 'animate-on-scroll'
    const animateOnScrollElements = document.querySelectorAll('.animate-on-scroll');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            } else {
                // Optional: remove 'animated' class if you want animation to repeat on scroll
                // entry.target.classList.remove('animated');
            }
        });
    }, { threshold: 0.1 }); // Trigger when 10% of the element is visible

    animateOnScrollElements.forEach(element => {
        observer.observe(element);
    });
});


// --- New JavaScript for Client Counter ---
// Get the element where the count will be displayed
const clientCountElement = document.getElementById('clientCount');
// Define the target number
const targetCount = 150;
// Define the duration of the animation in milliseconds
const animationDuration = 2000; // 2 seconds

/**
 * Animates a number from a start value to an end value over a specified duration.
 * @param {HTMLElement} element - The HTML element to update with the counting number.
 * @param {number} start - The starting number.
 * @param {number} end - The target ending number.
 * @param {number} duration - The total duration of the animation in milliseconds.
 */
function animateCount(element, start, end, duration) {
    let current = start;
    const range = end - start;
    const increment = end > start ? 1 : -1; // Determine if counting up or down
    const stepTime = Math.abs(Math.floor(duration / range)); // Time per increment

    // Ensure stepTime is at least 1ms to avoid division by zero or too fast animation
    const actualStepTime = Math.max(stepTime, 1);

    const timer = setInterval(() => {
        current += increment;
        element.textContent = current;

        if ((increment === 1 && current >= end) || (increment === -1 && current <= end)) {
            clearInterval(timer); // Stop the animation when target is reached
            // This is the line where the '+' is added:
            element.textContent = end + '+'; // Ensure the final number is exactly the target with a '+'
        }
    }, actualStepTime);
}

// Use Intersection Observer for the client counter to animate when it comes into view
const clientStatsSection = document.getElementById('client-stats');

if (clientStatsSection && clientCountElement) {
    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Start the animation when the section comes into view
                animateCount(clientCountElement, 0, targetCount, animationDuration);
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, { threshold: 0.5 }); // Trigger when 50% of the section is visible

    counterObserver.observe(clientStatsSection);
}
