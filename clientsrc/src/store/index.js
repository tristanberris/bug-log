import Vue from "vue";
import Vuex from "vuex";
import Axios from "axios";
import router from "../router";

Vue.use(Vuex);

let baseUrl = location.host.includes("localhost")
  ? "http://localhost:3000/"
  : "/";

let api = Axios.create({
  baseURL: baseUrl + "api",
  timeout: 3000,
  withCredentials: true
});

export default new Vuex.Store({
  state: {
    profile: {},
    bugs: [],
    activeBug: {},
    comments: []
  },
  mutations: {
    setProfile(state, profile) {
      state.profile = profile;
    },
    setBugs(state, bugs){
      state.bugs = bugs
    },
    setActiveBug(state, activeBug){
      state.activeBug = activeBug
    },
    setComments(state, payload){
      state.comments = payload
      // Vue.set(state.comments, payload.bugId, payload.comments)
    }
  },
  actions: {
    setBearer({}, bearer) {
      api.defaults.headers.authorization = bearer;
    },
    resetBearer() {
      api.defaults.headers.authorization = "";
    },
    async getProfile({ commit }) {
      try {
        let res = await api.get("profile");
        commit("setProfile", res.data);
      } catch (error) {
        console.error(error);
      }
    },

    //#region -- BUGS --
    async createBug({commit, dispatch}, bugData){
      try {
        // console.log("adding bug", bugData)
        let res = await api.post('bugs', bugData)
        dispatch('getBugs')
        
        // dispatch('setActiveBug', bugData._id)
      } catch (error) {
        console.error(error)
      }
    },
    async getBugs({commit,dispatch}){
      try {
        api.get('bugs')
        .then(res => {
          commit('setBugs', res.data)
          // console.log(res.data)
        })
      } catch (error) {
        console.error(error)
      }
    },
    async setActiveBug({commit, dispatch}, bugsId){
      try {
        let res = await api.get( `bugs/${bugsId}`)
        commit('setActiveBug', res.data)
        // console.log("setting active bug", res.data)
      } catch (error) {
        console.error(error)
      }
    },
    async changeStatus({commit, dispatch}, bug){
      try {
        bug.closed = !bug.closed
        await api.put('bugs/' + bug.id, bug)  
      } catch (error) {
        console.error(error)
      }
    },
    async editBug({commit, dispatch}, newBug){
      try {
        console.log(newBug)
        
        await api.put('bugs/' + newBug.id, newBug)
      } catch (error) {
        console.error(error)
      }
    },
    //#endregion
    //#region -- COMMENTS --
    async addComment({commit, dispatch}, commentData){
      try {
        // console.log("adding comment", commentData )
        await api.post("comments", commentData)
        dispatch('getComments', commentData.bugId)
      } catch (error) {
        console.error(error)
      }
    },
    async getComments({commit, dispatch}, bugId){
      try {
        let res = await api.get( `bugs/${bugId}/comments`)
        // commit('setComments', {bugId, comments: res.data})
        // let res = await api.get("comments")
        commit('setComments', res.data)
        console.log(res.data)
      } catch (error) {
        console.log(error)
      }
    },
    async deleteComment({commit,dispatch}, comment){
      try {
        await api.delete(`comments/` + comment._id)
        dispatch('getComments', comment.bug)
      } catch (error) {
        console.error(error)
      }
    },
    //#endregion
  }
});
