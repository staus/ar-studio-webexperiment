<template>
    <li class="session">
        <h3>{{name}}</h3>
        <span>Language: {{session.locale}}</span>
        <ul>
            <li v-for="(item, index) in session.stream">Time: {{item.time}}
                <!--<span v-for="(frame, index) in item.frames">{{frame}}, </span> -->
            </li>
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