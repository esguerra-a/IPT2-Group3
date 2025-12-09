// Smooth scroll behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe content boxes for fade-in animation
document.querySelectorAll('.content-box').forEach(box => {
    box.style.opacity = '0';
    box.style.transform = 'translateY(20px)';
    box.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(box);
});

// Fun Facts/Useless Facts Section
(function() {
    // Function to fetch fun fact from API
    async function fetchFunFact() {
        const factContent = document.getElementById('factContent');
        const newJokeBtn = document.getElementById('newJokeBtn');
        
        // Check if elements exist
        if (!factContent || !newJokeBtn) {
            console.error('Fun Facts elements not found');
            return;
        }
        
        // Show loading state
        factContent.innerHTML = `
            <div class="fact-loading">
                <div class="fact-spinner"></div>
                <p>Loading fun fact...</p>
            </div>
        `;
        
        // Disable button while loading
        newJokeBtn.disabled = true;
        
        try {
            // Fetch fact from Useless Facts API
            const response = await fetch('https://uselessfacts.jsph.pl/random.json?language=en');
            
            if (!response.ok) {
                throw new Error('Failed to fetch fun fact');
            }
            
            const data = await response.json();
            
            // Display the fact
            displayFact(data);
            
        } catch (error) {
            // Show error message
            factContent.innerHTML = `
                <div class="fact-error">
                    <p>⚠️ Oops!</p>
                    <p>${error.message}</p>
                </div>
            `;
            console.error('Error fetching fun fact:', error);
        } finally {
            // Re-enable button
            newJokeBtn.disabled = false;
        }
    }
    
    // Function to display fact
    function displayFact(fact) {
        const factContent = document.getElementById('factContent');
        
        factContent.innerHTML = `
            <p class="fact-text">${fact.text}</p>
        `;
    }
    
    // Initialize when DOM is ready
    document.addEventListener('DOMContentLoaded', function() {
        // Fetch initial fact
        fetchFunFact();
        
        // Add click event to button
        const newJokeBtn = document.getElementById('newJokeBtn');
        if (newJokeBtn) {
            newJokeBtn.addEventListener('click', fetchFunFact);
        }
    });
})();