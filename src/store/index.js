import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'
import 'firebase/firestore'
Vue.use(Vuex)
 

export const store = new Vuex.Store({
    state: {
        loadedProjects:[
            {
                projectName: "Insulclock",
                description: 'Madrid, Comunidad de Madrid',
                imageUrl:
                  "http://startupmadrid10.com/proyectos/wp-content/uploads/2017/06/insulclock_logo_retina.png",
                flex: 12,
                id: 1,
                date: '2017-07-17',
                email:'arsic.milos30@gmail.com'
              },
              {
                projectName: "Favorite road trips",
                description: 'Madrid, Comunidad de Madrid',
                imageUrl: "https://cdn.vuetifyjs.com/images/cards/road.jpg",
                flex: 12,
                id: 2,
                date: '2017-07-17',
                email:'arsic.milos30@gmail.com'


              },
              {
                projectName: "Best airlines",
                description: 'Madrid, Comunidad de Madrid',
                imageUrl: "https://cdn.vuetifyjs.com/images/cards/plane.jpg",
                flex: 12,
                id: 3,
                date: '2017-07-17',
                email:'arsic.milos30@gmail.com'


              }
        ],
        user: null,
        loading: false,
        error: null

    },
    mutations: {
        setLoadedProjects(state,payload){
            state.loadedProjects = payload
        },
        // updateProject(state,payload){
        //     const project = state.loadedProjects.find(project => {
        //         return project.id = payload.id
        //     })
        //     if(payload.projectName){
        //         project.projectName = payload.projectName
        //     }
        //     if(payload.description){
        //         project.description = payload.description
        //     }
        //     if(payload.date){
        //         project.date = payload.date
        //     }
            
        // },
        updateProject (state, payload) {
            const project = state.loadedProjects.find(project => {
              return project.id === payload.id
            })
            if (payload.projectName) {
                project.projectName = payload.projectName
            }
            if (payload.description) {
                project.description = payload.description
            }
            if (payload.date) {
              project.date = payload.date
            }
        },
        createProject(state,payload){
            state.loadedProjects.push(payload)
        },
        setUser(state,payload){
            state.user = payload
        },
        setLoading(state,payload){
            state.loading = payload
        },
        setError(state,payload){
            state.error = payload
        },
        clearError(state){
            state.error = null
        },

    },
    actions: {
        loadedProject({commit}, payload){
            commit('setLoading', true)
            firebase.firestore().collection("projects").get()
            .then(function(querySnapshot) {
                const projects = []
                querySnapshot.forEach(function(doc) {
                    console.log(doc.id, " => ", doc.data());
                    projects.push({
                        projectName: doc.data().projectName,
                        email: doc.data().email,
                        imageUrl: doc.data().imageUrl,
                        description: doc.data().description,
                        date: doc.data().date,
                        id: doc.data().id,
                        creatorId: doc.data().creatorId

                    }) 
                })
                commit('setLoadedProjects', projects)
                commit('setLoading', false)

            }).catch(
                (error) => {
                  console.log(error)
                  commit('setLoading', false)
                }
              )
        },
        createProject({commit, getters}, payload) {
            const project = {
                projectName: payload.projectName,
                email: payload.email,
                description: payload.description,
                date: payload.date,
                id: payload.id,
                creatorId: getters.user.id
            }
            let imageUrl
            let uploadTask
            firebase.firestore().collection("projects").doc("p"+project.id).set(project)
                .then((user) => {
                console.log("Document successfully written!"+user)
            })  .then(() => {
                const filename = payload.image.name
                const ext = filename.slice(filename.lastIndexOf('.'))
                // Create a root reference
                const storageRef = firebase.storage().ref()
                uploadTask = storageRef.child('projects/' + project.id + ext).put(payload.image)
              })
              .then(() => {
                commit('setLoading', true)
                uploadTask.on('state_changed', function (snapshot) {
                }, function (error) {
                  console.log(error)
                  commit('setLoading', false)
                }, function () {
                  uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                    console.log('File available at', downloadURL)
                    imageUrl = downloadURL
                    if (imageUrl) {
                        firebase.firestore().collection('projects').doc('p'+project.id).update({imageUrl: imageUrl})
                      console.log('image updated')
                      commit('createProject', {
                        ...project,
                        imageUrl: imageUrl,
                        id: project.id
                      })
                      commit('setLoading', false)
                    } else {
                      commit('setLoading', false)
                    }
                  })
                })
              })
            },
        updateProjectData({commit}, payload){
            commit('setLoading', true)
            const updateObj = {}
            if(payload.projectName){
                updateObj.projectName = payload.projectName
            }
            if(payload.description){
                updateObj.description = payload.description
            }
            
            firebase.firestore().collection("projects").doc("p"+payload.id).update(updateObj)
            .then(()=>{
                console.log("p"+payload.id)
                commit('updateProject', payload)
                commit('setLoading',false)

            })
            .catch((error)=>{
                console.log(error)
                commit('setLoading',false)

            })
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
        clearError({commit}){
            commit('clearError')
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
        loadedProjects(state){
            return state.loadedProjects.sort((p1,p2) => {
                return p1.id<p2.id
            })
        },
        feautureProjects(state,getters){
            return getters.loadedProjects.slice(0,5)
        },
        loadedProject(state){
            return (projectId) =>   {
            return state.loadedProjects.find((p) => {
                return p.id==projectId
            })
        }
        },
        user(state){
            return state.user
        },
        error(state){
            return state.error
        },
        loading(state){
            return state.loading
        }

    }
})
