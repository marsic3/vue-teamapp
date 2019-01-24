<template>
  <v-container fluid fill-height>
    <v-layout justify-center align-center>
      <v-flex xs12 sm6 lg12>
        <!-- <v-card> -->
        <v-container>
  
          <v-layout row justify-start class="mb-3">
            <v-tooltip top>
              <v-btn small flat color="grey" @click="sortBy('title')" slot="activator">
                <v-icon small left>folder</v-icon>
                <span class="caption text-lowercase">By project name</span>
              </v-btn>
              <span>Sort by project name</span>
            </v-tooltip>
            <v-tooltip top>
              <v-btn small flat color="grey" @click="sortBy('person')" slot="activator">
                <v-icon small left>person</v-icon>
                <span class="caption text-lowercase">By Person</span>
              </v-btn>
              <span>Sort by project author</span>
            </v-tooltip>
          </v-layout>
  
          <v-card flat v-for="project in items" :key="project.projectName">
            <v-layout row wrap :class="`pa-3 project ${project.status}`">
              <v-flex xs6 md3>
                <div class="caption grey--text">Project title</div>
                <div>{{ project.projectName }}</div>
              </v-flex>
              <v-flex xs6 md3>
                <div class="caption grey--text">People on project</div>
                <div>{{ project.projectName }}</div>
              </v-flex>
              <v-flex xs12 sm4 md3>
                <div class="caption grey--text">Feeling on project</div>
                <div>{{ new Date(project.date.toMillis()).toLocaleString() }}</div>
              </v-flex>
              <v-flex xs2 sm4 md3>
                <div class="right"><v-chip small :class="`${project.status} white--text my-2 caption`">{{ project.status }}</v-chip></div>

              </v-flex>
              
            </v-layout>
            <v-divider></v-divider>
          </v-card>
  
        </v-container>
        <!-- </v-card> -->
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
                      <v-text-field prepend-icon="mail" placeholder="Email" name="email" id="email" v-model="email" required></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                      <v-btn raised class="primary" @click="onPickFile">Upload image</v-btn>
                      <input type="file" ref="fileInput" style="display:none" accept="image/*" @change="onFilePicked">
                    </v-flex>
                    <v-layout row>
                      <v-flex xs12 sm6 offset-sm3>
                        <img :src="imageUrl" height="130px">
                      </v-flex>
                    </v-layout>
                    <v-flex xs12>
                      <v-textarea prepend-icon="notes" placeholder="Description" id="description" v-model="description"></v-textarea>
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
        dialog: false,
        projectName: '',
        email: '',
        description: '',
        imageUrl: '',
        image: null
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
      }
    },
    methods: {
      onDetail(id) {
        this.$router.push('/projects/' + id)
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
          id: num
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

<style>
  .project.complete {
    border-left: 4px solid #3cd1c2;
  }
  
  .project.ongoing {
    border-left: 4px solid #ffaa2c;
  }
  
  .project.overdue {
    border-left: 4px solid #f83e70;
  }
  
  .v-chip.complete {
    background: #3cd1c2;
  }
  
  .v-chip.ongoing {
    background: #ffaa2c;
  }
  
  .v-chip.overdue {
    background: #f83e70;
  }
</style>