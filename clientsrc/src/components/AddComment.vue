<template>
    <div class="AddComment">
         <form class="form-inline justify-content-center" @submit.prevent="addComment()">
          <div class="form-group">
            <input
              type="text"
              name="comment"
              id
              class="mx-1 form-control form-control-sm"
              placeholder="Add comment!"
              aria-describedby="helpId"
              required
              v-model="newComment.description"
            />
            <button type="submit" class="mx-2 btn btn-sm btn-secondary ">Add Comment</button>
          </div>
        </form>

    </div>
</template>


<script>
export default {
    name: 'AddComment',
    data(){
        return {
            newComment: {}
        }
    },
    computed:{
        bug(){
            return this.$store.state.activeBug
        }
    },
    methods:{
        addComment(){
            this.newComment.bug = this.bug.id
            console.log("adding comment from vue", this.newComment)
            this.$store.dispatch("addComment", this.newComment)
            this.newComment = {}
        }
    },
    components:{}
}
</script>


<style scoped>

</style>