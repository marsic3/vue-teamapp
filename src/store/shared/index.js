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
    setLoadedTimesheet(state, payload) {
      state.loadedTimeSheet = payload
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
        createdAt: new Date(),
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

      },
      loadedTimeSheet({ commit }) {
        commit('setLoading', true)
        firebase.firestore().collection("timesheet").get()
            .then(function (querySnapshot) {
                const timesheets = []
                querySnapshot.forEach(function (doc) {
                    console.log(doc.id, " => ", doc.data())
                    timesheets.push({
                        createdAt: doc.data().createdAt,
                        happiness: doc.data().happiness,
                        project: doc.data().project,
                        userId: doc.data().userId,
                        workingHours: doc.data().workingHours,
                    })
                })
                commit('setLoadedTimesheet', timesheets)
                commit('setLoading', false)

            }).catch(
                (error) => {
                    console.log(error)
                    commit('setLoading', false)
                }
            )
    },
    },
    getters: {
      loading (state) {
        return state.loading
      },
      error (state) {
        return state.error
      },
      loadedTimeSheet(state) {
        return state.loadedTimeSheet
    },
    }
  }