
document.addEventListener('alpine:init', () => {
    Alpine.data('clocks', () => ({
        FONT_MAP: {
            4: ['A', 'B', 'C', 'D', 'E'],
            6: ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
            8: ['0', '1', '2', '3', '4', '5', '6', '7', '8']
        },

        clocks_: [],

        get clocks() {
            return this.clocks_;
        },

        init() {
            try {
                const dump = localStorage.getItem("bitd-clocks");
                this.clocks_ = JSON.parse(dump) || [];
            } catch (e) {
                console.error('Failed to load clocks:', e);
                this.clocks_ = [];
            }
        },

        addClock(n) {
            const key = self.crypto.randomUUID();
            const clock = { key, slices: n, filled: 0, name: "" }
            this.clocks_.push(clock);
            this.updateStorage();
        },

        removeClock(clock) {
            const index = this.clocks_.indexOf(clock);
            if (index > -1) {
                this.clocks_.splice(index, 1);
            }

            this.updateStorage();
        },

        updateStorage() {
            debounce(function (clocks) {
                const dump = JSON.stringify(clocks);
                localStorage.setItem("bitd-clocks", dump);
            }, 250)(this.clocks_);
        },

        getClockText(slices, filled) {
            return this.FONT_MAP[slices][filled]
        },

        advanceClock(clock) {
            clock.filled = (clock.filled + 1) % (clock.slices + 1)
        },
    }))
})

const updateOrientation = function (o) {
    document.getElementById('orientation').innerHTML = `Detected orientation is: <em>${o}</em>`
}

window.addEventListener('orientationchange', (event) => {
    // Instead of reload, re-render the grid
    const grid = document.querySelector('.fixed-grid');
    if (grid) {
        grid.style.opacity = '0';
        setTimeout(() => {
            // Allow transition
            grid.style.opacity = '1';
        }, 100);
    }
});

// Add debouncing for storage updates
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add swipe gestures for mobile
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const SWIPE_THRESHOLD = 50;
    if (touchEndX < touchStartX - SWIPE_THRESHOLD) {
        // Swipe left - advance clock
    }
}

// Add this to your app.js
document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('.navbar.is-fixed-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 10) {
            navbar.classList.add('is-scrolled');
        } else {
            navbar.classList.remove('is-scrolled');
        }
    });
});