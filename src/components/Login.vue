<template lang="html">

</template>

<script>
export default {
  data() {
    return {
      authenticated: false,
      secretThing: '',
      lock: new Auth0Lock('FXejolznkgCwYhkzb1de2I0muFUZHgne', 'book-trading-app.auth0.com')
    }
  },
  ready() {
    var self = this;

    this.authenticated = checkAuth();

    this.lock.on('authenticated', (authResult) => {
      console.log('authenticated');
      localStorage.setItem('id_token', authResult.idToken);
      this.lock.getProfile(authResult.idToken, (error, profile) => {
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
    });
  },
  methods: {
    login() {
      this.lock.show();
    },
    logout() {
    // To log out, we just need to remove the token and profile
    // from local storage
    localStorage.removeItem('id_token');
    localStorage.removeItem('profile');
    this.authenticated = false;
  }
},
created(){
  this.lock.show();
}
};
</script>

<style lang="css">
</style>
