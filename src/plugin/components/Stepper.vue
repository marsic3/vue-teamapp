<template>
  <v-stepper v-model="step">
    <v-stepper-header>
      <v-stepper-step :complete="step > 1" step="1">Name of step 1</v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step :complete="step > 2" step="2">Name of step 2</v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step step="3">Name of step 3</v-stepper-step>
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content step="1">
        <v-form ref="form" v-model="valid" lazy-validation>
          <h2> Project progress </h2>
          <p>Nostrud exercitation commodo consequat.</p>
          <v-text-field
            v-model="name"
            :rules="nameRules"
            :counter="30"
            label="Full Name"
            required
          ></v-text-field>
           <!-- <v-text-field
            v-model="name"
            :rules="nameRules"
            :counter="10"
            label="Last Name"
            required
          ></v-text-field> -->
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            required />
          <!-- <v-checkbox
            v-model="checkbox"
            :rules="[v => !!v || 'You must agree to continue!']"
            label="Do you agree?"
            required/> -->

          <v-btn :disabled="!valid"
            @click="submit">
            cointunue
          </v-btn>
          <v-btn @click.native="clear">clear</v-btn>
        </v-form>
      </v-stepper-content>

      <v-stepper-content step="2">
        <v-form>
          <h2> Project progress </h2>
          <p>Nostrud exercitation commodo consequat.</p>
          <v-container>
            <v-layout flex wrap row>
              <v-flex d-flex lg6>
                 <v-select
                  v-model="select"
                  :items="items"
                  :rules="[v => !!v || 'Item is required']"
                  label="Choose a Project"
                  required />
                  </v-flex>
              <v-flex d-flex lg6>
                <v-text-field
                  v-model="workingHours"
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
                <v-btn fab outline color="white" value="ok">
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
              <v-flex d-flex lg2></v-flex>
              <v-flex d-flex lg4>
                <v-btn @click="step=3">
                  cointunue
                </v-btn>
              </v-flex>
              <v-flex d-flex lg4>
                <v-btn @click="step=1">back</v-btn>
              </v-flex>
            </v-layout>
          </v-container>
        </v-form>
      </v-stepper-content>

      <v-stepper-content step="3">
        <h2> Aggreement </h2>
        <p style="padding-top: 25px;">
            Nostrud exercitation commodo consequat.Nostrud exercitation commodo consequat.Nostrud exercitation commodo consequat.Nostrud exercitation commodo consequat.
            Nostrud exercitation commodo consequat.Nostrud exercitation commodo consequat.Nostrud exercitation commodo consequat.Nostrud exercitation commodo consequat.
            Nostrud exercitation commodo consequat.Nostrud exercitation commodo consequat.Nostrud exercitation commodo consequat.Nostrud exercitation commodo consequat.
        </p>
        <v-checkbox label="I read agreement and i have not any objection."></v-checkbox>

        <v-btn @click="step=1">submit</v-btn>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script>
  export default {
    data () {
      return {
        text: 'center',
        icon: 'justify',
        toggle_none: null,
        toggle_one: 0,
        toggle_exclusive: 2,
        toggle_multiple: [0, 1, 2],
        step: 0,
        valid: true,
        name: '',
        workingHours: 0,
        nameRules: [
          v => !!v || 'Name is required',
          v => (v && v.length <= 30) || 'Name must be less than 30 characters'
        ],
        email: '',
        emailRules: [
          v => !!v || 'E-mail is required',
          v => /.+@.+/.test(v) || 'E-mail must be valid'
        ],
        select: null,
        items: [
          'Insulclock',
          'Insulclock 2',
          'Insulclock 3',
          'Insulclock 4'
        ],
        checkbox: false,
        date: new Date().toISOString().substr(0, 10)
      }
    },

    methods: {
      submit () {
        if (this.$refs.form.validate()) {
        }
        this.step = 2;
      },
      clear () {
        this.$refs.form.reset()
      }
    }
  }
</script>

<style>
</style>
