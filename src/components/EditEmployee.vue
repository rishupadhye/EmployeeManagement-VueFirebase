<template>
  <div id="EditEmployee">
    <h1 class="mx-3 my-3">New Employee</h1>
      <v-form ref="form" lazy-validation>
        <v-text-field v-model="employee_id" :counter="5"  disabled></v-text-field>
        <v-text-field v-model="name"  :rules="nameRules"  required></v-text-field>
        <v-text-field v-model="position"    required></v-text-field>
        <v-text-field v-model="dept"  required></v-text-field>      
        <v-btn color="success" @click="updateEmployee"> Update </v-btn>
        <v-btn color="error" @click="reset">Reset Form</v-btn>
      </v-form>
  </div>
</template>

<script>
import db from '@/firebase'
export default {
  name:'EditEmployee',
  data(){
    return{
        employee_id: null,
        name: null,
        dept: null,
        position: null
    }
  },
  beforeRouteEnter (to, from, next) {
      db.collection('employees').where('employee_id', '==', to.params.employee_id).get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          next(vm => {
            vm.employee_id = doc.data().employee_id
            vm.name = doc.data().name
            vm.dept = doc.data().dept
            vm.position = doc.data().position
          })
        })
      })
    },
    watch: {
      '$route': 'fetchData'
    },
    methods: {
      fetchData () {
        db.collection('employees').where('employee_id', '==', this.$route.params.employee_id).get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.employee_id = doc.data().employee_id
            this.name = doc.data().name
            this.dept = doc.data().dept
            this.position = doc.data().position
          })
        })
      },
      reset () {
        this.$refs.form.reset()
      },
      updateEmployee(){
        db.collection('employees').where('employee_id', '==', this.$route.params.employee_id).get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            doc.ref.update({
              employee_id: this.employee_id,
              name: this.name,
              dept: this.dept,
              position:this.position
            })
            .then(() => {
              this.$router.push({name: 'viewemployee',params:{employee_id: this.employee_id}})
            })
          })
        })
      }
    }  
}
</script>

<style scoped>

</style>
