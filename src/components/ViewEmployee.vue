  <!-- <div id="ViewEmployee">
    <h2 class="mx-3 my-3">Details of: {{name}}</h2>
      <v-container>
        <v-card flat  >
            <v-layout row wrap >
                <v-flex>
                    <div>Name: {{name}}</div>
                </v-flex>
                <v-flex>
                  <div>Employee id: {{employee_id}}</div>
                </v-flex>
                <v-flex>
                  <div>Department: {{dept}}</div>
                </v-flex>
                <v-flex>
                  <div>Position: {{position}}</div>
                </v-flex>
            </v-layout>
        </v-card>
      </v-container>  
  </div> -->
<template>
  <div id="viewemployee">
    <h2 class="mx-3 my-3">View Employee</h2>
    <v-layout>
    <v-flex xs12 sm6 offset-sm3>
      <v-card flat hover class="max-width" >
        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">Name:{{ name }}</h3>
          </div>
        </v-card-title>
        <v-card-text>
          <ul>
               <li><div> ID: {{employee_id}}</div></li>
               <li><div> Position: {{position}}</div></li>
               <li><div> Department: {{dept}}</div></li>
          
          </ul>
        </v-card-text>
        <v-card-actions>
          <router-link to="/">
            <v-btn flat color="black">Back</v-btn>
          </router-link>
          <router-link to="/">
            <v-btn @click="deleteEmployee" flat color="red">Delete</v-btn>
          </router-link>
        </v-card-actions>
      </v-card>
      <v-btn fixed fab bottom right class="right" color="red" >
      <router-link v-bind:to="{name: 'editemployee', params:{employee_id: employee_id}}">
      <v-icon color="white" >edit</v-icon>
      </router-link>
    </v-btn>
    </v-flex>
  </v-layout>
   
  </div>
</template>

<script>
  import db from '@/firebase'
  export default {
    name: 'viewemployee',
    data () {
      return {
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
      deleteEmployee () {
        if(confirm ('Are you sure?')) {
          db.collection('employees').where('employee_id', '==', this.$route.params.employee_id).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              doc.ref.delete();
              this.$router.push('/')
            })
          })
        }
      }
    }
  }
</script>