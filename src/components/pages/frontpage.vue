<template>
    <div id="frontpage">
        <!-- This tutorial is gold:
        https://medium.com/codingthesmartway-com-blog/vue-js-2-vue-resource-real-world-vue-application-with-external-api-access-c3de83f25c00 -->
        <!-- <SourceSelection v-on:sourceChanged="this.sourceChanged"></SourceSelection> -->
        <ThreeJs/>
        <SessionList :itemList="this.item_list"></SessionList>
    </div>
</template>

<script>
    /* eslint-disable no-mixed-operators */
    import SessionList from 'components/sessionList'
    import SourceSelection from 'components/SourceSelection'
    import ThreeJs from 'components/three-js'

    export default {
        name: 'frontpage',
        components: {
            SessionList,
            SourceSelection,
            ThreeJs,
        },
        data() {
            return {
                item_list: {},
                credentials: 'x6YbBCdgEUHQ7yFIJu4DMNc5JDZX18hHuUJkH98W',
                fromMinutes: 10,
            }
        },
        mounted() {
            this.getData()
            setInterval(() => {
                this.getData()
            }, 1000)
        },
        methods: {
            getData() {
                const fromTime = Date.now() - 1000 * 60 * this.fromMinutes
                console.log(Date.now())
                this.$http.get(`https://ar-studio-webexperiment.firebaseio.com/sessions.json?auth=${this.credentials}&orderBy="timestamp"&startAt=${fromTime}`, {
                    method: 'GET',
                }).then((result) => {
                    console.log()
                    return result.json()
                }).then((data) => {
                    this.item_list = data
                })// .catch(error => Diagnostics.log(error))
            },
        },
    }
</script>

<style lang="scss" scoped>
// @import 'assets/styles/app';
.logo {
    width: 105px;
    display: inline-block;
    vertical-align: middle;
}
</style>
