import * as firebase from 'firebase'
import 'firebase/firestore/dist/index.cjs'
export default {
    state: {
      loading: false,
      error: null,
      loadedTimeSheet:[]
    },
    mutations: {
      setLoading (state, payload) {
        state.loading = payload
      },
      setError (state, payload) {
        state.error = payload
      },
      clearError (state) {
        state.error = null
      },
      createTimeSheet(state, payload) {
        state.loadedTimeSheet.push(payload)
    },
    },
    actions: {
      clearError ({commit}) {
        commit('clearError')
      },
      createTimeSheet ({commit, getters}, payload ) {
      const timesheet = {
        userId: getters.loadUser.key,
        project: payload.project,
        happiness: payload.happiness,
        workingHours: payload.workingHours,
        createdAt: Date.now(),
    }
    firebase.firestore().collection("timesheet").doc().set(timesheet)
        .then(() => {
        console.log("Document written with ID: ", timesheet)
        commit('createTimeSheet',timesheet)
        commit('setLoading', false)  
        })
        .catch(error => {
            commit('setLoading', false)    
            console.log(error)
        })

      } 
    },
    getters: {
      loading (state) {
        return state.loading
      },
      error (state) {
        return state.error
      }
    }
  }