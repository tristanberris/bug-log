<template>
    <div class="BugDetails">
        <h1>{{bugData.title}}</h1>

    </div>
</template>


<script>
export default {
    name: 'Bug',
    props:["bugData"],
    data(){
        return {}
    },
    mounted(){
        this.$store.dispatch('setActiveBug', this.$route.params.bugId)
    },
    computed:{
        bug(){
            return this.$store.state.activeBug
        }
    },
    methods:{},
    props: ["bugId"],
    components:{}
}
</script>


<style scoped>

</style>