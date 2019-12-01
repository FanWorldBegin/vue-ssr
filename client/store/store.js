import Vuex from 'vuex'
import defaultState from './state/state'
import mutations from './mutations/mutations'
import getters from './getters/getters'
import actions from './action/action'
const isDev = process.env.NODE_ENV === 'development'
export default () => {
  return new Vuex.Store({
    // strict: true, // 禁止直接修改state
    strict: isDev,
    state: defaultState,
    mutations: mutations,
    getters,
    actions
  })
}
