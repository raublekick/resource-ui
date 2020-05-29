<template>
  <b-navbar>
    <template slot="brand">
      <b-navbar-item tag="router-link" :to="{ name: 'Home' }">
        <!-- <img
          src="https://raw.githubusercontent.com/buefy/buefy/dev/static/img/buefy-logo.png"
          alt="Neighborhood resource collections"
        /> -->
        <b-icon icon="handshake" size="is-large" type="is-primary"> </b-icon>
      </b-navbar-item>
    </template>
    <template slot="start">
      <b-navbar-item tag="router-link" :to="{ name: 'Home' }">
        Home
      </b-navbar-item>
      <b-navbar-item v-if="isLoggedIn" tag="router-link" :to="{ name: 'Add' }">
        Add Resource
      </b-navbar-item>
      <b-navbar-item href="#">
        Documentation
      </b-navbar-item>
      <b-navbar-dropdown label="Info">
        <b-navbar-item type="navbar-item" :to="{ name: 'About' }">
          About
        </b-navbar-item>
        <b-navbar-item href="#">
          Contact
        </b-navbar-item>
      </b-navbar-dropdown>
    </template>

    <template slot="end">
      <b-navbar-item tag="div">
        <div class="buttons">
          <router-link
            v-if="!isLoggedIn"
            type="button"
            class="button is-primary"
            :to="{ name: 'Register' }"
          >
            <strong>Sign up</strong>
          </router-link>
          <router-link
            v-if="!isLoggedIn"
            type="button"
            class="button is-light"
            :to="{ name: 'Login' }"
          >
            <strong>Log in</strong>
          </router-link>
          <router-link
            v-if="isLoggedIn"
            type="button"
            class="button is-light"
            :to="{ name: 'Logout' }"
          >
            <strong>Log out</strong>
          </router-link>
        </div>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>
<script>
export default {
  name: "Navbar",
  computed: {
    isLoggedIn() {
      console.log(this.$store.state);
      return this.$store.state.auth.status.loggedIn;
    }
  }
};
</script>
