<template>
  <v-container fluid grid-list-xl style="margin:80px; margin-left:330px; padding-right:50px;  width: 1050px">
    <v-layout row wrap>
      <!-- Widgets-->
      <v-flex d-flex lg3 sm6 xs12>
        <widget icon="domain" title="1,287,687" subTitle= '13% higher yesterday' supTitle="Today's Visits" color="#00b297"/>
      </v-flex>
      <v-flex d-flex lg3 sm6 xs12>
        <widget icon="money_off" title="$141,291" subTitle= '$117,212 before tax' supTitle="Today's Sales" color="#dc3545"/>
      </v-flex>
      <v-flex d-flex lg3 sm6 xs12>
        <widget icon="computer" title="33.45%" subTitle= '13% average duration' supTitle="% Unique Visits" color="#0866C6"/>
      </v-flex>
      <v-flex d-flex lg3 sm6 xs12>
        <widget icon="watch_later" title="13.00%" subTitle= '17.25% on average time' supTitle="Bounce Rate" color="#1D2939"/>
      </v-flex>
      <!-- Widgets Ends -->
      <!-- DataTable&TimeLine Starts -->

      <!-- <v-flex d-flex lg12 sm12 xs12>
        <data-table/>
      </v-flex> -->

      <!-- DataTable&TimeLine Ends -->
      
      <!-- <v-flex d-flex lg12 sm12 xs12>
        <user-tree-view />
      </v-flex> -->
      <v-flex d-flex lg12 sm12 xs12>
        <stepper/>
      </v-flex>
      
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      lorem: `Lorem ipsum dolor sit amet, mel at clita quando.`
    }
  }
}
</script>

<style>
</style>