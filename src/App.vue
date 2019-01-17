<template>
  <v-app id="inspire">
    <v-navigation-drawer
      :clipped="$vuetify.breakpoint.lgAndUp"
      v-model="drawer"
      fixed
      app
    >

      <v-list dense>
        <template v-for="item in items">
          <v-layout
            v-if="item.heading"
            :key="item.heading"
            row
            align-center
          >
            <v-flex xs6>
              <v-subheader v-if="item.heading">
                {{ item.heading }}
              </v-subheader>
            </v-flex>
            <v-flex xs6 class="text-xs-center">
              <a href="#!" class="body-2 black--text">EDIT</a>
            </v-flex>
          </v-layout>
          <v-list-group
            v-else-if="item.children"
            v-model="item.model"
            :key="item.text"
            :prepend-icon="item.model ? item.icon : item['icon-alt']"
            append-icon=""
            
          >
            <v-list-tile slot="activator" >
              <v-list-tile-content
              >
                <v-list-tile-title>
                  {{ item.text }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile
              v-for="(child, i) in item.children"
              :key="i"
              
              >
              <v-list-tile-action 
              v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ child.text }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>
          <v-list-tile 
            v-else 
            :key="item.text" 
            :to="item.link">
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                {{ item.text }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      color="blue darken-3"
      dark
      app
      fixed
    >
      <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
        <router-link to='/' tag="span" style="cursor:pointer"> 
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <span class="hidden-sm-and-down">Insulclock Team</span>
        </router-link>
      </v-toolbar-title >
      <v-text-field
        flat
        solo-inverted
        hide-details
        prepend-inner-icon="search"
        label="Search"
        class="hidden-sm-and-down"
      ></v-text-field>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
      <v-btn 
        flat
        v-for="item in menuItems"
        :key="item.icon"
        :to="item.link"
        >
        <v-icon>{{item.icon}} </v-icon>
        <v-list-tile-title style="padding-left:5px">
                {{ item.text }}
              </v-list-tile-title>
      </v-btn>
      <v-btn   
        v-if="userIsAuth"
        flat
        @click="onLogout"
        >
        <v-icon>exit_to_app</v-icon>
        <v-list-tile-title style="padding-left:5px">
               Logout
              </v-list-tile-title>
      </v-btn>
       <v-btn icon large>
        <v-avatar size="32px" tile>
          <img
            src='https://avataaars.io/?accessoriesType=Blank&avatarStyle=Circle&clotheColor=PastelGreen&clotheType=ShirtScoopNeck&eyeType=Wink&eyebrowType=UnibrowNatural&facialHairColor=Black&facialHairType=MoustacheMagnum&hairColor=Platinum&mouthType=Concerned&skinColor=Tanned&topType=Turban'
            alt="Vuetify"
          >
        </v-avatar>
      </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <!-- <v-container fluid fill-height>
        <v-layout justify-center align-center> -->
    <main>
      <router-view>
      </router-view>
    </main>
    <!-- </v-layout> -->
      <!-- </v-container> -->
    </v-content>
  </v-app>
</template>

<script>

export default {
  data: () => ({
      dialog: false,
      drawer: true,
    }),
  computed: {
  items() {
    let items = [
      ]
    if(this.userIsAuth){
      items = [
        { icon: 'home', text: 'Home', link:'/home'},
        { icon: 'contacts', text: 'Employees', link:'/listofusers' },
        { icon: 'folder_open', text: 'Projects', link:'/projects' },
        { icon: 'event', text: 'Holidays', link:'/holidays' },
      ]
    }
    return items
  },
  menuItems(){
    let menuItems = [
        { icon: 'lock_open', text: ' Sign in', link:'/signin' }, 
        { icon: 'face', text: 'Sign up', link:'/signup' }, 

        ]
    if(this.userIsAuth){
        menuItems = [
        { icon: 'account_circle',text: ' Profile', link:'/profile'},
        // { icon: 'exit_to_app',text: 'Log out', link:'/' }, 
        ]
      }
      return menuItems
    },
    userIsAuth(){
      return this.$store.getters.user !== null && this.$store.getters.user !== 'undefined'
    }
},
  methods: {
    onLogout(){
      this.$store.dispatch('logout')
    }
  },
    props: {
      source: String
    }
  }
</script>
<style lang="stylus">
  @import './stylus/main'
</style>