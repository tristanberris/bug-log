<template>
    <div class="BugDetails">
        <h1>TItle here :)</h1>
        <h1>{{Bug.title}}</h1>

    </div>
</template>


<script>
export default {
    name: 'Bug',
    // props:["bugData"],
    data(){
        return {}
    },
    mounted(){
        this.$store.dispatch('setActiveBug', this.$route.params.bugId)
    },
    computed:{
        Bug(){
            return this.$store.state.activeBug
        }
    },
    methods:{},
    // props: ["bugId"],
    components:{}
}
</script>


<style scoped>

</style>