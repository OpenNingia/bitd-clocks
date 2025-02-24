class Session {
    subscriptions = []

    constructor() {
        this.pb = new PocketBase("https://pocketbase.dasi.casa");
        console.log(this.pb)
        this.userData = null
    }

    async login(user, password) {
        // authenticate as auth collection record
        this.userData = await this.pb.collection('users').authWithPassword(user, password);
        return this.userData
    }

    async getClocks() {
        const result = await this.pb.collection('bitd_clocks').getList(1, 32, {
            filter: 'created > "2025-01-01 00:00:00"'
        });

        console.log(result)
        return result.items
    }

    async addClock(body) {
        const result = await this.pb.collection('bitd_clocks').create(body);
        console.log(result)
    }

    async removeClock(clockId) {
        const result = await this.pb.collection('bitd_clocks').delete(clockId);
        console.log(result)
    }

    async updateClock(clock) {
        const result = await this.pb.collection('bitd_clocks').update(clock.id, clock);
        console.log(result) 
    }

    async subscribeToClocks(cb) {
        //const result = await this.pb.collection('bitd_clocks').subscribe('RECORD_ID', cb);

        // Subscribe to changes in any record in the collection
        const result = this.pb.collection('example').subscribe('*', function (e) {
            console.log(e.action);
            console.log(e.record);
        }, { /* other options like expand, custom headers, etc. */ });        
        this.subscriptions.push(result)
    }

    isAuthenticated() {
        return this.pb.authStore.isValid
    }
}