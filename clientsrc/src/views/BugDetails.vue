<template>
    <div class="BugDetails container">
        <h1>Title:</h1>
        <h1>{{Bug.title}}</h1>
        <h5>Reported by: {{Bug.creatorEmail}}</h5>
        <h4>{{Bug.description}}</h4>
        <h5 v-if="Bug.closed == false">open</h5>
        <h5 v-else>closed</h5>

        <button  v-if="Bug.closed == false" type="submit" @click="changeStatus()" class="mx-2 btn btn-sm btn-primary ">Close bug</button>
        <addComment> </addComment>

        <comment v-for="Comment in Comments" :commentData="Comment" :key="Comment.id">
            </comment>
    </div>
</template>


<script>
import Comment from "../components/comments"
import addComment from "../components/AddComment"
export default {
    name: 'Bug',
    confirm: true,
    // name: 'comments',
    props:["bugData"],
    data(){
        return {
            // comment: {}
        }
    },
    mounted(){
        this.$store.dispatch('getComments', this.$route.params.bugId)
        this.$store.dispatch('setActiveBug', this.$route.params.bugId)
    },
    computed:{
        Bug(){
            return this.$store.state.activeBug
        },
        Comments(){
            return this.$store.state.comments
        }
    },
    methods:{
        changeStatus(){
            this.confirm  = confirm("are you sure?")
            if(this.confirm == true){
                this.$store.dispatch("changeStatus", this.Bug)

            }
        }
    },
    // props: ["bugId"],
    components:{
        addComment,
        Comment
    }
}
</script>


<style scoped>

</style>