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

// ============================================
// JOKEAPI INTEGRATION
// ============================================

/**
 * Function to fetch a programming joke from JokeAPI
 * API Endpoint: https://v2.jokeapi.dev/joke/Programming
 * This API returns either single-line jokes or two-part jokes (setup + delivery)
 */
async function fetchProgrammingJoke() {
    const jokeContent = document.getElementById('jokeContent');
    
    // Show loading state
    jokeContent.innerHTML = '<div class="joke-loader">Loading joke...</div>';
    
    try {
        // Make API request to JokeAPI
        // Parameters explained:
        // - /joke/Programming: Only get programming-related jokes
        // - ?blacklistFlags=nsfw,religious,political,racist,sexist,explicit: Filter out inappropriate content
        const response = await fetch('https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit');
        
        // Check if the request was successful
        if (!response.ok) {
            throw new Error('Failed to fetch joke');
        }
        
        // Parse the JSON response
        const data = await response.json();
        
        // Check if there was an error in the API response
        if (data.error) {
            throw new Error('API returned an error');
        }
        
        // Display the joke based on its type
        displayJoke(data);
        
    } catch (error) {
        // Handle any errors that occurred during the fetch
        console.error('Error fetching joke:', error);
        jokeContent.innerHTML = '<div class="joke-error">Oops! Couldn\'t load a joke. Try again!</div>';
    }
}

/**
 * Function to display the joke in the UI
 * JokeAPI returns two types of jokes:
 * 1. "single" - One-line joke
 * 2. "twopart" - Setup and delivery (like a traditional joke format)
 */
function displayJoke(jokeData) {
    const jokeContent = document.getElementById('jokeContent');
    
    // Clear previous content
    jokeContent.innerHTML = '';
    
    // Create container for joke text
    const jokeText = document.createElement('div');
    jokeText.className = 'joke-text';
    
    // Check joke type and format accordingly
    if (jokeData.type === 'single') {
        // Single-line joke
        jokeText.innerHTML = `<p class="joke-single">"${jokeData.joke}"</p>`;
    } else if (jokeData.type === 'twopart') {
        // Two-part joke (setup + delivery)
        jokeText.innerHTML = `
            <p class="joke-setup">${jokeData.setup}</p>
            <p class="joke-delivery">${jokeData.delivery}</p>
        `;
    }
    
    // Add the formatted joke to the page
    
    jokeContent.appendChild(jokeText);
}

/**
 * Event Listeners
 */
// Load a joke when the page first loads
document.addEventListener('DOMContentLoaded', function() {
    fetchProgrammingJoke();
});

// Load a new joke when the refresh button is clicked
const jokeRefreshBtn = document.getElementById('jokeRefreshBtn');
if (jokeRefreshBtn) {
    jokeRefreshBtn.addEventListener('click', fetchProgrammingJoke);
}