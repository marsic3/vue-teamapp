<template>
  <!-- <v-card class="card"> -->
    <v-card-text class="pa-2">
      <pie-chart :data="getProjectData" legend="top" :donut="true"></pie-chart>
    </v-card-text>
  <!-- </v-card> -->
</template>

<script>
  export default {
    props: ["id"],
    data: function() {
      return {
        superhappy: 0,
        happy: 0,
        okay: 0,
        bad: 0,
        // data: {
        //   Superhappy: this.total,
        //   Happy: 2,
        //   Okay: 3,
        //   bad: 5
        // }
      }
    },
  
    computed: {
      users() {
        return this.$store.getters.loadedEmployees.length;
      },
      projects() {
        return this.$store.getters.loadedProjects.length;
      },
      getProjectData() {
        let superhappy = 0
        let happy= 0
        let okay=0
        let bad=0
        var lista = this.$store.getters.loadedTimeSheet
        // console.log(lista+' lista')
        for (let i = 0; i < lista.length; i++) {
          var expr = lista[i].happiness;
          if (lista[i].project === this.id) {
          // console.log(expr+' Milos hate Angel')
          switch (expr) {
            case 'superhappy': superhappy++;
              break;
            case 'happy': happy++;
              break;
            case 'okay': okay++;
              break;
            case 'bad': bad++;
              break;
              // expected output: "Mangoes and papayas are $2.79 a pound."
              // break;
            default:
              // console.log('Sorry, we are out of ' + expr + '.');
          }
            
          }
        }
      //  console.log(superhappy+' Milos love Angel')
        return {
              "Superhappy": superhappy,
              "Happy": happy,
              "Okay": okay,
              "Bad": bad
            }
      }
      // loadedHappiness(){
      // let lista = this.$store.getters.loadedTimeSheet
      // for (let i = 0; i < lista.length; i++) {
  
      // }
      // }
    }
  }
</script>

<style>
  .card {
    border-radius: 3px;
    background-clip: border-box;
    border: 1px solid rgba(0, 0, 0, 0.125);
    box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.21);
    background-color: transparent;
  }
</style>