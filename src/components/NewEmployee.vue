<template>
  <div id="NewEmployee">
    <h1 class="mx-3 my-3">New Employee</h1>
      <v-form ref="form" lazy-validation>
        <v-text-field v-model="employee_id" :counter="5"  label="Employee id" required></v-text-field>
        <v-text-field v-model="name"  :rules="nameRules" label="Name" required></v-text-field>
        <v-text-field v-model="position"   label="Position" required></v-text-field>
        <v-text-field v-model="department"  label="Department" required></v-text-field>      
        <v-btn color="success" @click="saveEmployee"> Submit</v-btn>
        <v-btn color="error" @click="reset">Reset Form</v-btn>
      </v-form>
  </div>
</template>

<script>
import db from '@/firebase'
export default {
  name:'NewEmployee',
  data(){
    
    return{
        employee_id: null,
        name: null,
        dept: null,
        position: null,
        nameRules: [
            v => !!v || 'Name is required',
            v => (v && v.length <= 10) || 'Name must be less than 10 characters'
          ]
    }
  },
  methods:{
      reset () {
        this.$refs.form.reset()
      },
      saveEmployee(){
        db.collection('employees').add({
            employee_id:this.employee_id,
            name:this.name,
            dept:this.department,
            position:this.position
      
        })
        .then(docRef => this.$router.push('/'))
        .catch(error=> console.log(err))
      }

  }  
}
</script>

<style scoped>

</style>
