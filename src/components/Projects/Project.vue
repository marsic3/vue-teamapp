<template>
  <v-container style="margin:80px">
    <v-layout row wrap v-if="loading">
      <v-flex xs12 class="text-xs-center">
        <v-progress-circular indeterminate class="primary--text" :width="7" :size="70">
        </v-progress-circular>
      </v-flex>
    </v-layout>
    <v-layout row wrap v-else>
      <v-flex xs12 sm8 offset-sm3 style="margin-top:10px">
        <v-card>
          <v-img class="white--text" aspect-ratio max-height="250px" :src="project.imageUrl">
          </v-img>
           <v-tabs color="#90A4AE" dark slider-color="primary">
            <v-tab ripple>
              Item 1
            </v-tab>
            <v-tab ripple>
              Item 2
            </v-tab>
            <v-tab-item>
              <v-card flat>
                <v-card-text>{{ project.projectName }}</v-card-text>
              </v-card>
            </v-tab-item>
            <v-tab-item>
              <v-card flat>
                <v-card-text> {{ project.description }}</v-card-text>
              </v-card>
            </v-tab-item>
          </v-tabs>
          <v-card-title>
            
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
    data: () => ({
      currentItem: 'tab-Web',
      items: [
        'Statistics', 'Details'],
      text: 'Lorem ipsum'

    }),

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
    },
    methods: {
      // addItem (item) {
      //   const removed = this.items.splice(0, 1)
      //   this.items.push(
      //     ...this.more.splice(this.more.indexOf(item), 1)
      //   )
      //   this.more.push(...removed)
      //   this.$nextTick(() => { this.currentItem = 'tab-' + item })
      // }
    }
  }
</script>