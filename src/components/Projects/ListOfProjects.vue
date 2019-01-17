<template>
<v-container fluid fill-height>
  <v-layout justify-center align-center>
    <v-flex  xs12 sm6 lg12>
      <v-card>
        <v-container
          fluid
          grid-list-xl
        >
          <v-layout row wrap>
            <v-flex 
              v-for="item in items"
              v-bind="{ [`xs4`]: true }"
              :key="item.projectName"
              @click="onDetail(item.id)"
            >
              <v-card>
                <v-img 
                  :src="item.imageUrl"
                  :aspect-ratio="21/4">
                </v-img>
                  <v-card-title>
               <div>
                <span class="grey--text">{{item.projectName}}</span><br>
                <!-- <span>{{item.description}}</span><br> -->
               </div>
              </v-card-title>
                  <v-card-actions>
              <v-spacer></v-spacer>
            <v-btn flat color="primary" :to="'/projects/'+item.id">Details</v-btn>
        </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
      <v-btn
      fab
      bottom
      right
      color="pink"
      dark
      fixed
      @click="dialog = !dialog"
      
    >
    <v-icon>add</v-icon>
    </v-btn>
<v-dialog v-model="dialog" width="800px">
    <v-card>
        <v-card-title
          class="grey lighten-4 py-4 title"
        >
          Create project
        </v-card-title>
        <form @submit.prevent="onCreateProject">
        <v-container grid-list-sm class="pa-4">
          <v-layout row wrap>
                <v-flex xs12>
                    
                        <v-flex xs12 align-center justify-space-between>
                            <v-layout align-center>
                                <v-text-field
                                prepend-icon="present_to_all"
                                placeholder="Project Name"
                                name="projectName"
                                id="projectName"
                                v-model="projectName"
                                required
                                ></v-text-field>
                            </v-layout>
                        </v-flex>
                        <v-flex xs12>
                            <v-text-field
                            prepend-icon="mail"
                            placeholder="Email"
                            name="email"
                            id="email"
                            v-model="email"
                            required
                            ></v-text-field>
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
                            <v-textarea
                            prepend-icon="notes"
                            placeholder="Description"
                            id="description"
                            v-model="description"
                            ></v-textarea>
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
        projectName:'',
        email:'',
        description:'',
        imageUrl: '',
        image: null
        }
    },
  computed: {
      items(){
        return this.$store.getters.loadedProjects
      },
      formIsValid(){
        return this.projectName !== '' &&
               this.email !== '' && 
               this.imageUrl !== ''
      }
  },
  methods: {
      onDetail(id){
          this.$router.push('/projects/'+id)
      },
      onCreateProject(){
          var element = 0
          var num = this.$store.getters.loadedProjects.length
          for (let i = 0; i < num; i++) {
            element += num[i];
            element++
          }
          console.log(typeof element)
          this.dialog = false
          console.log('project created')
          if(!this.formIsValid){
              return
          }
          if(!this.image){
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
      onPickFile(){
        this.$refs.fileInput.click()
      },
      onFilePicked(event){
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