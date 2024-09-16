
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
            const dump = localStorage.getItem("bitd-clocks");
            this.clocks_ = JSON.parse(dump);

            if (!this.clocks_)
                this.clocks_ = []
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
            const dump = JSON.stringify(this.clocks_);
            localStorage.setItem("bitd-clocks", dump);
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

/*
window.addEventListener('deviceorientation', (event) => {
    console.log('deviceorientation')
    console.log(event)
    
    if (window.matchMedia("(orientation: portrait)").matches) {
        console.log('deviceorientation: portrait');
        updateOrientation('portrait');
    }

    if (window.matchMedia("(orientation: landscape)").matches) {
        console.log('deviceorientation: landscape');
        updateOrientation('landscape');
    }

    //location.reload()
});*/

window.addEventListener('orientationchange', (event) => {
    /*console.log('orientationchange')
    console.log(event)
    if (window.matchMedia("(orientation: portrait)").matches) {
        console.log('orientation: portrait');
        updateOrientation('portrait');
    }

    if (window.matchMedia("(orientation: landscape)").matches) {
        console.log('orientation: landscape');
        updateOrientation('landscape');
    }*/

    location.reload()
});

/*
screen.orientation.addEventListener("change", (event) => {
    console.log(`ScreenOrientation change`);
    console.log(screen.orientation)

    
    if (window.matchMedia("(orientation: portrait)").matches) {
        console.log('ScreenOrientation: portrait');
        updateOrientation('portrait');
    }

    if (window.matchMedia("(orientation: landscape)").matches) {
        console.log('ScreenOrientation: landscape');
        updateOrientation('landscape');
    }
});*/