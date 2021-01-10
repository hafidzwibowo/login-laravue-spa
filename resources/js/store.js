import Vue from 'vue'
import Vuex from 'vuex'
import persistedState from 'vuex-persistedstate'
import SecureLS from 'secure-ls'

Vue.use(Vuex)
const ls = new SecureLS({ encodingType: 'aes', isCompression: false })

const store = new Vuex.Store({
    state: {
        isAdmin: null,
        user: {}
        // baca dokumentasi di https://vuex.vuejs.org/guide/
    },
    getters: {
        // baca dokumentasi di https://vuex.vuejs.org/guide/

    },
    mutations: {
        setLogin(state, payload) {
            state.isAdmin = payload
        },
        setUser(state, payload) {
            state.user = payload
        }
        // baca dokumentasi di https://vuex.vuejs.org/guide/

    },
    actions: {
        checkLogin: async ({ commit, dispatch }) => {
            axios.get('/api/is-login').then(resp => {
                if (resp.data.status) {
                    commit('setLogin', true)
                    dispatch('getUser')
                } else {
                    commit('setLogin', false)
                }
            })
        },
        setLogin: async ({ commit, dispatch }, payload) => {
            commit('setLogin', payload.status)
            dispatch('setUser', payload.data)
        },
        getUser: async ({ commit }) => {
            axios.get('/api/user').then(resp => {
                commit('setUser', resp.data)
            })
        },
        setUser: async ({ commit }, payload) => {
            commit('setUser', payload)
        }
    },
    plugins: [
        persistedState({
            storage: {
                getItem: (key) => ls.get(key),
                setItem: (key, value) => ls.set(key, value),
                removeItem: (key) => ls.remove(key)
            }
        })
    ]
})

store.commit

export default store