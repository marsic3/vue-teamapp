<template>
  <v-layout justify-center >
    <v-flex xs12 sm12 md12>
      <v-layout row v-if="error">
        <v-flex xs12 sm12>
          <app-alert @dismissed="onDismissed" :text="error"></app-alert>
        </v-flex>
      </v-layout>
      <v-layout row v-if="success">
        <v-flex xs12 sm12>
          <app-alert-success @dismissed="onDismissed" :text="success"></app-alert-success>
        </v-flex>
      </v-layout>
      <v-card flat hover>
        <v-card-title primary-title>
          <div>
            <h3 class="headline grey--text">How satisfied are you  with your work today?</h3>
          </div>
        </v-card-title>
        <v-form>
          <v-container>
            <v-layout flex wrap row>
              <v-flex d-flex lg6>
                <v-select v-model="select" :items="loadProjects" label="Choose a Project" />
              </v-flex>
              <v-flex d-flex lg6>
                <v-text-field v-model="workingHours" v-on:keypress="isNumber($event)" label="How many hours did you work today?" />
              </v-flex> 
        <v-container grid-list-md text-xs-center>
            <v-layout justify-center>
              <!-- <v-flex d-flex lg12 xs12 sm12 > -->
                <v-btn-toggle v-model="toggle_one" mandatory style="box-shadow: none;">
                  <v-btn fab outline color="white" value="superhappy">
                    <v-avatar>
                      <img src="https://i.imgur.com/Qco80q1.png">
                    </v-avatar>
                  </v-btn>
                  <v-btn fab outline color="white" value="happy">
                    <v-avatar>
                      <img src="https://i.imgur.com/TRtFNJe.png">
                    </v-avatar>
                  </v-btn>
                  <v-btn fab outline color="white" value="okay">
                    <v-avatar>
                      <img src="https://i.imgur.com/T8lY3hl.png">
                    </v-avatar>
                  </v-btn>
                  <v-btn fab outline color="white" value="bad">
                    <v-avatar>
                      <img src="https://i.imgur.com/CA13gQq.png">
                    </v-avatar>
                  </v-btn>
                </v-btn-toggle>
              <!-- </v-flex> -->
            </v-layout>
        </v-container>
            </v-layout>
            <div class="text-xs-center">
              <v-btn round color="primary" dark @click="submit">
                submit
              </v-btn>
            </div>
          </v-container>
        </v-form>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    data() {
      return {
        text: 'center',
        icon: 'justify',
        toggle_one: 0,
        name: '',
        workingHours: null,
        email: '',
        select: null,
        items: [],
        checkbox: false,
        // date: new Date().toISOString().substr(0, 10),
        error: null,
        success: null
      }
    },
  
    methods: {
      submit() {
        if (this.select === null) {
          this.error = 'Please choose the project'
          return
        }
        if (this.workingHours === null) {
          this.error = 'Please add the working hours'
          return
        }
        if (this.toggle_one === 0) {
          this.error = 'Please select the happiness'
          return
        }
        const lista = this.$store.getters.loadedProjects
        for (let i = 0; i < lista.length; i++) {
          if (this.select === lista[i].projectName) {
            this.select = lista[i].id
          }
        }
        const payload = {
          project: this.select,
          happiness: this.toggle_one,
          workingHours: this.workingHours,
        }
        this.$store.dispatch('createTimeSheet', payload)
        this.error = null
        this.success = 'Your feedback has been successefuly added'
        this.toggle_one = 0
        this.select = null
        this.workingHours = null
  
      },
      isNumber: function(evt) {
        evt = (evt) ? evt : window.event;
        var charCode = (evt.which) ? evt.which : evt.keyCode;
        if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
          evt.preventDefault();;
        } else {
          return true;
        }
      },
      onDismissed() {
        this.$store.dispatch('clearError')
      },
    },
    computed: {
      loadProjects() {
        const lista = this.$store.getters.loadedProjects
        for (let i = 0; i < lista.length; i++) {
          this.items.push(lista[i].projectName)
        }
        return this.items
      },
    }
  }
</script>

<style>
  
</style>
