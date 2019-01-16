import Vue from 'vue'
import Vuex from 'vuex'

import project from './project'
import users from './users'
import shared from './shared'
import holidays from './holidays'

Vue.use(Vuex)
 

export const store = new Vuex.Store({
    modules:{
        project: project,
        users: users,
        shared: shared,
        holidays: holidays,
    }
})
