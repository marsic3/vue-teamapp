<template>
  <v-layout justify-center >
    <v-flex xs12 sm12 md12>
        <v-snackbar
     v-model="snackbar"
      :timeout="timeout"
      :top="'top'"
      
    >
      {{ error }}
      <v-btn
        color="pink"
        flat
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar>
      <v-card flat hover>
        <v-card-title primary-title>
          <div>
            <h3 class="headline grey--text">How satisfied are you  with your work today?</h3>
          </div>
        </v-card-title>
        <v-form 
         ref="form"
         lazy-validation
>
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
                <v-btn-toggle v-model="toggle_one"  mandatory style="box-shadow: none;">
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
        timeout: 3000,
        snackbar: false,
        error: null,
        text: 'center',
        icon: 'justify',
        toggle_one: 0,
        name: '',
        workingHours: null,
        email: '',
        select: null,
        items: [],
        success: null
      }
    },
  
    methods: {
      reset () {
        this.toggle_one = 0
        this.$refs.form.reset()
      },
      submit() {
        if (this.select === null) {
          this.snackbar = true
          this.error = 'Please choose the project'
          return
        }
        if (this.workingHours === null) {
          this.snackbar = true
          this.error = 'Please add the working hours'
          return
        }
        if (this.toggle_one === 0) {
          this.snackbar = true
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
        this.error = 'Your working happiness has been added'
        this.snackbar = true
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
