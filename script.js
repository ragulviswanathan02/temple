// Slider functionality
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.slider-dot');

function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    currentSlide = index;
    if (currentSlide >= slides.length) currentSlide = 0;
    if (currentSlide < 0) currentSlide = slides.length - 1;
    
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

function prevSlide() {
    showSlide(currentSlide - 1);
}

// Auto-advance slider
let sliderInterval;
function startSlider() {
    sliderInterval = setInterval(nextSlide, 5000);
}

function stopSlider() {
    clearInterval(sliderInterval);
}

// Initialize slider
if (slides.length > 0) {
    showSlide(0);
    startSlider();
    
    // Pause on hover
    const heroSlider = document.querySelector('.hero-slider');
    if (heroSlider) {
        heroSlider.addEventListener('mouseenter', stopSlider);
        heroSlider.addEventListener('mouseleave', startSlider);
    }
    
    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
            stopSlider();
            startSlider();
        });
    });
}

// Mobile menu toggle
const mobileToggle = document.querySelector('.mobile-toggle');
const navMenu = document.querySelector('.nav-menu');

if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Gallery lightbox
const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.querySelector('.lightbox');
const lightboxImg = document.querySelector('.lightbox-content img');
const lightboxClose = document.querySelector('.lightbox-close');

galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        const img = item.querySelector('img');
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

if (lightboxClose) {
    lightboxClose.addEventListener('click', () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
}

if (lightbox) {
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
}

// Donation amount selection
const amountOptions = document.querySelectorAll('.amount-option');
const customAmountInput = document.getElementById('custom-amount');

amountOptions.forEach(option => {
    option.addEventListener('click', () => {
        amountOptions.forEach(opt => opt.classList.remove('selected'));
        option.classList.add('selected');
        
        if (customAmountInput) {
            customAmountInput.value = '';
        }
    });
});

if (customAmountInput) {
    customAmountInput.addEventListener('input', () => {
        amountOptions.forEach(opt => opt.classList.remove('selected'));
    });
}

// Form validation
const donationForm = document.getElementById('donation-form');
if (donationForm) {
    donationForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('donor-name').value;
        const email = document.getElementById('donor-email').value;
        const phone = document.getElementById('donor-phone').value;
        
        let selectedAmount = document.querySelector('.amount-option.selected');
        let amount = selectedAmount ? selectedAmount.dataset.amount : customAmountInput.value;
        
        if (!amount || amount <= 0) {
            alert('Please select or enter a donation amount');
            return;
        }
        
        if (!name || !email || !phone) {
            alert('Please fill in all required fields');
            return;
        }
        
        // In a real application, this would process the payment
        alert(`Thank you ${name} for your generous donation of ₹${amount}! This is a demo - in production, this would process your payment securely.`);
        donationForm.reset();
        amountOptions.forEach(opt => opt.classList.remove('selected'));
    });
}

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

document.querySelectorAll('.card, .gallery-item').forEach(el => {
    observer.observe(el);
});

// Set active nav link based on current page
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
navLinks.forEach(link => {
    if (link.getAttribute('href') === currentPage) {
        link.classList.add('active');
    }
});
