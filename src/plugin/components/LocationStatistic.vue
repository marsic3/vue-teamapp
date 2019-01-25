<template>
  <v-card class="card">
    <v-card-text class="pa-2">
        <line-chart :data="linearMultipleChartdata" />
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
       sum: 0,
       linearMultipleChartdata: [
        {
            name: 'Hours/Month',
          data: {
            '2018-01-01 00:00:00 -0800': 33,
            '2018-02-01 00:00:00 -0800': 9,
            '2018-03-01 00:00:00 -0800': 14,
            '2018-04-01 00:00:00 -0800': 7,
            '2018-05-01 00:00:00 -0800': 4
          }
        },
        // {
        //     name: 'Month',
        //   data: {
        //     '2018-01-01 00:00:00 -0800': 4,
        //     '2018-02-01 00:00:00 -0800': 2,
        //     '2018-03-01 00:00:00 -0800': 5,
        //     '2018-04-01 00:00:00 -0800': 9,
        //     '2018-05-01 00:00:00 -0800': 14
        //   }
        // },

        




        // {name: 'Call Parents',
        //   data: {
        //     '2017-01-01 00:00:00 -0800': 9,
        //     '2017-01-02 00:00:00 -0800': 13,
        //     '2017-01-03 00:00:00 -0800': 8,
        //     '2017-01-04 00:00:00 -0800': 4,
        //     '2017-01-05 00:00:00 -0800': 9
        //   }
        // },
        // {name: 'Eat Breakfast',
        //   data: {
        //     '2017-01-01 00:00:00 -0800': 5,
        //     '2017-01-02 00:00:00 -0800': 3,
        //     '2017-01-03 00:00:00 -0800': 5,
        //     '2017-01-04 00:00:00 -0800': 8,
        //     '2017-01-05 00:00:00 -0800': 5
        //   }
        // }
      ]
    }
  },
  computed:{
     loadedworkingHours(){
      let lista = this.$store.getters.loadedTimeSheet
      for (let i = 0; i < lista.length; i++) {
          this.sum += Number(lista[i].workingHours)
        }
        return this.sum
      },
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