<template>
  <section class="columns is-centered">
    <b-loading
      :is-full-page="false"
      :active.sync="isFetching"
      :can-cancel="false"
    ></b-loading>

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

        <b-notification
          type="is-danger"
          has-icon
          aria-close-label="Close notification"
          role="alert"
          :active.sync="showError"
        >
          {{ errorMessage }}
        </b-notification>

        <button type="submit" class="button is-primary">Log in</button>

        <div class="has-text-centered" style="margin-top:0.75rem">
          <router-link :to="{ name: 'Register' }"
            >Don't have an account? Register here</router-link
          >
        </div>
      </form>
    </div>
  </section>
</template>
<script>
import authApi from "../api/auth";

export default {
  name: "Login",
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
      errorMessage: "",
      isFetching: false
    };
  },

  methods: {
    submit: function() {
      this.isFetching = true;
      authApi
        .login(this.user)
        .then(result => {
          console.log(result);
        })
        .catch(error => {
          console.log(error);
          this.errorMessage = error.response.data.error;
          this.showError = true;
        })
        .finally(() => {
          this.isFetching = false;
        });
    }
  }
};
</script>
<style lang="sass" scoped></style>
