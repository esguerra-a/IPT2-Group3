
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


const versesByFeeling = {
    sad: ['Psalm+34:18', 'Matthew+5:4', 'John+14:27', 'Psalm+147:3', '2+Corinthians+1:3-4'],
    anxious: ['Philippians+4:6-7', 'Matthew+6:34', '1+Peter+5:7', 'Isaiah+41:10', 'Proverbs+12:25'],
    happy: ['Psalm+118:24', 'Philippians+4:4', 'Nehemiah+8:10', '1+Thessalonians+5:16', 'Proverbs+17:22'],
    stressed: ['Matthew+11:28-30', 'Isaiah+41:10', 'Psalm+55:22', 'John+16:33', 'Psalm+46:1'],
    lonely: ['Deuteronomy+31:6', 'Psalm+23:4', 'Matthew+28:20', 'Hebrews+13:5', 'Isaiah+41:10'],
    grateful: ['1+Thessalonians+5:18', 'Psalm+100:4', 'Colossians+3:17', 'Psalm+107:1', 'Ephesians+5:20'],
    afraid: ['Isaiah+41:10', 'Psalm+27:1', '2+Timothy+1:7', 'Psalm+56:3', 'Joshua+1:9'],
    hopeless: ['Jeremiah+29:11', 'Romans+15:13', 'Psalm+42:11', 'Isaiah+40:31', 'Lamentations+3:22-23']
};


let currentFeeling = null;


async function fetchBibleVerse(feeling) {
    const verses = versesByFeeling[feeling];
    const randomVerse = verses[Math.floor(Math.random() * verses.length)];

    try {
        const response = await fetch(`https://bible-api.com/${randomVerse}`);

        if (!response.ok) {
            throw new Error('API request failed');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching verse:', error);
        throw error;
    }
}


function displayVerse(data) {
    const verseDisplay = document.querySelector('.verse-display');
    const verseText = document.querySelector('.verse-text');
    const verseReference = document.querySelector('.verse-reference');

    verseText.textContent = data.text;
    verseReference.textContent = `— ${data.reference}`;

    verseDisplay.style.display = 'block';
    verseDisplay.style.opacity = '0';

    setTimeout(() => {
        verseDisplay.style.opacity = '1';
    }, 50);
}


function showLoading() {
    document.querySelector('.loading-spinner').style.display = 'flex';
    document.querySelector('.verse-display').style.display = 'none';
    document.querySelector('.error-message').style.display = 'none';
}


function hideLoading() {
    document.querySelector('.loading-spinner').style.display = 'none';
}


function showError() {
    document.querySelector('.error-message').style.display = 'block';
    document.querySelector('.verse-display').style.display = 'none';
}


async function handleFeelingClick(feeling) {
    currentFeeling = feeling;
    showLoading();

    try {
        const verseData = await fetchBibleVerse(feeling);
        hideLoading();
        displayVerse(verseData);
    } catch (error) {
        hideLoading();
        showError();
    }
}


document.querySelectorAll('.feeling-btn').forEach(button => {
    button.addEventListener('click', () => {
        const feeling = button.dataset.feeling;
        document.querySelectorAll('.feeling-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        button.classList.add('active');
        handleFeelingClick(feeling);
    });
});


document.querySelector('.refresh-btn').addEventListener('click', () => {
    if (currentFeeling) {
        handleFeelingClick(currentFeeling);
    }
});