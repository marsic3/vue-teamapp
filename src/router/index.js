import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Projects from '@/components/Projects/Projects'
import CreateProject from '@/components/Projects/CreateProject'
import Profile from '@/components/Users/Profile'
import SignIn from '@/components/Users/SignIn'
import SignUp from '@/components/Users/SignUp'
import ListOfUsers from '@/components/Users/ListOfUsers'
import Holidays from '@/components/Holidays/Holidays'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/projects',
      name: 'Projects',
      component: Projects
    },
    {
      path: '/createproject',
      name: 'CreateProject',
      component: CreateProject
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile
    },
    {
      path: '/listofusers',
      name: 'ListOfUsers',
      component: ListOfUsers
    },
    {
      path: '/signin',
      name: 'SignIn',
      component: SignIn
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/holidays',
      name: 'Holidays',
      component: Holidays
    },
  ],
  mode: 'history'
})