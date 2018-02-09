<template>
    <ul class="item-list">
        <li class="item" v-for="item in item_list">
            <div class="item-left">
                <a v-bind:href="item.url" target="_blank">
                    <img class="item-object" v-bind:src="item.urlToImage">
                </a>
            </div>
            <div class="item-body">
                <h4 class="item-heading"><a v-bind:href="item.url" target="_blank">{{item.title}}</a></h4>
                <h5><i>by {{item.author}}</i></h5>
                <p>{{item.description}}</p>
            </div>
        </li>
    </ul>
</template>
<script>
export default {
    name: 'newslist',
    props: {
        source: {
            type: String,
            required: false,
        },
    },
    data() {
        return {
            item_list: [],
            newsApiKey: '2149a07005914f929072d6cb6157bd9a',
            credentials: 'LjeInoMjJo0h5RhRsY30lK7SauHjagjZwMGpT287',
        }
    },
    mounted() {
        this.getData('')
    },
    methods: {
        getIdToken() {
            console.log('getIdToken()')
            this.$http.get('https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyCbhpPdR7iCOK73KGsq33lThLBctpD1mUo', {
                headers: { 'Content-Type': 'application/json' },
                method: 'GET',
                body: JSON.stringify({ email: 'ns@molamil.com', password: 'MEsG7Nt8UQiC7G6uw', returnSecureToken: true }),
            }).then((result) => {
                console.log('succes1')
                return result.json()
            }).then((data) => {
                Diagnostics.log(data)
                getData(data.idToken)
            })// .catch(error => Diagnostics.log(error))
        },
        /* getData(source) {
            this.$http.get(`https://newsapi.org/v1/articles?source=${source}&apiKey=${this.newsApiKey}`)
                .then((response) => {
                    this.item_list = response.data.articles
                })
        }, */
        getData(idToken) {
            this.$http.get(`https://dr-ar-facebeat.firebaseio.com/testsessions.json?auth=${this.credentials}`, {
                method: 'GET',
            }).then((result) => {
                console.log(result)
                return result.json()
            }).then((data) => {
                console.log(data)
                this.item_list = data
            })// .catch(error => Diagnostics.log(error))
        },
    },
    watch: {
    // source(newSource) {
        // this.updateSource(newSource)
    // },
    },
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .item-object {
        width: 128px;
        padding: 10px;
    }
    .item {
        border-top: 1px solid lightgray;
        padding-top: 20px;
    }
</style>