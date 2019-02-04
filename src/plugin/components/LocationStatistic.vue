<template>
  <div id="id">
    <graph-line width="100%" :height="400" :labels="labels" :values="loadedWorkingHours">
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
        let lista = this.$store.getters.loadedTimeSheet;
        let ids = []
        let sumJan = 0
        let sumFeb = 0
        let sumMar = 0
        let sumApr = 0
        let sumMay = 0
        let sumJun = 0
        let sumJul = 0
        let sumAug = 0
        let sumSep = 0
        let sumOkt = 0
        let sumNov = 0
        let sumDec = 0
        ids.push(this.id)
        for (let i = 0; i < lista.length; i++) {  
          if (lista[i].project === this.id) {
            if (lista[i].createdAt.seconds < 1548979200 && lista[i].createdAt.seconds > 1546300800) {
              sumJan += Number(lista[i].workingHours)
            }
            if (lista[i].createdAt.seconds < 1551398400 && lista[i].createdAt.seconds > 1548979200) {
              sumFeb += Number(lista[i].workingHours)
            }
            if (lista[i].createdAt.seconds < 1553990400 && lista[i].createdAt.seconds > 1551398400) {
              sumMar += Number(lista[i].workingHours)
            }
            if (lista[i].createdAt.seconds < 1556582400 && lista[i].createdAt.seconds > 1554076800) {
              sumApr += Number(lista[i].workingHours)
            }
            if (lista[i].createdAt.seconds < 1559260800 && lista[i].createdAt.seconds > 1556668800) {
              sumMay += Number(lista[i].workingHours)
            }
            if (lista[i].createdAt.seconds < 1561852800 && lista[i].createdAt.seconds > 1559347200) {
              sumJun += Number(lista[i].workingHours)
            }
            if (lista[i].createdAt.seconds < 1564531200 && lista[i].createdAt.seconds > 1561939200) {
              sumJul += Number(lista[i].workingHours)
            }
            if (lista[i].createdAt.seconds < 1567209600 && lista[i].createdAt.seconds > 1564617600) {
              sumAug += Number(lista[i].workingHours)
            }
            if (lista[i].createdAt.seconds < 1569801600 && lista[i].createdAt.seconds > 1567296000) {
              sumSep += Number(lista[i].workingHours)
            }
            if (lista[i].createdAt.seconds < 1572480000 && lista[i].createdAt.seconds > 1569888000) {
              sumOkt += Number(lista[i].workingHours)
            }
            if (lista[i].createdAt.seconds < 1575072000 && lista[i].createdAt.seconds > 1572566400) {
              sumNov += Number(lista[i].workingHours)
            }
            if (lista[i].createdAt.seconds < 1577750400 && lista[i].createdAt.seconds > 1575158400) {
              sumDec += Number(lista[i].workingHours)
            }
          }
        }
        return [sumJan,sumFeb,sumMar,sumApr,sumMay,sumJun,sumJul,sumAug,sumSep,sumOkt,sumNov,sumDec]
      }
    }
  }
</script>