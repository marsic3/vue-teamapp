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
    //   data: {'USA': 90, 'China': 70, 'Russia': 40, 'Germany': 30, 'United Kingdom': 35, 'Turkey': 22},
       linearMultipleChartdata: [
        {
            name: 'Project - Hours',
          data: {
            '2017-01-01 00:00:00 -0800': 3,
            '2017-01-02 00:00:00 -0800': 9,
            '2017-01-03 00:00:00 -0800': 14,
            '2017-01-04 00:00:00 -0800': 7,
            '2017-01-05 00:00:00 -0800': 4
          }
        },
        {
            name: 'Happiness',
          data: {
            '2017-01-01 00:00:00 -0800': 3,
            '2017-01-02 00:00:00 -0800': 2,
            '2017-01-03 00:00:00 -0800': 5,
            '2017-01-04 00:00:00 -0800': 9,
            '2017-01-05 00:00:00 -0800': 14
          }
        },

        




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