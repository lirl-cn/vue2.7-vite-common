import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store<{count: number, collapse: boolean, company?: any, message?: any, common?: any}>({
  modules: {
  },
  state: {
    count: 0,
    collapse: false,
  },
  getters: {
    count(state) {
      return state.count
    },
    collapse(state){
      return state.collapse
    }
  },
  mutations: {
    addCount(state, num) {
      state.count += num
    },
    setCollapse(state, collapse){
      state.collapse = collapse
    },
    // 重置vuex本地储存状态
    resetStore (state:any) {
      state.collapse = false;
      state.count = 0;
      Object.keys(state).forEach(key => {
        if(key !== 'collapse' && key !== 'count'){
          state[key] = {}
        }
      })
      console.log('??????????')
    }
  },
  actions: {}
})