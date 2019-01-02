<template>
  <v-dialog width="350px" persistent v-model="editDialog">
    <v-btn fab accent slot="activator">
      <v-icon>edit</v-icon>
    </v-btn>
    <v-card>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-title>Edit Project</v-card-title>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs12 align-center justify-space-between>
                            <v-layout align-center>
                                <v-text-field
                                prepend-icon="present_to_all"
                                name="projectName"
                                id="projectName"
                                v-model="editedName"
                                required
                                ></v-text-field>
                            </v-layout>
                        </v-flex>
                        <v-flex xs12 align-center justify-space-between>
                            <v-layout align-center>
                               <v-textarea
                            prepend-icon="notes"
                            id="description"
                            v-model="editedDescription"
                            ></v-textarea>
                            </v-layout>
                        </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-actions>
              <v-btn
                flat
                class="blue--text darken-1"
                @click="editDialog = false">Close</v-btn>
              <v-btn flat class="blue--text darken-1" @click="onSaveChanges">Save</v-btn>
            </v-card-actions>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    props: ['project'],
    data () {
      return {
        editDialog: false,
        editedName: this.project.projectName,
        editedDescription: this.project.description
      }
    },
    methods: {
      onSaveChanges () {
        if (this.editedName.trim() === '' || this.editedDescription.trim() === '') {
          return
        }
        this.editDialog = false
        this.$store.dispatch('updateProjectData', {
          id: this.project.id,
          projectName: this.editedName,
          description: this.editedDescription
        })
      }
    }
  }
</script>