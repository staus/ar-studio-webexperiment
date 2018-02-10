<template>
    <li class="session" v-if="Date.now() - (session.timestamp + session.lastTime) <= 2000">
        <h3>{{name}}</h3>
        <p>Language: {{session.locale}}</p>
        <p>Streaming {{Date.now() - (session.timestamp + session.lastTime)}}</p>
        <p>Minutes left: {{Math.round((600000-(Date.now() - session.timestamp))/600)/ 100}}</p>
        <ul>
            <!--<li v-for="(item, index) in session.stream">Time: {{item.time}}
                <span v-for="(frame, index) in item.frames">{{frame}}, </span>
            </li>-->
        </ul>
    </li>
</template>

<script>
export default {
    name: 'Item',
    props: {
        name: {
            type: String,
            required: false,
        },
        session: {
            type: Object,
            required: false,
        },
    },
}
</script>

<style lang="scss" scoped>
    li{
        list-style-type: none;
        margin: 0;
        h3, p{
            margin: 0;
        }
    }
</style>