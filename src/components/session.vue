<template>
    <li class="session" v-if="Date.now() - (session.timestamp + session.lastTime) <= 2000">
        <h3>{{name}}</h3>
        <span>Language: {{session.locale}}</span>
        <span v-if="Date.now() - (session.timestamp + session.lastTime) <= 3000">streaming {{Date.now() - (session.timestamp + session.lastTime)}}</span>
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