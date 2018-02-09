<template>
    <li class="session">
        <h3>{{name}}</h3>
        <p>{{session}}</p>
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