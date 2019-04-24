<template>
  
  <div id="dashboard">
    <!-- <div class="container"> -->
    <h1 class="black--text mx-3 my-3">Dashboard</h1>
    <v-container>
    <v-list>
        <v-list-tile v-for="employee in employees" :key="employee.id" pa-5>
            
            <v-list-tile-content >
                <v-list-tile-title >{{employee.name}} -> {{employee.dept}}:{{employee.position}} </v-list-tile-title>
                
                <!-- <v-list-tile-sub-title>{{employee.dept}}</v-list-tile-sub-title>
                <v-list-tile-sub-title>{{employee.position}}</v-list-tile-sub-title> -->

            </v-list-tile-content>
            <router-link class="secondary-content" v-bind:to="{name:'viewemployee',params:{employee_id:employee.employee_id}}">
                  <v-icon>pageview</v-icon>
            </router-link>           
        </v-list-tile>
    </v-list>
    </v-container>
    <v-btn fixed fab bottom right class="right" color="red" >
      <router-link to="/new">
      <v-icon color="white" >fa fa-plus</v-icon>
      </router-link>
    </v-btn>
    </div>
  <!-- </div> -->
</template>

<script>
import db from '@/firebase'
export default {
  name:'dashboard',
  components:{},
  data(){
    return{
        employees:[]
    }
  },
  created(){
    db.collection('employees').get().then(
      querySnapshot=>{querySnapshot.forEach(doc => {
        const data = {
          'id' : doc.id,
          'employee_id':doc.data().employee_id,
          'name':doc.data().name,
          'dept':doc.data().dept,
          'position':doc.data().position

        }
        this.employees.push(data)
      })})
  }  
}
</script>

<style scoped>

</style>
