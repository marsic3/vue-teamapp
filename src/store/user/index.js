import * as firebase from 'firebase'
import 'firebase/firestore'
 

export default {
    state: {
        user: null,
    },
    mutations: {
        setUser (state, payload) {
            state.user = payload
          },
        },
    actions:{
        signUserUp({commit}, payload){
            commit('setLoading', true)
            commit('clearError')
            firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
            .then(response => {
                commit('setLoading', false)
                const newUser = {
                    id:response.user.uid
                }
                commit('setUser', newUser)
            })
            .catch(error => {
                commit('setLoading', false)
                commit('setError', error)
                console.log(error)
            })
        },
        signUserIn({commit}, payload){
            commit('setLoading', true)
            commit('clearError')
            firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
            .then(response => {
                const newUser = {
                    id:response.user.uid
                }
                commit('setUser', newUser)
            })
            .catch(error => {
                commit('setError', error)
                commit('setLoading', false)
                console.log(error)
            })
        },
        autoSignIn({commit}, payload){
            commit('setUser', {id: payload.uid})
        },
        logout({commit}) {
            firebase.auth().signOut()
            commit('setUser', null)
        }
    },
    getters: {
        user(state){
            return state.user
        },

    }
}
