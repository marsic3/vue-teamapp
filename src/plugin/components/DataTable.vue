<template>
  <v-data-table
    class="elevation-1"
    :headers="headers"
    row
    :items="empolyees"
    :rows-per-page-items="[5,10, 25]">
    <template slot="items" slot-scope="props">
      
      <td class="text-xs-left">
        <v-avatar size="42">
          <img :src="props.item.avatar" alt="avatar">
        </v-avatar>
      </td>
        <td class="text-xs-left">{{ props.item.email }}</td>
        <td class="text-xs-left">{{ props.item.firstName }}</td>
        <td class="text-xs-left">{{ props.item.lastName }}</td>
        <td class="text-xs-left">{{ props.item.position }}</td>
      
      <!-- <td class="text-xs-left">{{ props.item.address.city }}</td> -->
    </template>
  </v-data-table>
</template>

<script>


import * as firebase from 'firebase'

export default {
  data() {
    return {
      users: [],
      headers: [
        {
          value: 'Avatar',
          align: 'left',
          sortable: false
        },
        {
          text: 'E-mail',
          value: 'email',
          align: 'left',
          sortable: true
        },
        {
          text: 'First Name',
          value: 'FirstName',
          align: 'left',
          sortable: true
        },
        {
          text: 'Last Name',
          value: 'LastName',
          align: 'left',
          sortable: true
        },
        {
          text: 'Position',
          value: 'Position',
          align: 'left',
          sortable: true
        },
    
      ]
    }
  },

  methods: {
    randomAvatar () {
      return avatars[Math.floor(Math.random() * avatars.length)]
    }
  },

  created() {
    const vm = this;

    // firebase.firestore().collection("user").get().then(response => {
      var result = this.empolyees
      // console.log(result+'sdada')

      vm.users = result;
    // })
    
  },
  computed: {
    empolyees () {
      return this.$store.getters.loadedEmployees
    },
  }
}
</script>

<style>
  .table {
    border-radius: 3px;
    background-clip: border-box;
    border: 1px solid rgba(0, 0, 0, 0.125);
    box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.21);
    background-color: transparent;
  }
</style>
