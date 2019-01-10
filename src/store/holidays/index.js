import * as firebase from 'firebase'
import 'firebase/firestore'


export default ({
    state: {
        loadedHolidays: []
    },
    mutations: {
        setLoadedHolidays(state, payload) {
            state.loadedHolidays = payload
        },
        // updateProject(state, payload) {
        //     const project = state.loadedHolidays.find(project => {
        //         return project.id === payload.id
        //     })
        //     if (payload.projectName) {
        //         project.projectName = payload.projectName
        //     }
        //     if (payload.description) {
        //         project.description = payload.description
        //     }
        //     if (payload.date) {
        //         project.date = payload.date
        //     }
        // },
        createHoliday(state, payload) {
            state.loadedHolidays.push(payload)
        },

    },
    actions: {
        loadedHolidays({ commit }) {
            commit('setLoading', true)
            firebase.firestore().collection("holidays").get()
                .then(function (querySnapshot) {
                    const holidays = []
                    querySnapshot.forEach(function (doc) {
                        // console.log(JSON.stringify(doc.data()))
                        console.log(doc.id, " => ", doc.data())
                        holidays.push({
                            Id: doc.data().Id,
                            StartTime: doc.data().StartTime.toDate(),
                            EndTime: doc.data().EndTime.toDate(),
                            IsAllDay: doc.data().IsAllDay,
                            Subject: doc.data().Subject,
                            TaskId: doc.data().TaskId,
                            // creatorId: doc.data().creatorId
                        })
                    })
                    // console.log(JSON.stringify(holidays))
                    // console.log(holidays)
                    commit('setLoadedHolidays', holidays)
                    commit('setLoading', false)

                }).catch(
                    (error) => {
                        console.log(error)
                        commit('setLoading', false)
                    }
                )
        },
        createHoliday({ commit, getters }, payload) {
            const holiday = {
                Id: payload.id,
                StartTime: payload.startTime,
                EndTime: payload.endTime,
                IsAllDay: payload.isAllDay,
                Subject: payload.subject,
                TaskId: payload.taskId,
            }
            firebase.firestore().collection("holidays").doc().set(holiday)
            .then(() => {
                console.log("Document written with ID: ", payload.id)
                commit('createHoliday',holiday)
                commit('setLoading', false)  
                })
                .catch(error => {
                    commit('setLoading', false)    
                    console.log(error)
                })
        },
        // updateHoliday() {
        //     return firebase.firestore().collection("holidays").doc("DC").update({
        //         capital: true
        //     })
        //         .then(function () {
        //             console.log("Document successfully updated!");
        //         })
        //         .catch(function (error) {
        //             console.error("Error updating document: ", error);
        //         });

        // },
    },
    getters: {
        loadedHolidays(state) {
            return state.loadedHolidays
        },
        // feautureHolidays(state, getters) {
        //     return getters.loadedHolidays.slice(0, 5)
        // },
        // loadedProject(state) {
        //     return (projectId) => {
        //         return state.loadedHolidays.find((p) => {
        //             return p.id == projectId
        //         })
        //     }
        // },
    }
})
