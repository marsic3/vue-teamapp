<template>
<div id="id">
    <graph-line
            :width="1000"
            :height="400"
            :labels="labels"
            :values="loadedWorkingHours">
    </graph-line>
</div>
</template>
<script>
import Vue from "vue";
export default {
  props: ["id"],
  data: function() {
    return {
      values: [],
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Okt",
        "Nov",
        "Dec"
      ]
    };
  },
  computed: {
    project() {
      return this.$store.getters.loadedProjects;
    },
    loadedWorkingHours() {
      // console.log(this.id + " == ID");
      let lista = this.$store.getters.loadedTimeSheet;
      let ids = []
      let total = 0
      ids.push(this.id)
      console.log(lista);
      for (let i = 0; i < lista.length; i++) {
        // console.log(lista[i])
        if(lista[i].project === this.id){
            if(lista[i].createdAt.seconds<1548979200 && lista[i].createdAt.seconds>1546300800){
           total+= Number(lista[i].workingHours)
            this.values.push(Number(lista[i].workingHours)) 
            }
        } 
        }
                    console.log(total+'total!')

        return total
      }
    }
  }

</script>