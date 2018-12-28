<template>
<div
style="margin:80px">
  <v-layout>
    <v-flex 
    xs12 sm8 offset-sm3 style="margin-top:10px">
      <v-card>
        <v-img
          class="white--text"
          height="140px"
          :src="project.imageUrl"
        >
        </v-img>
        <v-card-title>
          <div>
            <span class="grey--text">{{project.projectName}}</span><br>
            <span>{{project.description}}</span><br>
            <span>{{project.description}}</span><br>
          </div>
        </v-card-title>
        <v-card-actions>
        <v-spacer></v-spacer>
            <v-btn flat color="primary" to="">Details</v-btn>
          <!-- <v-btn flat color="primary">Explore</v-btn> -->
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</div>
</template>


<script>
  export default {
    props:['id'],
    computed: {
      project() {
        return this.$store.getters.loadedProject(this.id)
      }
    }
  }
</script>