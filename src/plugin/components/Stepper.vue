<template>
  <v-layout  justify-center align-center>
    <v-flex xs12 sm12 >
      <v-layout row v-if="error">
                    <v-flex xs12 sm12 >
                        <app-alert @dismissed="onDismissed" :text="error"></app-alert>
                    </v-flex>
      </v-layout>
      <v-layout row v-if="success">
                    <v-flex xs12 sm12 >
                        <app-alert-success @dismissed="onDismissed" :text="success"></app-alert-success>
                    </v-flex>
      </v-layout>
      <v-card>

        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">Project progress</h3>
            <div>Nostrud exercitation commodo consequat.<br>Southern Highlands of New South Wales, ...</div>
          </div>
        </v-card-title>

        <v-card-actions>
          <v-form>
          <v-container>
            <v-layout flex wrap row>
              <v-flex d-flex lg6>
                 <v-select
                  v-model="select"
                  :items="loadProjects"
                  label="Choose a Project"
                  />
                  </v-flex>
              <v-flex d-flex lg6>
                <v-text-field
                  v-model="workingHours"
                  v-on:keypress="isNumber($event)"
                  label="How many hours did you work today?" />
              </v-flex>
              <v-divider></v-divider>
              <h3 style="padding:20px; padding-top:50px; margin-left: 250px;"> How are you satisfied with your work today?</h3>
               <v-flex d-flex lg12 xs12 sm6 class="py-2">

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
              </v-flex>
              <!-- <v-spacer></v-spacer> -->
              <!-- <v-flex d-flex lg6>
                <v-text-field
                  v-model="email"
                  label="CVC" />
              </v-flex>
              <v-flex d-flex lg6>
                <v-text-field
                  v-model="email"
                  label="Phone Number" />
              </v-flex> -->
              <v-flex d-flex lg4></v-flex>
              <v-flex d-flex lg4>
                <v-btn flat color="primary" @click="submit">
                  submit
                </v-btn>
              </v-flex>
            </v-layout>
          </v-container>
        </v-form>

        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    data () {
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
        date: new Date().toISOString().substr(0, 10),
        error: null,
        success: null
      }
    },

    methods: {
      submit () {
        if(this.select === null){
        this.error = 'Please choose the project'
        return
        }
        if(this.workingHours === null){
        this.error = 'Please add the working hours'
        return
        }
        if(this.toggle_one === 0){
        this.error = 'Please select the happiness'
        return
        }

        const payload = {
          project: this.select,
          happiness: this.toggle_one,
          workingHours: this.workingHours
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
    onDismissed(){
          this.$store.dispatch('clearError')
        },
    },
    computed: {
      loadProjects () {
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
