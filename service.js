document.addEventListener('DOMContentLoaded', function() {
    // Add buzz effect to service icons on hover
    const serviceIcons = document.querySelectorAll('.service-icon-large');
    
    serviceIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.animation = 'buzz 0.3s linear';
        });
        
        icon.addEventListener('animationend', function() {
            this.style.animation = '';
        });
    });
    
    // Smooth scroll to service sections
    if(window.location.hash) {
        const target = document.querySelector(window.location.hash);
        if(target) {
            setTimeout(() => {
                window.scrollTo({
                    top: target.offsetTop - 100,
                    behavior: 'smooth'
                });
            }, 300);
        }
    }
    
    // Highlight current service in navigation
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    navLinks.forEach(link => {
        if(link.href === window.location.href) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
    
    // Add animation to process steps when they come into view
    const animateProcessSteps = function() {
        const steps = document.querySelectorAll('.process-step');
        
        steps.forEach(step => {
            const stepPosition = step.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if(stepPosition < windowHeight - 100) {
                step.classList.add('animate__animated', 'animate__fadeInUp');
            }
        });
    };
    
    // Run once on page load
    animateProcessSteps();
    
    // Run on scroll
    window.addEventListener('scroll', animateProcessSteps);
});