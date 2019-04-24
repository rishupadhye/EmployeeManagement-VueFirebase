<template>
    <div>
        <v-container fluid fill-height class="loginOverlay">
          <v-layout flex align-center justify-center>
            <v-flex>
              <v-card color="success lighten-3">
                <v-card-text class="pt-4">
                  <div>
                      <v-form v-model="valid" ref="form">
                        <v-text-field
                          label="Enter your e-mail address"
                          v-model="email"
                          :rules="emailRules"
                          required
                        ></v-text-field>
                        <v-text-field
                          label="Enter your password"
                          v-model="password"
                          min="8"
                          :append-icon="e1 ? 'visibility' : 'visibility_off'"
                          :append-icon-cb="() => (e1 = !e1)"
                          :type="e1 ? 'password' : 'text'"
                          :rules="passwordRules"
                          counter
                          required
                        ></v-text-field>
                        <v-layout justify-space-between>
                            <v-btn @click="register" :class=" { 'blue darken-4 white--text' : valid, disabled: !valid }">Register</v-btn>
                            <a href="">Forgot Password</a>
                        </v-layout>
                      </v-form>
                  </div>
                </v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
       </v-container>

    </div>
</template>


<script>
import firebase from 'firebase';

export default {
    name:'register',
    data(){
        return{
            valid: false,
            e1: false,
            password: '',
            passwordRules: [
              (v) => !!v || 'Password is required',
            ],
            email: '',
            emailRules: [
              (v) => !!v || 'E-mail is required',
              (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
            ]
        }
    },
    methods:{
        register: function (e) {
            firebase
            .auth()
            .createUserWithEmailAndPassword(this.email,this.password)
            .then(
                user => {
                alert(`Account created for ${user.user.email}`); 
                this.$router.go({path: this.router.path});
            },
            err=>{
                alert(err.message);
            })
            e.preventDefault();
        },
        clear () {
            this.$refs.form.reset()
        }
    }
}    

</script>
