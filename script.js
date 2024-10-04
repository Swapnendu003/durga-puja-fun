document.addEventListener("DOMContentLoaded", function () {
    const pandals = document.querySelectorAll(".pandal");
    const taxi = document.getElementById("taxi");

    let currentPandalIndex = -1; // To keep track of the currently visible pandal

    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.7 // Trigger when 70% of the element is in view
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const index = [...pandals].indexOf(entry.target);
                
                // Ensure that only one pandal is shown at a time in sequence
                if (index === currentPandalIndex + 1) {
                    entry.target.classList.add("visible");
                    
                    // Update taxi position relative to the current visible pandal
                    const taxiPosition = entry.target.getBoundingClientRect().top + window.scrollY - 50;
                    taxi.style.top = `${taxiPosition}px`;

                    currentPandalIndex = index;
                    
                    // Unobserve to prevent re-triggering the effect for already visible pandals
                    observer.unobserve(entry.target);
                }
            }
        });
    }, observerOptions);

    pandals.forEach(pandal => {
        observer.observe(pandal);
    });
});
document.addEventListener("DOMContentLoaded", function () {

    const dhakMusic = document.getElementById("dhak-music");

    // Function to play music and stop it after 1 minute
    function playDhakMusic() {
        dhakMusic.play().then(() => {
            console.log("Music started playing successfully.");

            // Stop the music after 1 minute (60000 milliseconds)
            setTimeout(() => {
                dhakMusic.pause();
                dhakMusic.currentTime = 0; // Reset to start position
            }, 60000);
        }).catch((error) => {
            console.log("Autoplay might be blocked by the browser. Waiting for user interaction.");
        });
    }

    // Attempt to autoplay initially
    playDhakMusic();

    // Event listener to ensure music plays on user interaction if autoplay is blocked
    function enableMusicOnInteraction() {
        playDhakMusic(); // Try to play again on interaction

        // Remove these event listeners once the music starts playing
        document.body.removeEventListener("click", enableMusicOnInteraction);
        document.body.removeEventListener("scroll", enableMusicOnInteraction);
    }

    // Add event listeners for user interaction
    document.body.addEventListener("click", enableMusicOnInteraction);
    document.body.addEventListener("scroll", enableMusicOnInteraction);


    const flowerContainer = document.getElementById("flower-container");

    function createFlower() {
        const flower = document.createElement("div");
        flower.classList.add("flower");

        // Random position for each flower
        flower.style.left = Math.random() * 100 + "vw";
        flower.style.animationDuration = Math.random() * 2 + 3 + "s"; // Random duration between 3s and 5s
        flower.style.animationDelay = Math.random() * 5 + "s"; // Random delay for falling
        flowerContainer.appendChild(flower);

        // Remove flower after animation completes
        setTimeout(() => {
            flower.remove();
        }, 8000);
    }

    // Create multiple flowers initially
    for (let i = 0; i < 20; i++) {
        createFlower();
    }

    // Continuously create flowers every few seconds for a continuous effect
    setInterval(createFlower, 1000);
});
