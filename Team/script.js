// Team page JavaScript functionality
// Note: The original HTML file didn't contain any JavaScript, 
// but here's a basic structure for potential interactive features

document.addEventListener('DOMContentLoaded', function() {
    // Navigation arrows functionality
    const navArrows = document.querySelectorAll('.nav-arrow');
    const teamCards = document.querySelectorAll('.team-card');
    
    // Add click events to navigation arrows
    navArrows.forEach((arrow, index) => {
        arrow.addEventListener('click', function() {
            // Add your navigation logic here
            console.log(`Navigation arrow ${index} clicked`);
        });
    });

    // Add click events to team cards
    teamCards.forEach((card, index) => {
        card.addEventListener('click', function() {
            // Add modal or detail view logic here
            console.log(`Team card ${index} clicked`);
        });
    });

    // Add smooth scroll to navigation links
    const navLinks = document.querySelectorAll('.nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Add smooth scroll or navigation logic here
            console.log('Navigation link clicked:', this.textContent);
        });
    });

    // Add intersection observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, observerOptions);

    // Observe team cards for animation
    teamCards.forEach(card => {
        observer.observe(card);
    });
});