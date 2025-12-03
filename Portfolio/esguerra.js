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

document.querySelectorAll('.content-box').forEach(box => {
    box.style.opacity = '0';
    box.style.transform = 'translateY(20px)';
    box.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(box);
});

const url = 'https://quoteslate.vercel.app/api/quotes/random?length=150';

async function fetchQuoteAPI() {
    const quoteContent = document.getElementById('quoteContent');
    const refreshBtn = document.getElementById('refreshBtn');
    
    refreshBtn.disabled = true;
    quoteContent.innerHTML = `
        <div class="loading-spinner">
            <div class="spinner"></div>
        </div>
    `;
    
    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }
        
        var data = await response.json();
        
        quoteContent.innerHTML = `
            <blockquote class="quote-text">"${data.quote}"</blockquote>
            <div class="quote-divider">
                <div class="quote-line"></div>
                <cite class="quote-author">— ${data.author}</cite>
                <div class="quote-line right"></div>
            </div>
        `;
    } catch (error) {
        console.error('Error fetching quote:', error);
    } finally {
        refreshBtn.disabled = false;
    }
}

window.addEventListener('DOMContentLoaded', fetchQuote);