import * as firebase from 'firebase'
import 'firebase/firestore'

export default ({
    state: {
        loadedEmployees: [],
        user: null
    },
    mutations: {
        setUser (state, payload) {
            state.user = payload
          },
        setLoadedEmployees (state, payload) {
            console.log('setovao'+payload)
            state.loadedEmployees = payload
        },
        createEmployee(state, payload) {
            state.loadedEmployees.push(payload)
        },
        updateEmployee(state, payload) {
            const employee = state.loadedEmployees.find(employee => {
                return employee.email === payload.email 
            })
            if (payload.email) {
                employee.email = payload.email
            }
            if (payload.firstName) {
                employee.firstName = payload.firstName
            }
            if (payload.lastName) {
                employee.lastName = payload.lastName
            }
            if (payload.position) {
                employee.position = payload.position
            }
        },
        deleteEmployee(state, payload) {
            state.loadedEmployees.find(employee => {
                return employee.email === payload.email
            })
        },
        },
    actions:{
        deleteEmployee ({ commit }, payload){
            commit('setLoading', true)
            firebase.firestore().collection("user").doc(payload).delete().then(function() {
                commit('deleteEmployee', payload)
                console.log("Document successfully deleted!");
                location.reload()
            }).catch(function(error) {
                console.error("Error removing document: ", error);
            });
            
        },

        updateEmployeeData({ commit }, payload) {
            commit('setLoading', true)
            firebase.firestore().collection("user").doc(payload.email).update(payload)
                .then(() => {
                    console.log(payload.email+"===>")
                    commit('updateEmployee', payload)
                    commit('setLoading', false)
                })
                .catch((error) => {
                    console.log(error)
                    commit('setLoading', false)
                })
        },
        createEmployee({ commit }, payload) {
            const employee = {
                email: payload.email,
                firstName: payload.firstName,
                lastName: payload.lastName,
                position: payload.position,
                createdAt: Date.now(),
                id: null
            }
            let key
            firebase.firestore().collection("user").add(employee)
                .then(function(docRef) {
                key = docRef.id
                console.log("Document written with ID: ", key);
                return key
                })
                .then(() => {
                    commit('createEmployee',{
                        ...employee,
                        id: key
                    })
                    console.log('user created2')
                    commit('setLoading', false)    
                })
                .catch(error => {
                    commit('setLoading', false)    
                    console.log(error)
                })
        },
        loadedEmployee({ commit }) {
            console.log(" ===========> ")
            commit('setLoading', true)
                firebase.firestore().collection("user").get()
                    .then(function (querySnapshot) {
                        const users = []
                        querySnapshot.forEach(function (doc) {
                            console.log(doc.id, " => ", doc.data())
                            users.push({
                                email: doc.data().email,
                                firstName: doc.data().firstName,
                                lastName: doc.data().lastName,
                                position: doc.data().position,
                                id: doc.data().id,
                            })
                        })
                        commit('setLoadedEmployees', users)
                        commit('setLoading', false)
                    }).catch(
                        (error) => {
                            console.log(error)
                            commit('setLoading', false)
                        }
                    )
            },
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
        loadedEmployees(state) {
            console.log("nestooooooo"+state.loadedEmployees.length)
            return state.loadedEmployees.slice(0, 20)
            console.log("staa")

        }

    }
})
