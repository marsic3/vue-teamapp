<template>
<div>
    <v-toolbar flat color="white">
      <v-toolbar-title>Employees</v-toolbar-title>
      <v-divider
        class="mx-2"
        inset
        vertical
      ></v-divider>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" max-width="500px">
        <v-btn slot="activator" color="primary" dark class="mb-2">New Employee</v-btn>
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-layout row offset-sm3 column fill-height>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.email" label="Email"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.firstName" label="First Name"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.lastName" label="Last Name"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.position" label="Position"></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="close">Cancel</v-btn>
            <v-btn color="blue darken-1" flat @click="save">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>
    <v-data-table
      :headers="headers"
      :items="users"
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <td class="text-xs-left">
        <v-avatar size="42">
          <img :src="props.item.avatar" alt="avatar">
        </v-avatar>
      </td>
        <!-- <td>{{ props.item.key }}</td> -->
        <td class="text-xs-left">{{ props.item.email }}</td>
        <td class="text-xs-left">{{ props.item.firstName }}</td>
        <td class="text-xs-left">{{ props.item.lastName }}</td>
        <td class="text-xs-left">{{ props.item.position }}</td>
        <td class="text-xs-center layout ">
          <v-icon
            small
            class="mr-2"
            @click="editItem(props.item)"
          >
            edit
          </v-icon>
          <v-icon
            small
            @click="deleteItem(props.item)"
          >
            delete
          </v-icon>
        </td>
      </template>
      <template slot="no-data">
        <v-btn color="primary">Reset</v-btn>
      </template>
    </v-data-table>
</div>

</template>

<script>
const avatars = [
  'https://avataaars.io/?accessoriesType=Blank&avatarStyle=Circle&clotheColor=PastelGreen&clotheType=ShirtScoopNeck&eyeType=Wink&eyebrowType=UnibrowNatural&facialHairColor=Black&facialHairType=MoustacheMagnum&hairColor=Platinum&mouthType=Concerned&skinColor=Tanned&topType=Turban',
  'https://avataaars.io/?accessoriesType=Sunglasses&avatarStyle=Circle&clotheColor=Gray02&clotheType=ShirtScoopNeck&eyeType=EyeRoll&eyebrowType=RaisedExcited&facialHairColor=Red&facialHairType=BeardMagestic&hairColor=Red&hatColor=White&mouthType=Twinkle&skinColor=DarkBrown&topType=LongHairBun',
  'https://avataaars.io/?accessoriesType=Prescription02&avatarStyle=Circle&clotheColor=Black&clotheType=ShirtVNeck&eyeType=Surprised&eyebrowType=Angry&facialHairColor=Blonde&facialHairType=Blank&hairColor=Blonde&hatColor=PastelOrange&mouthType=Smile&skinColor=Black&topType=LongHairNotTooLong',
  'https://avataaars.io/?accessoriesType=Round&avatarStyle=Circle&clotheColor=PastelOrange&clotheType=Overall&eyeType=Close&eyebrowType=AngryNatural&facialHairColor=Blonde&facialHairType=Blank&graphicType=Pizza&hairColor=Black&hatColor=PastelBlue&mouthType=Serious&skinColor=Light&topType=LongHairBigHair',
  'https://avataaars.io/?accessoriesType=Kurt&avatarStyle=Circle&clotheColor=Gray01&clotheType=BlazerShirt&eyeType=Surprised&eyebrowType=Default&facialHairColor=Red&facialHairType=Blank&graphicType=Selena&hairColor=Red&hatColor=Blue02&mouthType=Twinkle&skinColor=Pale&topType=LongHairCurly',
  'https://avataaars.io/?'
]
import * as firebase from 'firebase'
  export default {
    data () {
    return {
      dialog: false,
      headers: [
        {
          text: '',
          align: 'left',
          sortable: false,
          value: 'key'
        },
        { text: 'Email', value: 'email' },
        { text: 'First Name', value: 'firstName' },
        { text: 'Last Name', value: 'lastName' },
        { text: 'Position', value: 'position' },
        { text: 'Actions', value: 'name', sortable: false }
      ],
      
      editedIndex: -1,
      editedItem: {
        email: '',
        firstName: '',
        lastName: '',
        position: '',
        key: ''
      },
      defaultItem: {
        email: '',
        firstName: '',
        lastName: '',
        position: '',
        key: ''
      }
    }
    },

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
      users(){
        return this.$store.getters.loadedEmployees
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
    },


    watch: {
      dialog (val) {
        val || this.close()
      }
    },
    methods: {
      randomAvatar () {
      return avatars[Math.floor(Math.random() * avatars.length)]
    },
      editItem (item) {
        this.editedIndex = this.users.indexOf(item)
        console.log(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        const index = this.users.indexOf(item)
        console.log("index"+item)
        confirm('Are you sure you want to delete this item?') 
        && this.users.splice(index, 1)
        && this.$store.dispatch('deleteEmployee', item )
      },

      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },

      save () {
        var number = Math.random() // 0.9394456857981651
        number.toString(36); // '0.xtis06h6'
        var num = number.toString(36).substr(2, 9); // 'xtis06h6'
        if (this.editedIndex > -1) {
        //   Object.assign(this.users[this.editedIndex], this.editedItem)
            if (this.editedItem.email.trim() === '' || this.editedItem.firstName.trim() === '' || this.editedItem.lastName.trim() === '' || this.editedItem.position.trim() === '') {
                return
            }
                this.dialog = false
                const payload = {
                key: this.editedItem.key,
                email: this.editedItem.email,
                firstName: this.editedItem.firstName,
                lastName: this.editedItem.lastName,
                position: this.editedItem.position,
                createdAt: new Date(),

                }
                this.$store.dispatch('updateEmployeeData',payload)
                console.log(payload.key)
        } else {
          
          // id.length >= 9; // false

          this.dialog = false
          const userData = {
               key: num,
               email: this.editedItem.email,
               firstName: this.editedItem.firstName,
               lastName: this.editedItem.lastName,
               position: this.editedItem.position,
               createdAt: new Date(),
          }
          this.$store.dispatch('createEmployee', userData)
          console.log('user created'+ userData.key)
          this.$router.push('/listofusers')
        }
        this.close()
      },
    //    onCreateProject(){
         
    //   },
      
    }
  }
</script>