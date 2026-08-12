document.addEventListener("DOMContentLoaded", function() {

    // --- 1. Custom Inertia Cursor ---
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    if (cursorDot && cursorOutline) {
        let mouseX = 0, mouseY = 0;
        let outlineX = 0, outlineY = 0;

        window.addEventListener('mousemove', function(e) {
            mouseX = e.clientX;
            mouseY = e.clientY;

            cursorDot.style.left = `${mouseX}px`;
            cursorDot.style.top = `${mouseY}px`;
        });

        function animateCursor() {
            // Smooth inertia interpolation
            outlineX += (mouseX - outlineX) * 0.18;
            outlineY += (mouseY - outlineY) * 0.18;

            cursorOutline.style.left = `${outlineX}px`;
            cursorOutline.style.top = `${outlineY}px`;

            requestAnimationFrame(animateCursor);
        }
        animateCursor();

        // Cursor Grow on hoverable elements
        const hoverables = document.querySelectorAll('a, button, .feature-card, .scroll-item, .detail-card, .contact-badge');
        hoverables.forEach(item => {
            item.addEventListener('mouseenter', () => cursorOutline.classList.add('cursor-grow'));
            item.addEventListener('mouseleave', () => cursorOutline.classList.remove('cursor-grow'));
        });
    }

    // --- 2. Scroll Progress Bar ---
    const progressBar = document.querySelector('.progress-bar');
    if (progressBar) {
        window.addEventListener('scroll', function() {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            progressBar.style.width = scrolled + "%";
        });
    }

    // --- 3. Mobile Navigation Toggle ---
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = navToggle.querySelector('i');
            if (icon) {
                if (navMenu.classList.contains('active')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-xmark');
                } else {
                    icon.classList.remove('fa-xmark');
                    icon.classList.add('fa-bars');
                }
            }
        });
    }

    // --- 4. Button Ripple Effect ---
    const buttons = document.querySelectorAll('.cta-button');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const x = e.clientX;
            const y = e.clientY;
            const buttonRect = e.target.getBoundingClientRect();
            const xInside = x - buttonRect.left;
            const yInside = y - buttonRect.top;

            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            ripple.style.top = yInside + 'px';
            ripple.style.left = xInside + 'px';

            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });

    // --- 5. 3D Card Tilt Effect ---
    const cards = document.querySelectorAll('.feature-card, .scroll-item');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const cardRect = card.getBoundingClientRect();
            const x = e.clientX - cardRect.left - cardRect.width / 2;
            const y = e.clientY - cardRect.top - cardRect.height / 2;

            const maxTilt = 8;
            const rotX = (y / (cardRect.height / 2)) * -maxTilt;
            const rotY = (x / (cardRect.width / 2)) * maxTilt;

            card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-6px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)`;
        });
    });
});