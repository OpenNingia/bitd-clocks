
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
            //this.clocks = localStorage.getItem("bitd-clocks")
            if (!this.clocks)
                this.clocks = []

            console.log("init!")
        },

        addClock(n) {
            this.clocks_.push({ key: this.clocks_.length, slices: n, filled: 0, name: "" });
            //localStorage.setItem("bitd-clocks", this.clocks);

            console.log('add clock ' + n)
        },

        getClockText(slices, filled) {
            return this.FONT_MAP[slices][filled]
        },

        advanceClock(clock) {
            clock.filled = (clock.filled + 1) % (clock.slices+1)
        },
    }))
})