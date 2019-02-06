import * as firebase from 'firebase'
import 'firebase/firestore'


export default ({
    state: {
        loadedProjects: []
    },
    mutations: {
        setLoadedProjects(state, payload) {
            state.loadedProjects = payload
        },
        updateProject(state, payload) {
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
            if (payload.date) {
                project.date = payload.date
            }
            if (payload.status) {
                project.status = payload.status
            }
        },
        createProject(state, payload) {
            state.loadedProjects.push(payload)
        },
        deleteProject(state, payload) {
            state.loadedProjects.find(p => {
                return p.id === payload.id
            })
        },

    },
    actions: {
        deleteProject ({ commit }, payload){
            commit('setLoading', true)
            firebase.firestore().collection("projects").doc('p'+payload).delete().then(function() {
                commit('deleteProject', payload)
                console.log("Document successfully deleted!");
                commit('setLoading', false)
                this.$router.push({ name: 'projects' });
            }).catch(function(error) {
                commit('setLoading', false)
                console.error("Error removing document: ", error);
            });
            
        },
        loadedProject({ commit }) {
            commit('setLoading', true)
            firebase.firestore().collection("projects").get()
                .then(function (querySnapshot) {
                    const projects = []
                    querySnapshot.forEach(function (doc) {
                        console.log(doc.id, " => ", doc.data())
                        projects.push({
                            projectName: doc.data().projectName,
                            email: doc.data().email,
                            imageUrl: doc.data().imageUrl,
                            description: doc.data().description,
                            date: doc.data().date,
                            id: doc.data().id,
                            creatorId: doc.data().creatorId,
                            status: doc.data().status
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
        createProject({ commit, getters }, payload) {
            const project = {
                projectName: payload.projectName,
                email: payload.email,
                description: payload.description,
                date: payload.date,
                id: payload.id,
                status: payload.status,
                creatorId: getters.user.id
            }
            let imageUrl
            let uploadTask
            firebase.firestore().collection("projects").doc("p" + payload.id).set(project)
                .then((user) => {
                    console.log("Document successfully written!" + user)
                }).then(() => {
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
                                firebase.firestore().collection('projects').doc('p' + project.id).update({ imageUrl: imageUrl })
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
        updateProjectData({ commit }, payload) {
            commit('setLoading', true)
            const updateObj = {}
            if (payload.projectName) {
                updateObj.projectName = payload.projectName
            }
            if (payload.description) {
                updateObj.description = payload.description
            }
            if (payload.status) {
                updateObj.status = payload.status
            }

            firebase.firestore().collection("projects").doc("p" + payload.id).update(updateObj)
                .then(() => {
                    console.log("p" + payload.id)
                    commit('updateProject', payload)
                    commit('setLoading', false)

                })
                .catch((error) => {
                    console.log(error)
                    commit('setLoading', false)

                })
        },
    },
    getters: {
        loadedProjects(state) {
            return state.loadedProjects.sort((p1, p2) => {
                return p1.id < p2.id
            })
        },
        feautureProjects(state, getters) {
            return getters.loadedProjects.slice(0, 5)
        },
        loadedProject(state) {
            return (projectId) => {
                return state.loadedProjects.find((p) => {
                    return p.id == projectId
                })
            }
        },
    }
})
