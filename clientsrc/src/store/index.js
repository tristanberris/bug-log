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
        console.log("adding bug", bugData)
        let res = await api.post('bugs', bugData)
        dispatch('getBugs')
      } catch (error) {
        console.error(error)
      }
    },
    async getBugs({commit,dispatch}){
      try {
        api.get('bugs')
        .then(res => {
          commit('setBugs', res.data)
          console.log(res.data)
        })
      } catch (error) {
        console.error(error)
      }
    },
    async setActiveBug({commit, dispatch}, bugsId){
      try {
        let res = await api.get( `bugs/${bugsId}`)
        commit('setActiveBug', res.data)
        console.log("setting active bug", res.data)
      } catch (error) {
        
      }
    }
    //#endregion
  }
});
