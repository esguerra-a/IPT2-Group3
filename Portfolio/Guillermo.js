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

// ========== CONTACT FORM WITH EMAILJS ==========

// EmailJS configuration
const serviceID = 'service_si6qrmj';
const templateID = 'template_p6od18j';
const publicKey = 'GszuPK72wiegkv3F4';

// Get form elements
const submitBtn = document.getElementById('submitBtn');
const statusMessage = document.getElementById('statusMessage');

// Handle form submission
submitBtn.addEventListener('click', async function() {
    // Get form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    // Validate inputs
    if (!name || !email || !subject || !message) {
        showStatus('Please fill in all fields', 'error');
        return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showStatus('Please enter a valid email address', 'error');
        return;
    }

    // Disable button and show loading
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
        <div class="spinner"></div>
        <span>Sending...</span>
    `;

    try {
        // Send email using EmailJS
        const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                service_id: serviceID,
                template_id: templateID,
                user_id: publicKey,
                template_params: {
                    from_name: name,
                    from_email: email,
                    subject: subject,
                    message: message,
                    to_email: 'vincepatrickguillermo9@gmail.com'
                }
            })
        });

        if (response.ok) {
            showStatus('Message sent successfully! I\'ll get back to you soon.', 'success');
            // Clear form
            document.getElementById('name').value = '';
            document.getElementById('email').value = '';
            document.getElementById('subject').value = '';
            document.getElementById('message').value = '';
        } else {
            throw new Error('Failed to send message');
        }
    } catch (error) {
        console.error('Error:', error);
        showStatus('Failed to send message. Please try again or email me directly.', 'error');
    } finally {
        // Re-enable button
        submitBtn.disabled = false;
        submitBtn.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
            <span>Send Message</span>
        `;
    }
});

// Show status message function
function showStatus(msg, type) {
    statusMessage.style.display = 'flex';
    statusMessage.className = `status-message ${type}`;
    
    const icon = type === 'success' 
        ? `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`
        : `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`;
    
    statusMessage.innerHTML = icon + `<span>${msg}</span>`;

    // Auto-hide after 5 seconds
    setTimeout(() => {
        statusMessage.style.display = 'none';
    }, 5000);
}