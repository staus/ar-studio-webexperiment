<template>
    <div class="sourceselection">
        <h2><span class="glyphicon glyphicon-list-alt"></span>&nbsp;News List</h2>
        <h4>Select News Source</h4>
        <select class="form-control" v-on:change="sourceChanged">
            <option value="">Please select news source ...</option>
            <option v-for="source in sources" v-bind:value="source.id">{{source.name}}</option>
        </select>
        <div v-if="source">
            <h6>{{source.description}}</h6>
            <a v-bind:href="source.url" class="btn btn-primary" target="_blank">Go To {{source.name}} Website</a>
        </div>
    </div>
</template>

<script>
export default {
    name: 'sourceselection',
    data() {
        return {
            sources: [],
            source: '',
        }
    },
    created() {
        debug('sourceselection:info')(this)
        this.$http.get('https://newsapi.org/v1/sources?language=en')
            .then((response) => {
                this.sources = response.data.sources
            })
    },
    methods: {
        sourceChanged(e) {
            for (let i = 0; i < this.sources.length; i += 1) {
                if (this.sources[i].id === e.target.value) {
                    this.source = this.sources[i]
                }
            }
            this.$emit('sourceChanged', e.target.value)
        },
    },
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>