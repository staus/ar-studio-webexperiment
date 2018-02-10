<template>
    <ul class="session-list">
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