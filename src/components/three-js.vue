<template>
    <canvas></canvas>
</template>

<script>
export default {
    name: 'three-js',
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