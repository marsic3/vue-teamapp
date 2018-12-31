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
                        id: doc.data().id
                    }) 
                })
                commit('setLoadedProjects', projects)
            })
        },
        createProject({commit}, payload) {
            const project = {
                projectName: payload.projectName,
                email: payload.email,
                imageUrl: payload.imageUrl,
                description: payload.description,
                date: payload.date,
                id: payload.id,
                // creatorId: getters.user.id
            }
            firebase.firestore().collection("projects").doc("p"+project.id).set(project)
                .then((user) => {
                commit('createProject', project)
                console.log("Document successfully written!"+user)
            })  
                .catch(error =>{
                    console.log(error)
                })
            
            console.log('project created'+ project.date)
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
            return state.loadedProjects.find((p1) => {
                return p1.id==projectId
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
