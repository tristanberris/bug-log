
<template>
  <div class="home container-fluid">
    <img alt="Vue logo" src="../assets/logo.png" />
    <h1>Welcome to Your Vue.js App</h1>
    <CreateBug> </CreateBug>
    <div class="row">
      <!-- <router-link @click="setActiveBug(bugs._id)" :to="{name: 'Bug', params: {bugId: bugs._id}}">

      </router-link> -->
      <bug  v-for="bug in bugs" :bugData="bug" :key="bug._id"></bug> 
      <!-- <bug v-if="!sorted" v-for="bug in sortedBugs" :bugData="bug" :key="bug._id"></bug>  -->
      
    </div>
    <!-- <Bug></Bug> -->
  </div>
</template>

<script>
import Bug from "../components/bug"
import CreateBug from "../components/CreateBug"
export default {
  name: 'bugs',
  sorted: false,
  mounted(){
    this.$store.dispatch("getBugs")
  },
  data(){
    return {
      
    };
  },
  computed:{
    bugs(){
      return this.$store.state.bugs
    },
    sortedBugs(){
      return this.$store.state.bugs.closed.sort(
        (a, b) => a.make.charCodeAt(0) - b.make.charCodeAt(0)
      );
    },
    created(){
          this.$store.dispatch("getBugs")

    }
  },
  methods:{
    
  },
 
 components:{
   Bug,
   CreateBug,
 }
};

</script>
