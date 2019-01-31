<template>
  <v-container fluid fill-height>
  <v-layout justify-center align-center>
  <v-flex  xs6 sm12 lg12 >

  <v-container fluid grid-list-xl align-content-center>
    <v-layout row wrap >
      <!-- Widgets-->

      <v-flex d-flex lg3 sm6 xs12>
        <widget icon="people" :title='users' subTitle= 'Employees' supTitle="Today's Employees" color="#78909C"/>
      </v-flex>
      <v-flex d-flex lg3 sm6 xs12>
        <widget icon="work" :title="projects" subTitle= 'Projects' supTitle="Today's Projects" color="#78909C"/>
      </v-flex>
      <v-flex d-flex lg3 sm6 xs12>
        <widget icon="insert_emoticon" :title="loadedHappiness" subTitle= 'Average feeling' supTitle="Current average feeling" color="#D4E157"/>
      </v-flex>
      <v-flex d-flex lg3 sm6 xs12>
        <widget icon="watch_later" :title="loadedworkingHours" subTitle= 'Total working hours' supTitle="Bounce Rate" color="#D4E157"/>
      </v-flex>
      <v-flex d-flex lg6 sm6 xs12>
        <widget icon="watch_later" :title="loadedworkingHours" subTitle= 'Total working hours' supTitle="Bounce Rate" color="#78909C"/>
      </v-flex>
      <v-flex d-flex lg6 sm6 xs12>
        <widget icon="watch_later" :title="loadedworkingHours/projects" subTitle= 'Average hours per project' supTitle="Bounce Rate" color="#D4E157"/>
      </v-flex>
      <!-- DataTable&TimeLine Starts -->

      <!-- DataTable&TimeLine Ends -->
      
      <!-- <v-flex d-flex lg12 sm12 xs12>
        <user-tree-view />
      </v-flex> -->
      <v-flex d-flex lg12 sm12 xs12>
        <stepper/>
      </v-flex>
      <v-flex d-flex lg12 sm12 xs12>
         <data-table> </data-table>
      </v-flex> 
      
    </v-layout>
  </v-container>
  </v-flex>
  </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      lorem: `Lorem ipsum dolor sit amet, mel at clita quando.`,
      sum : 0,
      superhappy:[],
      happy:[],
      okay:[],
      bad:[],


    }
  },
  mounted () {
    this.$store.dispatch('loadedEmployee')

  },
  computed: {
      users(){
        return this.$store.getters.loadedEmployees.length
      },
      projects(){
        return this.$store.getters.loadedProjects.length
      },
      loadedworkingHours(){
      let lista = this.$store.getters.loadedTimeSheet
      for (let i = 0; i < lista.length; i++) {
          this.sum += Number(lista[i].workingHours)
          // console.log(lista[i].workingHours)

        }
        return this.sum
      },
      loadedHappiness(){
      let lista = this.$store.getters.loadedTimeSheet
      for (let i = 0; i < lista.length; i++) {

          if(lista[i].happiness === 'superhappy'){
          this.superhappy.push(lista[i].happiness)
          }
          if(lista[i].happiness === 'happy'){
          this.happy.push(lista[i].happiness)
          }
          if(lista[i].happiness === 'okay'){
          this.okay.push(lista[i].happiness)
          }
          if(lista[i].happiness === 'bad'){
          this.bad.push(lista[i].happiness)
          }

        }
          if(this.superhappy.length>=this.happy.length){
            return this.superhappy[0]
          }
          if(this.happy.length>=this.okay.length){
            return this.happy[0]
          }
          if(this.okay.length>=this.bad.length){
            return this.okay[0]
          }


      }
  }
}
</script>

<style>
</style>