import Vuex from 'vuex'
import defaultState from './state/state'
import mutations from './mutations/mutations'
import getters from './getters/getters'
import actions from './action/action'
const isDev = process.env.NODE_ENV === 'development'
export default () => {
  const store = new Vuex.Store({
    // strict: true, // 禁止直接修改state
    strict: isDev,
    state: defaultState,
    mutations: mutations,
    getters,
    actions,
    plugins: [
      (store) => {
        console.log('my plugin invoked')
      }
    ],
    modules: {
      a: {
        namespaced: true,
        state: {
          text: 1
        },
        mutations: {
          updateText (state, text) {
            // state 为 a模块的state
            state.text = text
          }
        },
        getters: {
          textPlus (state, getters, rootState) {
            return state.text + rootState.count + rootState.b.text
          }
        },
        actions: {
          add ({ state, commit, rootState }) {
            // context 模块的
            commit('updateText', rootState.count)
            // 调用全局参数
            commit('updateCount', { num: 1, num2: 2 }, { root: true })
          }
        }
      },
      b: {
        state: {
          text: 2
        },
        actions: {
          textAction ({ commit }) {
            commit('a/updateText', 'test test', { root: true })
          }
        }
      }
    }
  })
  // webpack热更新代码
  if (module.hot) {
    module.hot.accept([
      // 对应配置的引入地址
      './state/state',
      './mutations/mutations',
      './getters/getters',
      './action/action'

    ], () => {
      // 代码内部不能使用import
      const newState = require('./state/state').default
      const newMutations = require('./mutations/mutations').default
      const newGetters = require('./getters/getters').default
      const newAction = require('./action/action').default
      store.hotUpdate({
        state: newState,
        mutations: newMutations,
        getters: newGetters,
        action: newAction
      })
    })
  }
  return store
}
