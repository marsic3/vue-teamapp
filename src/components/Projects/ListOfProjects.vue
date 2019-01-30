<template>
  <v-container fluid fill-height>
    <v-layout justify-center align-center>
      <v-flex xs12 sm6 lg12>
        <v-card>
          <v-container fluid grid-list-xl>
            <v-layout row wrap>
              <v-flex v-for="item in items" v-bind="{ [`xs12`]: true }" :key="item.projectName">
                <v-card>
                  <!-- <v-img 
                      max-width="400px"
                      :src="item.imageUrl"
                      :aspect-ratio="21/4">
                    </v-img> -->
                  <v-card-title>
                    <div>
                      <span class="pink--text" style="font-size:25px">{{item.projectName}}</span><br>
                      <!-- <span>{{item.description}}</span><br> -->
                      <!-- <location-statistic> </location-statistic> -->
                    </div>
                  </v-card-title>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn flat color="primary" :to="'/projects/'+item.id" @click="onDetail(item.id)">Details</v-btn>
                  </v-card-actions>
                  <v-tabs color="primary" dark slider-color="primary">
                    <v-tab ripple>
                      Basic Info
                    </v-tab>
                    <v-tab ripple v-bind:id="item.id" @click="onClick(item.id)">
                      Statistics
                    </v-tab>
                    <v-tab ripple>
                      Project Happiness
                    </v-tab>
                    <v-tab ripple>
                      People on Project
                    </v-tab>
                    <v-tab ripple>
                      Description
                    </v-tab>
                    <v-tab-item>
                      <v-card flat>
  
                        <v-list two-line>
                          <v-list-tile>
                            <v-list-tile-action>
                              <v-icon color="pink">extension</v-icon>
                            </v-list-tile-action>
  
                            <v-list-tile-content>
                              <v-list-tile-title>{{item.projectName}}</v-list-tile-title>
                              <v-list-tile-sub-title>Project Name</v-list-tile-sub-title>
                            </v-list-tile-content>
  
                          </v-list-tile>
  
                          <v-divider inset></v-divider>
  
                          <v-list-tile>
                            <v-list-tile-action>
                              <v-icon color="pink">account_box</v-icon>
                            </v-list-tile-action>
  
                            <v-list-tile-content>
                              <v-list-tile-title>{{item.email}}</v-list-tile-title>
                              <v-list-tile-sub-title>Assigned on</v-list-tile-sub-title>
                            </v-list-tile-content>
                          </v-list-tile>
                          <v-divider inset></v-divider>
                          <v-list-tile>
                            <v-list-tile-action>
                              <v-icon color="pink">date_range</v-icon>
                            </v-list-tile-action>
  
                            <v-list-tile-content>
                              <v-list-tile-title>{{new Date(item.date.toMillis()).toLocaleString()}}</v-list-tile-title>
                              <v-list-tile-sub-title>Created date</v-list-tile-sub-title>
                            </v-list-tile-content>
                          </v-list-tile>
                          <v-divider inset></v-divider>
                          <v-list-tile>
                            <v-list-tile-action>
                              <v-icon color="pink">trending_up</v-icon>
                            </v-list-tile-action>
  
                            <v-list-tile-content>
                              <v-list-tile-title>{{item.status}}</v-list-tile-title>
                              <v-list-tile-sub-title>Status</v-list-tile-sub-title>
                            </v-list-tile-content>
                          </v-list-tile>
  
                        </v-list>
                      </v-card>
                    </v-tab-item>
                    <v-tab-item >
                      <v-card flat>
                        <v-card-text>{{ item.projectName }}</v-card-text>
                        <location-statistic> </location-statistic>
                      </v-card>
                    </v-tab-item>
                    <v-tab-item>
                      <v-card flat>
                         <statistic> </statistic>
                      </v-card>
                    </v-tab-item>
                     <v-tab-item>
                      <v-card flat>
                        <data-table> </data-table>
                      </v-card>
                    </v-tab-item>
                    <v-tab-item>
                      <v-card flat>
                        <v-card-text> {{ item.description }}</v-card-text>
                      </v-card>
                    </v-tab-item>
                  </v-tabs>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
        <v-btn fab bottom right color="pink" dark fixed @click="dialog = !dialog">
          <v-icon>add</v-icon>
        </v-btn>
        <v-dialog v-model="dialog" width="800px">
          <v-card>
            <v-card-title class="grey lighten-4 py-4 title">
              Create project
            </v-card-title>
            <form @submit.prevent="onCreateProject">
              <v-container grid-list-sm class="pa-4">
                <v-layout row wrap>
                  <v-flex xs12>
  
                    <v-flex xs12 align-center justify-space-between>
                      <v-layout align-center>
                        <v-text-field prepend-icon="present_to_all" placeholder="Project Name" name="projectName" id="projectName" v-model="projectName" required></v-text-field>
                      </v-layout>
                    </v-flex>
                    <v-flex xs12>
                      <v-text-field prepend-icon="mail" placeholder="Assign on" name="email" id="email" v-model="email" required></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                      <v-textarea prepend-icon="trending_up" placeholder="Status" id="status" v-model="status"></v-textarea>
                    </v-flex>
                    <v-flex xs12>
                      <v-textarea prepend-icon="notes" placeholder="Description" id="description" v-model="description"></v-textarea>
                    </v-flex>

                  <!-- <v-flex xs12 class="text-xs-center text-sm-center text-md-center text-lg-center">
                      <v-btn raised class="primary" @click="onPickFile">Upload image</v-btn>
                      <input type="file" ref="fileInput" style="display:none" accept="image/*" @change="onFilePicked">
                    </v-flex>
                    <v-layout row>
                      <v-flex xs12 sm6 offset-sm3>
                        <img :src="imageUrl" height="130px">
                      </v-flex>
                    </v-layout> -->

                    <v-flex xs12 class="text-xs-center text-sm-center text-md-center text-lg-center">
                      <img :src="imageUrl" height="150" v-if="imageUrl" />
                      <v-text-field label="Select Image" @click='onPickFile' v-model='imageName' prepend-icon='attach_file'></v-text-field>
                      <input type="file" style="display: none" ref="image" accept="image/*" @change="onFilePicked">
                    </v-flex>
                  </v-flex>
                </v-layout>
              </v-container>
            </form>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn flat color="primary" @click="dialog = false">Cancel</v-btn>
              <v-btn flat :disabled="!formIsValid" type="submit" @click="onCreateProject">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import * as firebase from 'firebase'
  export default {
  
    data() {
      return {
        show: false,
        dialog: false,
        projectName: '',
        email: '',
        description: '',
        status: '',
        imageUrl: '',
        image: null,
      }
    },
    computed: {
      items() {
        return this.$store.getters.loadedProjects
      },
      formIsValid() {
        return this.projectName !== '' &&
          this.email !== '' &&
          this.imageUrl !== ''
      },
  
    },
    methods: {
      onDetail(id) {
        this.$router.push('/projects/' + id)
      },
      onClick(id) {
        this.$store.dispatch('loadedWorkingHours', id)
        // console.log(id)
        // alert('click')
      },
  
      onCreateProject() {
        var number = Math.random() // 0.9394456857981651
        number.toString(36); // '0.xtis06h6'
        var num = number.toString(36).substr(2, 9); // 'xtis06h6'
        this.dialog = false
        console.log('project created')
        if (!this.formIsValid) {
          return
        }
        if (!this.image) {
          return
        }
        const projectData = {
          projectName: this.projectName,
          email: this.email,
          image: this.image,
          description: this.description,
          date: new Date(),
          id: num,
          status: this.status
        }
        this.$store.dispatch('createProject', projectData)
        this.$router.push('/projects')
      },
      onPickFile() {
        this.$refs.fileInput.click()
      },
      onFilePicked(event) {
        const files = event.target.files
        let filename = files[0].name
        if (filename.lastIndexOf('.') <= 0) {
          return alert('Please add a valid file!')
        }
        const fileReader = new FileReader()
        fileReader.addEventListener('load', () => {
          this.imageUrl = fileReader.result
        })
        fileReader.readAsDataURL(files[0])
        this.image = files[0]
      }
    }
  }
</script>