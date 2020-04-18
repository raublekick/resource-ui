<template>
  <section class="columns is-centered">
    <div class="column is-4">
      <form class="box" v-on:submit.prevent="submit">
        <b-field label="Username">
          <b-input
            v-model="user.username"
            placeholder="Username"
            required
          ></b-input>
        </b-field>

        <b-field label="Password">
          <b-input
            type="password"
            v-model="user.password"
            password-reveal
            required
          >
          </b-input>
        </b-field>

        <b-field label="First Name">
          <b-input v-model="user.firstName" placeholder="First Name"></b-input>
        </b-field>

        <b-field label="Last Name">
          <b-input v-model="user.lastName" placeholder="Last Name"></b-input>
        </b-field>

        <b-field label="Email">
          <b-input
            type="email"
            v-model="user.email"
            placeholder="email@example.com"
          >
          </b-input>
        </b-field>

        <b-notification
          type="is-danger"
          has-icon
          aria-close-label="Close notification"
          role="alert"
          :active.sync="showError"
        >
          {{ errorMessage }}
        </b-notification>

        <button type="submit" class="button is-primary">Register</button>

        <div class="has-text-centered" style="margin-top:0.75rem">
          <router-link :to="{ name: 'Login' }"
            >Already have an account? Login here</router-link
          >
        </div>
      </form>
    </div>
  </section>
</template>
<script>
import authApi from "../api/auth";

export default {
  name: "Register",
  data() {
    return {
      user: {
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        email: ""
      },
      showError: false,
      errorMessage: ""
    };
  },

  methods: {
    submit: function() {
      authApi
        .register(this.user)
        .then(result => {
          console.log(result);
        })
        .catch(error => {
          console.log(error);
          this.errorMessage = error.response.data.error;
          this.showError = true;
        });
    }
  }
};
</script>
<style lang="sass" scoped></style>
