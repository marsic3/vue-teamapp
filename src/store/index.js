import Vue from 'vue'
import Vuex from 'vuex'

import project from './project'
import user from './user'
import shared from './shared'

Vue.use(Vuex)
 

export const store = new Vuex.Store({
    modules:{
        project: project,
        user: user,
        shared: shared
    }
})
