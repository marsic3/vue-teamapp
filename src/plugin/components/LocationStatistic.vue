<template>
<div >
    <graph-line
            :width="1000"
            :height="400"
            :labels="labels"
            :values="loadedworkingHours">
    </graph-line>
</div>
</template>
<script>
export default {
  props: ['id'],
  data () {
    return {
    // id: this.id,
    values: [],
    labels: [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec']
    }
  },
   computed: {
      project() {
        return this.$store.getters.loadedProjects
      },
      loadedworkingHours(){
      return this.$store.getters.loadedProjectWorkingHours(this.id)
      // console.log(lista)
      // this.values.push(lista)
      // lista = null
      // console.log(this.values)
      // let listaProjekata = this.$store.getters.loadedProjects
      console.log(this.$store.getters.loadedProjectWorkingHours(this.id))
      // for (let i = 0; i < lista.length; i++) {
      //       if(lista[i].createdAt.seconds<1548892800 && lista[i].createdAt.seconds>1546300800){
      //       // console.log(lista[i].createdAt.seconds>1548892800 )
      //       this.values.push(Number(lista[i].workingHours)) }
      //   }
      //   return this.values
      }
    },

}
</script>