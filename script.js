// DOM Elements
const jokeText = document.getElementById('joke-text');
const tellMeJokeBtn = document.getElementById('tell-me-joke-btn');
const loadingAnimation = document.getElementById('loading-animation');
const errorMessage = document.getElementById('error-message');
const categoryButtons = document.querySelectorAll('.category-btn');
const laughingEmoji = document.getElementById('laughing-emoji');

// API URL
const apiUrl = 'https://api.api-ninjas.com/v1/dadjokes';
const apiKey = 'kTgkx7v+PILFSGSt1+3ZBg==hc43ShjnzFbJIGeo';

let currentCategory = 'random';

// Fetch Joke Function
async function fetchJoke() {
    try {
        // Show loading animation
        jokeText.classList.add('hidden');
        loadingAnimation.style.display = 'flex';
        errorMessage.classList.add('hidden');

        const response = await fetch(`${apiUrl}?category=${currentCategory}`, {
            headers: {
                'X-Api-Key': apiKey,
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log('API Data:', data);

        if (data.length > 0) {
            jokeText.textContent = data[0].joke;
        } else {
            jokeText.textContent = 'No joke found!';
        }

        // Hide loading animation and show joke
        loadingAnimation.style.display = 'none';
        jokeText.classList.remove('hidden');
        laughingEmoji.style.display = 'block';
    } catch (error) {
        console.error('Error fetching joke:', error);
        loadingAnimation.style.display = 'none';
        errorMessage.classList.remove('hidden');
        jokeText.classList.add('hidden');
        laughingEmoji.style.display = 'none';
    }
}

// Event Listener for Button
tellMeJokeBtn.addEventListener('click', fetchJoke);

// Event Listeners for Category Buttons
categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
        categoryButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        currentCategory = button.getAttribute('data-category');
        fetchJoke();
    });
});

// Initial Joke Fetch on Page Load
fetchJoke();

// API-key- kTgkx7v+PILFSGSt1+3ZBg==hc43ShjnzFbJIGeo