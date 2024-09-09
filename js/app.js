
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
            console.log(`init: ${this.clocks_}`);
            if (!this.clocks_)
                this.clocks_ = []
        },

        addClock(n) {
            this.clocks_.push({ key: this.clocks_.length, slices: n, filled: 0, name: "" });
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
            clock.filled = (clock.filled + 1) % (clock.slices+1)
        },
    }))
})