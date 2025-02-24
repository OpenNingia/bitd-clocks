
document.addEventListener('alpine:init', () => {
    Alpine.data('clocks', () => ({
        FONT_MAP: {
            4: ['A', 'B', 'C', 'D', 'E'],
            6: ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
            8: ['0', '1', '2', '3', '4', '5', '6', '7', '8']
        },

        clocks_: [],

        email: '',
        password: '',
        error: '',
        session: null,

        get clocks() {
            return this.clocks_;
        },

        async init() {
            /*try {
                const dump = localStorage.getItem("bitd-clocks");
                this.clocks_ = JSON.parse(dump) || [];
            } catch (e) {
                console.error('Failed to load clocks:', e);
                this.clocks_ = [];
            }*/
            this.session = new Session()
            //this.clocks_ = session.getClocks()
            /*await session.subscribeToClocks((data) => {
                console.log('clocks update')
                console.log(data)
                this.clocks_ = data
            })*/

            this.clocks_ = await this.session.getClocks()
        },

        async addClock(n) {
            const clock = { slices: n, filled: 0, name: "" }

            await this.session.addClock(clock)
            this.clocks_ = await this.session.getClocks()
        },

        async removeClock(clock) {
            const index = this.clocks_.indexOf(clock);
            if (index > -1) {           
                const clock = this.clocks_[index]

                try {
                await this.session.removeClock(clock.id)
                this.clocks_ = await this.session.getClocks()
                } catch(exc) {
                    console.log(exc)
                    this.error = "Impossibile cancellare l'orologio. Accesso Negato."
                }
            }
        },

        updateClock(clock) {
            debounce(async function (session, clock) {
                await session.updateClock(clock)
            }, 250)(this.session, clock);
        },

        getClockText(slices, filled) {
            return this.FONT_MAP[slices][filled]
        },

        advanceClock(clock) {
            clock.filled = (clock.filled + 1) % (clock.slices + 1)
            this.updateClock(clock)
        },

        async login(username, password) {
            const session = new Session()
            try {
                await session.login(username, password)
                window.location.href = 'index.html';
            } catch (exc) {
                this.error = 'Login failed. Please check your credentials.'
                console.log(exc)
            }
        }
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