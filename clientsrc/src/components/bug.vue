<template>
    <div class="bug col-12">
         <router-link @click="setActiveBug(bugs._id)" :to="{name: 'Bug', params: {bugId: bugData._id}}">

        <span class="">{{bugData.title}} </span>
        <!-- <span class="col-3">{{bugData.description}}</span> -->
        <span class="col-3">{{bugData.creator.name}}</span>
        <span v-if="bugData.closed == false" class="col-3 text-green">Open</span>
        <span v-else class="col-3 text-red">Closed</span>
        <span class="col-3"> {{bugData.updatedAt}} </span>
        <!-- <span class="col-3">{{bugData.createdAt}}</span>
        <span class="col-3">{{bugData.createdAt}}</span> -->
      </router-link>

    </div>
</template>


<script>
export default {
    name: "bugs",
    props: ["bugData"],
    data(){
        return {}
    },
    computed:{
        // bugs(){
        //     return this.$store.state.bugs
        // }
    },
    // props: ["bugId"],
    methods:{
        // selectBug(){
        //     console.log("running selectBug")
        //     this.$store.commit("setActiveBug", bug._id)
            
        // }
    },
    components:{}
}
</script>


<style scoped>
.bug{
    border: 1px solid black;
}
.text-red{
    color: red;
}
.text-green{
    color: rgb(24, 211, 24);
}
</style>