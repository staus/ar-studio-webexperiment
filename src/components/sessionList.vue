<template>
    <ul class="session-list">
        <Session v-for="(item, key) in item_list" :name="key" :session="item"/>
    </ul>
</template>
<script>
import Session from 'components/session'

export default {
    name: 'sessionList',
    components: {
        Session,
    },
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
            credentials: 'x6YbBCdgEUHQ7yFIJu4DMNc5JDZX18hHuUJkH98W',
        }
    },
    mounted() {
        this.getData('')
    },
    methods: {
        /* getIdToken() {
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
        }, */
        /* getData(source) {
            this.$http.get(`https://newsapi.org/v1/articles?source=${source}&apiKey=${this.newsApiKey}`)
                .then((response) => {
                    this.item_list = response.data.articles
                })
        }, */
        getData(idToken) {
            this.$http.get(`https://ar-studio-webexperiment.firebaseio.com/sessions.json?auth=${this.credentials}`, {
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