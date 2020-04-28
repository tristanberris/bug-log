<template>
    <div class="comments">
        <span>{{commentData.creatorEmail}}</span>
        <h3>{{commentData.description}}</h3>
        <button  class="btn btn-danger" @click="deleteComment()"> Delete </button>

    </div>
</template>


<script>
export default {
    name: 'comments',
    // confirm: true,
    props: ["commentData"],
    data(){
        return {}
    },
    computed:{
        comments(){
            return this.$store.state.comments
        }
    },
    methods:{
        deleteComment(){
            this.$store.dispatch('deleteComment', this.commentData)
            // this.confirm = confirm("are you sure?")
            // if(this.confirm == true){
                // }

        }
    },
    components:{}
}
</script>


<style scoped>

</style>