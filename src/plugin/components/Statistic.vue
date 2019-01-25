<template>
  <v-card class="card">
    <v-card-text class="pa-2">
      <pie-chart :data="data" legend="right" :donut="true"></pie-chart>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      data: {'Superhappy': 90, 'Happy': 70, 'Okay': 40, 'Sad': 30}
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