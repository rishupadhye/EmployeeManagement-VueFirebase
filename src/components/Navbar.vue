<template>
    <nav>
        <v-toolbar color="primary">
            <router-link to="/">
                <v-toolbar-title class="text-uppercase white--text" > 
                    <span>Employee </span>
                    <span class="font-weight-light">Manager</span>
                </v-toolbar-title>
            </router-link>
            <v-spacer></v-spacer>    
                <v-toolbar-items class="hidden-sm-and-down">
                    <v-btn flat class="white--text" v-for="link in links" :key="link.Text" router :to="link.route" v-if="link.case">{{link.Text}}</v-btn>
                    <v-btn flat class="white--text" v-if="isLoggedIn" @click="logout">Signout<v-icon>keyboard_tab</v-icon></v-btn>
                </v-toolbar-items>

            
        </v-toolbar>
    </nav>
</template>

<script>
import firbase from 'firebase'
export default {
    name:'Navbar',
    data(){
        return{
            links:[
                {Text:'Dashboard',route:'/',case:'isLoggedin'},
                {Text:'Login',route:'/login',case:'!isLoggedin'},
                {Text:'Register',route:'/register',case:'!isLoggedin'}
            ],
            isLoggedIn:false,
            currentUser:false
        }
    },
    created() {
    if (firebase.auth().currentUser) {
      this.isLoggedIn = true;
      this.currentUser = firebase.auth().currentUser.email;
    }
  },
  methods: {
    logout: function() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.go({ path: this.$router.path });
        });
    }
  }
};

</script>
