<template>
    <div class="comments">
        <span>{{commentData.creatorEmail}}</span>
        <h3>{{commentData.description}}</h3>
        <button v-if="Bug.closed == false" class="btn btn-danger" @click="deleteComment()"> Delete </button>

    </div>
</template>


<script>
export default {
    name: 'comments',
    confirm: true,
    props: ["commentData"],
    data(){
        return {}
    },
    computed:{
        comments(){
            return this.$store.state.comments
        },
        Bug(){
            return this.$store.state.activeBug
        },
    },
    methods:{
        deleteComment(){
            this.confirm = confirm("are you sure?")
            if(this.confirm == true){
            this.$store.dispatch('deleteComment', this.commentData)
                }

        }
    },
    components:{}
}
</script>


<style scoped>

</style>