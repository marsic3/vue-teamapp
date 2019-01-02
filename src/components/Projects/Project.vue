<template>
  <v-container style="margin:80px">
    <v-layout row wrap v-if="loading">
      <v-flex xs12 class="text-xs-center">
        <v-progress-circular
          indeterminate
          class="primary--text"
          :width="7"
          :size="70">
        </v-progress-circular>
      </v-flex>
    </v-layout>
  <v-layout row wrap v-else>
      <v-flex xs12 sm8 offset-sm3 style="margin-top:10px">
        <v-card>
          <v-img class="white--text" aspect-ratio max-height="250px" :src="project.imageUrl">
          </v-img>
          <v-card-title>
            <div>
              <span class="grey--text">{{project.projectName}}</span><br>
              <span>{{project.description}}</span><br>
            </div>
          </v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <template v-if="userIsCreator">
            <app-edit-project-dialog :project="project">  </app-edit-project-dialog>
      </template>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</v-container>
</template>


<script>
  export default {
    props: ['id'],
    computed: {
      project() {
        return this.$store.getters.loadedProject(this.id)
      },
      userIsAuth() {
        return this.$store.getters.user !== null && this.$store.getters.user !== 'undefiend'
      },
      userIsCreator() {
        if (!this.userIsAuth) {
          return false
        }
        return this.$store.getters.user.id === this.project.creatorId
      },
      loading() {
        this.$store.getters.loading
      }
    }
  }
</script>