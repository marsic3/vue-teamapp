import * as firebase from 'firebase'
import 'firebase/firestore'


export default ({
    state: {
        loadedHolidays: []
    },
    mutations: {
        setLoadedHolidays(state, payload) {
            state.loadedHolidays = payload
        }

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
