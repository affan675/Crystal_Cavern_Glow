document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('themeToggle');
    const soundToggleBtn = document.getElementById('soundToggle'); // New: sound toggle button
    const body = document.body;
    let ambientAudio = null;

    // --- Particles.js Initialization (Adapted for Crystal Cavern) ---
    /**
     * Re-initializes the particles effect based on the current theme.
     * @param {string} currentTheme - 'day' or 'night'
     */
    function initParticles(currentTheme) {
        // Destroy existing instance if it exists to prevent memory leaks
        if (window.pJSDom && window.pJSDom.length > 0) {
            window.pJSDom[0].pJS.fn.vendors.destroypJS();
            window.pJSDom = [];
        }

        // Ensure the container exists. If not, create it once.
        const heroSection = document.getElementById('hero');
        let particlesDiv = document.getElementById('particles-js');
        
        if (heroSection && !particlesDiv) {
            particlesDiv = document.createElement('div');
            particlesDiv.id = 'particles-js';
            particlesDiv.className = 'particles-container';
            heroSection.prepend(particlesDiv);
        }

        if (heroSection) {
            // Particle properties for Crystal Cavern
            let particleColor = '#E0FFFF'; // Azure for Day
            let particleOpacity = 0.8;
            let particleSize = 2; // Smaller for shimmer/dust
            let particleDensity = 120; // More particles for a subtle glow

            if (currentTheme === 'night') {
                particleColor = '#9932CC'; // Dark Orchid/Purple for Night
                particleOpacity = 0.9;
                particleSize = 3; // Slightly larger for night glow
                particleDensity = 100; // Slightly fewer, more distinct particles
            }

            // Only initialize particles if particles.js is loaded
            if (typeof particlesJS !== 'undefined') {
                particlesJS('particles-js', {
                    "particles": {
                        "number": {
                            "value": particleDensity,
                            "density": {
                                "enable": true,
                                "value_area": 1200 // Increased area for wider spread
                            }
                        },
                        "color": {
                            "value": particleColor
                        },
                        "shape": {
                            "type": "circle", // Still circles for soft glow, can try 'star'
                            "stroke": {
                                "width": 0,
                                "color": "#000000"
                            },
                            "polygon": {
                                "nb_sides": 5
                            }
                        },
                        "opacity": {
                            "value": particleOpacity,
                            "random": true, // Random opacity for shimmering
                            "anim": {
                                "enable": true, // Enable animation for pulsing effect
                                "speed": 1,
                                "opacity_min": 0.1,
                                "sync": false
                            }
                        },
                        "size": {
                            "value": particleSize,
                            "random": true, // Random size for variance
                            "anim": {
                                "enable": true, // Enable animation for size variation
                                "speed": 5, // Slightly faster size change
                                "size_min": 0.5,
                                "sync": false
                            }
                        },
                        "line_linked": {
                            "enable": false, // No lines between particles for crystal dust effect
                        },
                        "move": {
                            "enable": true,
                            "speed": 1, // Slower movement for ethereal feel
                            "direction": "none", // Random direction for gentle drift
                            "random": true,
                            "straight": false,
                            "out_mode": "bounce", // Particles bounce within the canvas
                            "bounce": false, // Prevent physical bounce for gentle drift
                            "attract": {
                                "enable": false,
                                "rotateX": 600,
                                "rotateY": 1200
                            }
                        }
                    },
                    "interactivity": {
                        "detect_on": "canvas",
                        "events": {
                            "onhover": {
                                "enable": true,
                                "mode": "bubble" // Bubble effect on hover
                            },
                            "onclick": {
                                "enable": true,
                                "mode": "push" // Push new particles on click
                            },
                            "resize": true
                        },
                        "modes": {
                            "grab": {
                                "distance": 150,
                                "line_linked": {
                                    "opacity": 1
                                }
                            },
                            "bubble": {
                                "distance": 100, // Smaller bubble distance
                                "size": 8, // Smaller bubble size
                                "duration": 0.4
                            },
                            "repulse": {
                                "distance": 150,
                                "duration": 1
                            },
                            "push": {
                                "particles_nb": 2 // Push 2 particles on click
                            },
                            "remove": {
                                "particles_nb": 2
                            }
                        }
                    },
                    "retina_detect": true
                });
            } else {
                console.warn('particles.js not loaded. Please ensure the <script src="particles.js"></script> tag is in your index.html.');
            }
        }
    }

    // --- Ambient Sound Management ---
    function toggleAmbientSound() {
        if (!ambientAudio) {
            // Example: replace with a real path to an ambient loop
            ambientAudio = new Audio('assets/sounds/cave-ambience.mp3');
            ambientAudio.loop = true;
            ambientAudio.volume = 0.3;
        }

        if (ambientAudio.paused) {
            ambientAudio.play();
            soundToggleBtn.textContent = '🔊 Sound On';
        } else {
            ambientAudio.pause();
            soundToggleBtn.textContent = '🔇 Sound Off';
        }
    }

    // --- Lantern/Flashlight Effect ---
    /**
     * Creates a glowing light that follows the cursor.
     * Best viewed in 'night' theme.
     */
    function initLantern() {
        const lantern = document.createElement('div');
        lantern.id = 'lantern-glow';
        body.appendChild(lantern);

        window.addEventListener('mousemove', (e) => {
            // Use requestAnimationFrame for smoother performance
            requestAnimationFrame(() => {
                lantern.style.left = `${e.clientX}px`;
                lantern.style.top = `${e.clientY}px`;
            });
        });
    }

    // --- Parallax Scrolling Effect ---
    /**
     * Adjusts the vertical position of elements to create depth.
     */
    function initParallax() {
        const parallaxElements = document.querySelectorAll('.parallax');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            
            parallaxElements.forEach(el => {
                // Get the speed from a data attribute or default to 0.5
                const speed = el.getAttribute('data-speed') || 0.5;
                const yPos = -(scrolled * speed);
                el.style.transform = `translateY(${yPos}px)`;
            });
        });
    }

    // --- Scroll Reveal Logic ---
    function initScrollReveal() {
        const observerOptions = {
            threshold: 0.15
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal-visible');
                    // Optional: stop observing once revealed
                    // observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe sections or elements with 'reveal' class
        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    }

    // --- Theme Toggling Logic ---
    function toggleTheme() {
        if (body.classList.contains('theme-day')) {
            body.classList.remove('theme-day');
            body.classList.add('theme-night');
            localStorage.setItem('theme', 'night');
            initParticles('night'); // Re-initialize particles for night theme
        } else {
            body.classList.remove('theme-night');
            body.classList.add('theme-day');
            localStorage.setItem('theme', 'day');
            initParticles('day'); // Re-initialize particles for day theme
        }
    }

    // Event listener for theme toggle button
    themeToggleBtn.addEventListener('click', toggleTheme);
    
    if (soundToggleBtn) {
        soundToggleBtn.addEventListener('click', toggleAmbientSound);
    }

    // Load saved theme or detect from time
    let savedTheme = localStorage.getItem('theme');
    
    if (!savedTheme) {
        // Auto-detect: Night theme between 7 PM and 7 AM
        const hour = new Date().getHours();
        savedTheme = (hour >= 19 || hour < 7) ? 'night' : 'day';
    }

    body.classList.add(`theme-${savedTheme}`);
    initParticles(savedTheme); // Initialize particles on page load based on saved theme
    
    // Initialize additional features
    initScrollReveal();
    initLantern();
    initParallax();
});