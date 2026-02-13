const answers_no = {
    english: [
        "No",
        "Are you sure?",
        "Really? It's your birthday!",
        "Come on, don't be shy!",
        "Think again, bro!",
        "It's party time!",
        "Why so serious?",
        "Let's celebrate together!",
        "I won't take no for an answer!",
        "You're making me sad!",
        "It's YOUR special day!",
        "Please say yes!",
        "You deserve to celebrate!",
        "I insist, brother!",
        "Ok, let's start over..."
    ],
    french: [
        "Non",
        "Tu es sûr ?",
        "Vraiment? C'est ton anniversaire!",
        "Allez, ne sois pas timide!",
        "Réfléchis encore, frérot!",
        "C'est l'heure de la fête!",
        "Pourquoi si sérieux?",
        "Célébrons ensemble!",
        "Je n'accepterai pas un non!",
        "Tu me rends triste!",
        "C'est TON jour spécial!",
        "S'il te plaît dis oui!",
        "Tu mérites de célébrer!",
        "J'insiste, frère!",
        "Ok, recommençons..."
    ],
    spanish: [
        "No",
        "¿Estás seguro?",
        "¿En serio? ¡Es tu cumpleaños!",
        "¡Vamos, no seas tímido!",
        "¡Piénsalo de nuevo, hermano!",
        "¡Es hora de la fiesta!",
        "¿Por qué tan serio?",
        "¡Celebremos juntos!",
        "¡No aceptaré un no!",
        "¡Me pones triste!",
        "¡Es TU día especial!",
        "¡Por favor di que sí!",
        "¡Mereces celebrar!",
        "¡Insisto, hermano!",
        "Ok, empecemos de nuevo..."
    ]
};

answers_yes = {
    "english": "Yes",
    "french": "Oui",
    "spanish": "Sí"
}

let language = "english"; // Default language is English
const no_button = document.getElementById('no-button');
const yes_button = document.getElementById('yes-button');
const backgroundMusic = document.getElementById('background-music');
let i = 1;
let size = 50;
let clicks = 0;
let slideIndex = 1;

// Initialize floating celebration elements
function createFloatingCelebration() {
    const celebrationContainer = document.getElementById('celebration-container');
    const celebrationSymbols = ['🎈', '🎉', '🎊', '🎁', '🎂', '🎆', '⭐', '✨'];
    
    setInterval(() => {
        const element = document.createElement('div');
        element.className = 'celebration-element';
        element.textContent = celebrationSymbols[Math.floor(Math.random() * celebrationSymbols.length)];
        element.style.left = Math.random() * 100 + '%';
        element.style.animationDuration = (Math.random() * 3 + 4) + 's';
        element.style.fontSize = (Math.random() * 20 + 20) + 'px';
        celebrationContainer.appendChild(element);
        
        setTimeout(() => {
            element.remove();
        }, 6000);
    }, 300);
}

// Initialize celebration animation
createFloatingCelebration();

// Slideshow functions
function showSlides(n) {
    let slides = document.getElementsByClassName("slide");
    let dots = document.getElementsByClassName("dot");
    
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    
    for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove("active");
    }
    
    for (let i = 0; i < dots.length; i++) {
        dots[i].classList.remove("active");
    }
    
    if (slides.length > 0) {
        slides[slideIndex - 1].classList.add("active");
        if (dots.length > 0) {
            dots[slideIndex - 1].classList.add("active");
        }
    }
}

