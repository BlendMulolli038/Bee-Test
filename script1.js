document.addEventListener('DOMContentLoaded', function() {
  // Portfolio Filtering
  const filterButtons = document.querySelectorAll('[data-filter]');
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  
  if (filterButtons.length > 0) {
    filterButtons.forEach(button => {
      button.addEventListener('click', function() {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        this.classList.add('active');
        
        const filterValue = this.getAttribute('data-filter');
        
        portfolioItems.forEach(item => {
          if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
            item.style.display = 'block';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }

  // Form Validation
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
      if (!this.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      }
      
      this.classList.add('was-validated');
      
      if (this.checkValidity()) {
        // Form is valid, you can add AJAX submission here
        alert('Thank you for your message! We will get back to you soon.');
        this.reset();
        this.classList.remove('was-validated');
      }
    }, false);
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });

  // Sticky navigation
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 100) {
        navbar.classList.add('navbar-scrolled');
      } else {
        navbar.classList.remove('navbar-scrolled');
      }
    });
  }

  // Initialize Bootstrap tooltips
  const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  tooltipTriggerList.map(function(tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });

  // Testimonial carousel
  const testimonialCarousel = document.getElementById('testimonialCarousel');
  if (testimonialCarousel) {
    new bootstrap.Carousel(testimonialCarousel, {
      interval: 5000,
      pause: 'hover'
    });
  }

  // Add animation to elements when they come into view
  const animateOnScroll = function() {
    const elements = document.querySelectorAll('.portfolio-card, .team-card, .value-card, .info-card');
    
    elements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.2;
      
      if (elementPosition < screenPosition) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }
    });
  };

  // Set initial state for animated elements
  const animatedElements = document.querySelectorAll('.portfolio-card, .team-card, .value-card, .info-card');
  animatedElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'all 0.6s ease';
  });

  // Run animation function on scroll
  window.addEventListener('scroll', animateOnScroll);
  // Run once on page load
  animateOnScroll();

  // Honeycomb background pattern for some sections
  const honeycombSections = document.querySelectorAll('.portfolio-hero, .about-hero, .contact-hero, .values-section');
  honeycombSections.forEach(section => {
    section.style.position = 'relative';
    section.style.overflow = 'hidden';
    
    const honeycombOverlay = document.createElement('div');
    honeycombOverlay.style.position = 'absolute';
    honeycombOverlay.style.top = '0';
    honeycombOverlay.style.left = '0';
    honeycombOverlay.style.width = '100%';
    honeycombOverlay.style.height = '100%';
    honeycombOverlay.style.backgroundImage = 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M50 0 L100 25 L100 75 L50 100 L0 75 L0 25 Z\' fill=\'none\' stroke=\'rgba(255, 193, 7, 0.1)\' stroke-width=\'1\'/%3E%3C/svg%3E")';
    honeycombOverlay.style.backgroundSize = '100px 100px';
    honeycombOverlay.style.opacity = '0.5';
    honeycombOverlay.style.pointerEvents = 'none';
    
    section.appendChild(honeycombOverlay);
  });
});

// Function to handle before/after slider (for portfolio items)
function initBeforeAfterSlider(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  
  const before = container.querySelector('.before');
  const after = container.querySelector('.after');
  const handle = container.querySelector('.handle');
  
  let isDragging = false;
  
  function moveSlider(e) {
    if (!isDragging) return;
    
    const containerRect = container.getBoundingClientRect();
    let x = e.pageX - containerRect.left;
    
    // Keep within bounds
    x = Math.max(0, Math.min(x, containerRect.width));
    
    const percent = (x / containerRect.width) * 100;
    
    before.style.width = percent + '%';
    handle.style.left = percent + '%';
  }
  
  handle.addEventListener('mousedown', () => {
    isDragging = true;
  });
  
  window.addEventListener('mouseup', () => {
    isDragging = false;
  });
  
  window.addEventListener('mousemove', moveSlider);
  
  // Touch support
  handle.addEventListener('touchstart', () => {
    isDragging = true;
  });
  
  window.addEventListener('touchend', () => {
    isDragging = false;
  });
  
  window.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    moveSlider(e.touches[0]);
  });
}

// Initialize sliders if they exist on the page
document.addEventListener('DOMContentLoaded', function() {
  initBeforeAfterSlider('beforeAfterSlider1');
  initBeforeAfterSlider('beforeAfterSlider2');
  // Add more as needed
});