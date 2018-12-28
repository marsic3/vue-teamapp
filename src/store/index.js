import Vue from 'vue'
import Vuex from 'vuex'

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
        user: {
            id:'arsic.milos30@gmail.com',

        }

    },
    mutations: {
        createProject(state,payload){
            state.loadedProjects.push(payload)
        }
    },
    actions: {
        createProject({commit}, payload) {
            const project = {
                projectName: payload.projectName,
                email: payload.email,
                imageUrl: payload.imageUrl,
                description: payload.description,
                date: payload.date,
                id: 4
            }
            commit('createProject', project)
            console.log('project created')
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

    }
})
