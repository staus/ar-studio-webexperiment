<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: 'app',
        data() {
            return {

            }
        },
        mounted() {
            debug('app:info')('App mounted!')
            debug('app:info')(`Environment: ${ENV.BUILD_ENV}`)
        },
    }
</script>

<style lang="scss" scoped>
// @import 'assets/styles/app';

</style>
