# Crystal Cavern Glow

A highly immersive, atmospheric website template featuring a magical cavern aesthetic. This project demonstrates advanced front-end techniques including dynamic theme switching, particle systems, and interactive environmental effects.

## ✨ Features

*   **Day/Night Theme Toggle**: Seamlessly transition between a bright "Azure Day" and a deep "Crystal Night" mode. Your preference is saved locally for future visits.
*   **Dynamic Particle System**: Powered by `particles.js`, the background features shifting "crystal dust" that changes color and behavior based on the active theme.
*   **Interactive Lantern Effect**: A soft, glowing light follows your cursor, acting as a guide through the darker themes of the cavern.
*   **Ambient Soundscape**: An optional audio toggle provides cave ambience (dripping water, echoing wind) to deepen the sensory experience.
*   **Parallax Depth**: Multiple layers of crystals move at varying speeds during scroll, creating a sense of physical space and depth.
*   **Scroll Reveal Animations**: Content emerges elegantly from the shadows as you explore deeper into the page using the Intersection Observer API.
*   **Responsive Design**: Optimized for a magical experience across desktops, tablets, and mobile devices.

## 🚀 Getting Started

### Prerequisites

To run this project, you will need to include the `particles.js` library in your HTML:
```html
<script src="https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js"></script>
```

### Project Structure

*   `index.html`: The structural foundation of the cavern.
*   `style.css`: Contains the theme variables, crystal animations, and layout logic.
*   `script.js`: Handles the interactive logic, particle initialization, and state management.
*   `assets/`: (Directory) Should contain your `sounds/` and `images/`.

## 🛠️ Customization

### Changing Colors
The visual identity is controlled via CSS variables in `style.css`. You can modify the `--glow-color` or `--crystal-color-base` within the `.theme-day` and `.theme-night` blocks to create different gemstone aesthetics (e.g., Emerald or Ruby caverns).

### Adjusting Parallax
To change the depth effect of an element, add the `parallax` class and a `data-speed` attribute:
```html
<div class="crystal parallax" data-speed="0.2"></div>
```

## 📜 License

This project is open-source and available for use in your own creative showcases.

---
*Created with magic and code.*

---
**Note**: Ensure your audio assets are located at `assets/sounds/cave-ambience.mp3` for the sound toggle to function correctly.