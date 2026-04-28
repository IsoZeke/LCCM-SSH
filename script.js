// Accessibility Functions
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDark);
    
    // Switch the FontAwesome icon
    const darkModeIcon = document.querySelector('#darkModeBtn i');
    if (darkModeIcon) {
        darkModeIcon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
    }
}

let sizeLevel = 0;
function resizeText() {
    sizeLevel = (sizeLevel + 1) % 3;
    document.body.classList.remove('text-large', 'text-xlarge');
    
    if (sizeLevel === 1) document.body.classList.add('text-large');
    if (sizeLevel === 2) document.body.classList.add('text-xlarge');
    
    localStorage.setItem('textSize', sizeLevel);
}

// Scroll Reveal Animation Function
function revealOnScroll() {
    const reveals = document.querySelectorAll(".reveal");
    for (let i = 0; i < reveals.length; i++) {
        const windowHeight = window.innerHeight;
        const elementTop = reveals[i].getBoundingClientRect().top;
        const elementVisible = 100;
        
        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        }
    }
}

// Home Page Functions
function toggleFAQ(element) {
    const item = element.parentElement;
    item.classList.toggle('active');
    const icon = element.querySelector('i');
    if (icon) {
        icon.className = item.classList.contains('active') ? 'fas fa-minus' : 'fas fa-plus';
    }
}

// Education Page Functions
const tips = [
    "Take a 5 minute break every hour of studying to avoid burnout.",
    "Stay hydrated drinking water improves focus between classes.",
    "Reach out to a friend if you feel overwhelmed today.",
    "Practice deep breathing for 2 minutes before your next exam.",
    "Try to get at least 7 hours of sleep tonight for better memory.",
    "Listen to your favorite music to shift your mood during study breaks.",
    "Organize your desk a clean space leads to a clear mind.",
    "If you feel stuck, try the Pomodoro technique (25 mins study, 5 mins rest)."
];

function generateTip() {
    const tipElement = document.getElementById('wellnessTip');
    if (!tipElement) return;
    
    tipElement.style.opacity = 0;
    setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * tips.length);
        tipElement.innerText = tips[randomIndex];
        tipElement.style.opacity = 1;
    }, 300);
}

function runBreatheText() {
    const textEl = document.getElementById('breatheText');
    if (!textEl) return;
    
    setInterval(() => {
        textEl.innerText = "Inhale";
        setTimeout(() => {
            textEl.innerText = "Hold";
        }, 4000);
        setTimeout(() => {
            textEl.innerText = "Exhale";
        }, 8000);
    }, 12000);
}

function startQuiz() {
    const quizIntro = document.getElementById('quizIntro');
    const quizContent = document.getElementById('quizContent');
    
    if (quizIntro && quizContent) {
        quizIntro.style.display = 'none';
        quizContent.style.display = 'block';
    }
}

function calculateScore() {
    const form = document.getElementById('stressQuiz');
    if (!form) return;
    
    const formData = new FormData(form);
    let score = 0;
    let count = 0;

    for (let value of formData.values()) {
        score += parseInt(value);
        count++;
    }

    if (count < 6) {
        alert("Please answer all 6 questions before submitting.");
        return;
    }

    const maxScore = 12;
    const percentage = (score / maxScore) * 100;
    const meterContainer = document.getElementById('meter-container');
    const meterFill = document.getElementById('meter-fill');
    const statusText = document.getElementById('status-text');
    const feedbackText = document.getElementById('feedback-text');
    const adviceText = document.getElementById('advice-text');

    document.getElementById('stressQuiz').style.display = 'none';
    meterContainer.style.display = 'block';
    
    setTimeout(() => {
        meterFill.style.width = percentage + "%";
    }, 100);

    if (score <= 4) {
        meterFill.style.backgroundColor = "#4caf50";
        statusText.innerText = "Wellness Status Balanced";
        feedbackText.innerText = "Low Stress Level Detected";
        adviceText.innerText = "You are maintaining your psychological well-being effectively. Continue your current self care routines.";
    } else if (score <= 8) {
        meterFill.style.backgroundColor = "#ff9800";
        statusText.innerText = "Wellness Status Strained";
        feedbackText.innerText = "Moderate Stress Level Detected";
        adviceText.innerText = "You are currently experiencing significant academic pressure. We suggest taking scheduled breaks and speaking with a trusted friend.";
    } else {
        meterFill.style.backgroundColor = "#f44336";
        statusText.innerText = "Wellness Status At Risk";
        feedbackText.innerText = "High Stress Level Detected";
        adviceText.innerText = "Your stress levels are currently impacting your health. We strongly encourage you to visit the Guidance Office on the 2nd floor for a consultation.";
    }
}

// Resources Page Functions
function filterResources(category, btnElement) {
    const buttons = document.querySelectorAll('.btn-filter');
    buttons.forEach(btn => btn.classList.remove('active'));
    btnElement.classList.add('active');

    const cards = document.querySelectorAll('.resource-card');
    cards.forEach(card => {
        const badge = card.querySelector('.resource-badge').innerText.toLowerCase();
        let show = false;

        if (category === 'all') {
            show = true;
        } else if (category === 'lccm' && (badge.includes('campus') || badge.includes('spiritual'))) {
            show = true;
        } else if (badge.includes(category)) {
            show = true;
        }

        card.style.display = show ? 'block' : 'none';
    });
}

// Global Initialization and Event Listeners
window.addEventListener('DOMContentLoaded', () => {
    // Restore Dark Mode
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
        const darkModeIcon = document.querySelector('#darkModeBtn i');
        if (darkModeIcon) {
            darkModeIcon.className = 'fas fa-sun';
        }
    }
    
    // Restore Text Size
    const savedSize = localStorage.getItem('textSize');
    if (savedSize) {
        sizeLevel = parseInt(savedSize);
        if (sizeLevel === 1) document.body.classList.add('text-large');
        if (sizeLevel === 2) document.body.classList.add('text-xlarge');
    }

    // Start Education Page Tools
    const tipElement = document.getElementById('wellnessTip');
    if (tipElement) {
        generateTip();
        runBreatheText();
    }
    
    // Trigger initial scroll reveal
    revealOnScroll();
});

// Attach scroll event listener for animations
window.addEventListener("scroll", revealOnScroll);