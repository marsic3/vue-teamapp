import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import ListOfProjects from '@/components/Projects/ListOfProjects'
import Project from '@/components/Projects/Project'
import Profile from '@/components/Users/Profile'
import SignIn from '@/components/Users/SignIn'
import SignUp from '@/components/Users/SignUp'
import ListOfUsers from '@/components/Users/ListOfUsers'
import Holidays from '@/components/Holidays/Holidays'
import auth from './auth'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      beforeEnter: auth

    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      beforeEnter: auth

    },
    {
      path: '/projects',
      name: 'ListOfProjects',
      component: ListOfProjects,
      beforeEnter: auth

    },
  
    {
      path: '/projects/:id',
      name: 'Project',
      props: true,
      component: Project,
      beforeEnter: auth

    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      beforeEnter: auth
    },
    {
      path: '/listofusers',
      name: 'ListOfUsers',
      component: ListOfUsers,
      beforeEnter: auth

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
      component: Holidays,
      beforeEnter: auth

    },
  ],
    mode: 'history'
})