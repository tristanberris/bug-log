<template>
    <div class="BugDetails">
        <h1>Title:</h1>
        <h1>{{Bug.title}}</h1>
        <h5>Reported by: {{Bug.creatorEmail}}</h5>
        <h4>{{Bug.description}}</h4>
        <Comment> </Comment>
    </div>
</template>


<script>
import Comment from "../components/AddComment"
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
    components:{
        Comment
    }
}
</script>


<style scoped>

</style>