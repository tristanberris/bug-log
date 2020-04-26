<template>
    <div class="create-bug">
        <form @submit.prevent="createBug()">
          <div class="form-group">
            <div class="input-group">
              <div class="input-group-prepend">
                <button class="btn btn-outline-secondary" type="submit">Create Bug</button>
              </div>
              
              <input
                type="text"
                name= "title"
                class="form-control"
                required
                placeholder="Add Bug"
                v-model="bugData.title"
                aria-label
                aria-describedby="basic-addon1"
              />
              <input
                type="text"
                name= "description"
                class="form-control"
                required
                placeholder="Add Description"
                v-model="bugData.description"
                aria-label
                aria-describedby="basic-addon1"
              />
            </div>
          </div>
        </form>

    </div>
</template>


<script>
export default {
    name: "create-bug",
    
    data(){
        return {
            bugData: {}
        };
    },
    computed:{},
    methods:{
         createBug(){
           this.$store.dispatch("createBug", this.bugData);
           this.bugData = {}
        }
    },
    components:{
        
    }
}
</script>


<style scoped>

</style>