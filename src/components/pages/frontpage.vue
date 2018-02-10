<template>
    <div id="frontpage">
        <!-- This tutorial is gold:
        https://medium.com/codingthesmartway-com-blog/vue-js-2-vue-resource-real-world-vue-application-with-external-api-access-c3de83f25c00 -->
        <!-- <SourceSelection v-on:sourceChanged="this.sourceChanged"></SourceSelection> -->
        <SessionList :source="this.source"></SessionList>
    </div>
</template>

<script>
    import SessionList from 'components/sessionList'
    import SourceSelection from 'components/SourceSelection'

    export default {
        name: 'frontpage',
        components: {
            SessionList,
            SourceSelection,
        },
        data() {
            return {
                source: '',
            }
        },
        mounted() {
            // debug('app:info')('App mounted!')
        },
        methods: {
            sourceChanged(newSource) {
                this.source = newSource
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
