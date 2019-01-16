import * as firebase from 'firebase'
import 'firebase/firestore/dist/index.cjs'

export default ({
    state: {
        loadedEmployees: [],
        color: null,
        userId: 0,
        user: null,
        userData: null
    },
    mutations: {
        setUser (state, payload) {
            state.user = payload
          },
        setLoadedEmployees (state, payload) {
            console.log('setovao'+payload)
            state.loadedEmployees = payload
        },
        setUserData(state, payload) {
            console.log('setovao'+payload)
            state.userData = payload
        },
        setColor (state, payload) {
            console.log('setovao color ::'+payload)
            state.color = payload
        },
        setUserId (state, payload) {
            console.log('setovao user ID ::'+payload)
            state.userId = payload
        },
        createEmployee(state, payload) {
            state.loadedEmployees.push(payload)
        },
        updateEmployee(state, payload) {
            const employee = state.loadedEmployees.find(employee => {
                return employee.key === payload.key 
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
            firebase.firestore().collection("user").doc(payload.key).delete().then(function() {
                commit('deleteEmployee', payload)
                console.log("Document successfully deleted!");
                commit('setLoading', false)

                location.reload()
            }).catch(function(error) {
                commit('setLoading', false)
                console.error("Error removing document: ", error);
            });
            
        },

        updateEmployeeData({ commit }, payload) {
            commit('setLoading', true)
            const updateObj = {}
            if (payload.email) {
                updateObj.email = payload.email
            }
            if (payload.firstName) {
                updateObj.firstName = payload.firstName
            }
            if (payload.lastName) {
                updateObj.lastName = payload.lastName
            }
            if (payload.position) {
                updateObj.position = payload.position
            }
            if (payload.color) {
                updateObj.color = payload.color
            }
            // console.log(payload.id+"===>")

            firebase.firestore().collection("user").doc(payload.key).update(updateObj)
                .then(() => {
                    console.log(payload.key+"===>"+updateObj)
                    commit('updateEmployee', payload)
                    console.log('document uspesno updatovan')

                    commit('setLoading', false)
                })
                .catch((error) => {
                    console.log(error)
                    commit('setLoading', false)
                })
        },
        createEmployee({ commit,getters }, payload) {
            const employee = {
                key: payload.key,
                email: payload.email,
                firstName: payload.firstName,
                lastName: payload.lastName,
                position: payload.position,
                createdAt: Date.now(),
                id: getters.getUserId+1,
                color: payload.color
            }
            firebase.firestore().collection("user").doc(payload.key).set(employee)
                .then(() => {
                console.log("Document written with ID: ", payload.key)
                commit('createEmployee',employee)
                commit('setLoading', false)  
                })
                .catch(error => {
                    commit('setLoading', false)    
                    console.log(error)
                })
        },
        loadUserInfo({ commit}, payload){
            commit('setLoading', true)
            console.log('email', '==', payload.email)
            firebase.firestore().collection('user').where('email', '==', payload.email).get()
                .then(function (querySnapshot) {
                    querySnapshot.forEach(function (doc) {
                      console.log(doc.id, " => ", doc.data());
                      commit('setUserData', doc.data())

                        })
                    commit('setLoading', false)
                }).catch(
                    (error) => {
                        console.log(error)
                        commit('setLoading', false)
                    }
                )

        },
        loadedEmployee({ commit }) {
            console.log(" ===========> ")
            commit('setLoading', true)
                firebase.firestore().collection("user").get()
                    .then(function (querySnapshot) {
                        const users = []
                        querySnapshot.forEach(function (doc) {
                            console.log(doc.data().key, " => ", doc.data())
                            users.push({
                                email: doc.data().email,
                                firstName: doc.data().firstName,
                                lastName: doc.data().lastName,
                                position: doc.data().position,
                                key: doc.data().key,
                                id: doc.data().id,
                                color: doc.data().color,
                            })
                        })
                        commit('setLoadedEmployees', users)
                        // commit('setColor', '#00bdae')
                        commit('setUserId', users.length)                    
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
            commit('setUser', {id: payload.uid,
                               password: payload.password,
                               email: payload.email,
                                 })
        },
        logout({commit}) {
            firebase.auth().signOut()
            window.location.href = '/signin'
            commit('setUser', null)
        },
        updatePassword({commit}, payload){
            var user = firebase.auth().currentUser
            console.log(user)
            user.updatePassword(payload).then(function() {
                // Update successful.
            firebase.auth().signOut()
            commit('setUser', null)
            window.location.href = '/signin'
            }).catch(function(error) {
                // An error happened.
            });
        }
    },
    getters: {
        user(state){
            return state.user
        },
        getUserId(state){
            return state.userId
        },
        loadedEmployees(state) {
            console.log("nestooooooo"+state.loadedEmployees.length)
            return state.loadedEmployees
            console.log("staa")
        },
        loadUser(state){
            return state.userData
        }
    }
})
