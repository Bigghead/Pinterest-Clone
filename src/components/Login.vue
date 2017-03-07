<template lang="html">

</template>

<script>
import Keys from '../../apiKeys';
import axios from 'axios';
export default {
  data() {
    return {
      authenticated: false,
      secretThing: '',
      lock: new Auth0Lock(Keys.auth0Client, Keys.authDomain,
        { auth: {
          redirectUrl: 'http://localhost:8080/',
          autoParseHash: true,
          responseType: 'token',
          _disableDeprecationWarnings: true
         }
       })
      };
    },
    mounted() {
      //axios.get('http://localhost:8000/auth/callback');
      var self = this;

      this.$router.push('http://localhost:8000/auth');
      this.authenticated = this.checkAuth();
      console.log(this.checkAuth());
      console.log(window.location.hash);


      this.lock.on('authenticated', (authResult) => {
        console.log('authenticated');
        console.log(authResult);
        localStorage.setItem('id_token', authResult.idToken);
        this.lock.getUserInfo(authResult.idToken, (error, profile) => {
          if (error) {
            // Handle error
            return;
          }
          // Set the token and user profile in local storage
          localStorage.setItem('profile', JSON.stringify(profile));

          this.authenticated = true;
        });
      });

      this.lock.on('authorization_error', (error) => {
        // handle error when authorizaton fails
        console.log('err');
      });
      //this.lock.show();
      //axios.get('http://localhost:8000/auth');

    },
    methods: {
      logout() {
        // To log out, we just need to remove the token and profile
        // from local storage
        localStorage.removeItem('id_token');
        localStorage.removeItem('profile');
        this.authenticated = false;
      },
      checkAuth() {
        return !!localStorage.getItem('id_token');
      }
    }
  };
  </script>

  <style lang="css">
  </style>
