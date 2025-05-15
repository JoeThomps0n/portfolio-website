// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle.querySelector('i');

// Initialize theme - default to dark mode
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme');
    // If no theme is saved or if it's not explicitly 'light', use dark mode
    if (!savedTheme || savedTheme !== 'light') {
        document.body.classList.remove('light-theme');
        localStorage.setItem('theme', 'dark');
        updateThemeIcon(false);
    } else {
        document.body.classList.add('light-theme');
        updateThemeIcon(true);
    }
}

// Call initialization on page load
initializeTheme();

themeToggle.addEventListener('click', () => {
    const isLight = document.body.classList.toggle('light-theme');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
    updateThemeIcon(isLight);
});

function updateThemeIcon(isLight) {
    themeIcon.className = isLight ? 'fas fa-moon' : 'fas fa-sun';
}

// Navigation Scroll
let lastScroll = 0;
const nav = document.querySelector('nav');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        nav.classList.remove('hidden');
        return;
    }
    
    if (currentScroll > lastScroll && !nav.classList.contains('hidden')) {
        nav.classList.add('hidden');
    } else if (currentScroll < lastScroll && nav.classList.contains('hidden')) {
        nav.classList.remove('hidden');
    }
    
    lastScroll = currentScroll;
});

// Scroll Progress Bar
const progressBar = document.createElement('div');
progressBar.className = 'scroll-progress';
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = (window.scrollY / windowHeight) * 100;
    progressBar.style.transform = `scaleX(${progress / 100})`;
});

// Smooth Scrolling with Offset
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        if (this.getAttribute('href').length > 1) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navHeight = nav.offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
                window.scrollTo({
                    top: targetPosition - navHeight + 1,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Contact Form Handling with Animation
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        
        // Animate button
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitButton.disabled = true;
        
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value
        };

        try {
            const response = await fetch('/send_message', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            
            if (data.status === 'success') {
                // Success animation
                submitButton.innerHTML = '<i class="fas fa-check"></i> Sent!';
                submitButton.style.backgroundColor = '#10B981';
                contactForm.reset();
                
                setTimeout(() => {
                    submitButton.innerHTML = originalText;
                    submitButton.style.backgroundColor = '';
                    submitButton.disabled = false;
                }, 2000);
            } else {
                throw new Error(data.message || 'Failed to send message');
            }
        } catch (error) {
            // Error animation
            submitButton.innerHTML = '<i class="fas fa-times"></i> Error';
            submitButton.style.backgroundColor = '#EF4444';
            
            setTimeout(() => {
                submitButton.innerHTML = originalText;
                submitButton.style.backgroundColor = '';
                submitButton.disabled = false;
            }, 2000);
            
            alert('Error sending message: ' + error.message);
        }
    });
}

// Scroll Animation with Intersection Observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            
            // Animate child elements with delay
            const children = entry.target.querySelectorAll('.animate-child');
            children.forEach((child, index) => {
                setTimeout(() => {
                    child.classList.add('animate');
                }, index * 100);
            });
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Parallax Effect
document.addEventListener('mousemove', (e) => {
    const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
    const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
    
    document.querySelectorAll('.parallax').forEach(element => {
        element.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
});

// Pixel background animation
function createPixelBackground() {
    const pixelBg = document.querySelector('.pixel-bg');
    if (!pixelBg) return;
    const w = window.innerWidth;
    const h = window.innerHeight;
    const numDots = Math.floor((w * h) / 6000); // density
    pixelBg.innerHTML = '';
    for (let i = 0; i < numDots; i++) {
        const dot = document.createElement('div');
        dot.className = 'pixel-dot';
        dot.style.left = Math.random() * 100 + 'vw';
        dot.style.top = Math.random() * 100 + 'vh';
        dot.style.animationDelay = (Math.random() * 6) + 's';
        dot.style.opacity = 0.08 + Math.random() * 0.12;
        dot.style.background = `linear-gradient(135deg, #4ec9b0, #569cd6, #a78bfa)`;
        pixelBg.appendChild(dot);
    }
}
window.addEventListener('resize', createPixelBackground);
document.addEventListener('DOMContentLoaded', createPixelBackground);

// Animate sections and children on scroll
// ... existing code ... 