function changeSlide(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

// Auto-advance slideshow
function autoAdvanceSlides() {
    slideIndex++;
    showSlides(slideIndex);
    setTimeout(autoAdvanceSlides, 4000); // Change image every 4 seconds
}

no_button.addEventListener('click', () => {
    // Change banner source
    let banner = document.getElementById('banner');
    if (clicks === 0) {
        banner.src = "public/images/no.gif";
        refreshBanner();
    }
    clicks++;
    // increase button height and width gradually
    const sizes = [40, 50, 30, 35, 45]
    const random = Math.floor(Math.random() * sizes.length);
    size += sizes[random]
    yes_button.style.height = `${size}px`;
    yes_button.style.width = `${size}px`;
    let total = answers_no[language].length;
    // change button text
    if (i < total - 1) {
        no_button.innerHTML = answers_no[language][i];
        i++;
    } else if (i === total - 1) {
        alert(answers_no[language][i]);
        i = 1;
        no_button.innerHTML = answers_no[language][0];
        yes_button.innerHTML = answers_yes[language];
        yes_button.style.height = "50px";
        yes_button.style.width = "50px";
        size = 50;
    }
});

yes_button.addEventListener('click', () => {
    // change banner gif path
    let banner = document.getElementById('banner');
    banner.src = "public/images/yes.gif";
    refreshBanner();
    
    // hide buttons div
    let buttons = document.getElementsByClassName('buttons')[0];
    buttons.style.display = "none";
    
    // show message div
    let message = document.getElementsByClassName('message')[0];
    message.style.display = "block";
    
    // Play background music
    backgroundMusic.play().catch(error => {
        console.log("Autoplay prevented. User interaction needed.");
        // Add a small "Click to play music" button if autoplay is blocked
        const musicPrompt = document.createElement('button');
        musicPrompt.textContent = '🎵 Click to Play Birthday Music';
        musicPrompt.style.cssText = `
            margin: 20px auto;
            padding: 10px 20px;
            background: linear-gradient(135deg, #4a90e2, #67b26f);
            color: white;
            border: none;
            border-radius: 25px;
            cursor: pointer;
            font-size: 16px;
            display: block;
            box-shadow: 0 4px 15px rgba(74, 144, 226, 0.4);
        `;
        musicPrompt.onclick = () => {
            backgroundMusic.play();
            musicPrompt.remove();
        };
        message.insertBefore(musicPrompt, message.firstChild);
    });
    
    // Initialize and start slideshow
    showSlides(slideIndex);
    setTimeout(autoAdvanceSlides, 4000);
    
    // Create confetti effect
    createConfetti();
});

function createConfetti() {
    const colors = ['#4a90e2', '#67b26f', '#ffd700', '#ff6b6b', '#4ecdc4', '#f39c12'];
    const celebrationContainer = document.getElementById('celebration-container');
    
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.cssText = `
                position: fixed;
                top: -10px;
                left: ${Math.random() * 100}%;
                width: 10px;
                height: 10px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                animation: fall ${Math.random() * 3 + 2}s linear;
                z-index: 1000;
            `;
            celebrationContainer.appendChild(confetti);
            
            setTimeout(() => confetti.remove(), 5000);
        }, i * 30);
    }
}

// Add fall animation for confetti
const style = document.createElement('style');
style.textContent = `
    @keyframes fall {
        to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

function refreshBanner() {
    // Reload banner gif to force load  
    let banner = document.getElementById('banner');
    let src = banner.src;
    banner.src = '';
    banner.src = src;
}

function changeLanguage() {
    const selectElement = document.getElementById("language-select");
    const selectedLanguage = selectElement.value;
    language = selectedLanguage;

    // Update question heading
    const questionHeading = document.getElementById("question-heading");
    if (language === "french") {
        questionHeading.textContent = "Es-tu prêt à célébrer?";
    } else if (language === "spanish") {
        questionHeading.textContent = "¿Estás listo para celebrar?";
    } else {
        questionHeading.textContent = "Are you ready to celebrate?";
    }

    // Reset yes button text
    yes_button.innerHTML = answers_yes[language];

    // Reset button text to first in the new language
    if (clicks === 0) {
        no_button.innerHTML = answers_no[language][0];
    } else {
        no_button.innerHTML = answers_no[language][clicks];
    }

    // Update success message
    const successMessage = document.getElementById("success-message");
    if (language === "french") {
        successMessage.textContent = "Joyeux Anniversaire, Cher Frère! 🎉";
    } else if (language === "spanish") {
        successMessage.textContent = "¡Feliz Cumpleaños, Querido Hermano! 🎉";
    } else {
        successMessage.textContent = "Happy Birthday, Dear Brother! 🎉";
    }
}
