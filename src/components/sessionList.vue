<template>
    <ul class="session-list">
        <h2>Active connections:</h2>
        <Session v-for="(item, key) in itemList" :name="key" :session="item"/>
    </ul>
</template>
<script>
/* eslint-disable no-mixed-operators */
import Session from 'components/session'

export default {
    name: 'sessionList',
    components: {
        Session,
    },
    props: {
        itemList: {
            type: Object,
            required: true,
        },
    },
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    ul{
        position: absolute;
        right: 10px;
        top: 10px;
        background-color: rgba(255,255,255,0.4);
        padding: 20px;
        margin: 0;
        box-sizing: border-box;
    }
</style>