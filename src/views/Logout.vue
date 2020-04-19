<template>
  <section class="columns is-centered">
    <b-loading
      :is-full-page="false"
      :active.sync="isFetching"
      :can-cancel="false"
    ></b-loading>

    <div class="column is-4">
      <b-notification type="is-info" has-icon role="info" :closable="false">
        You have been succcessfully logged out.
      </b-notification>
    </div>
  </section>
</template>
<script>
export default {
  name: "Login",
  data() {
    return {
      showError: false,
      errorMessage: "",
      isFetching: false
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  methods: {
    logout: function() {
      this.isFetching = true;
      this.$store
        .dispatch("auth/logout", this.user)
        .then(
          () => {
            console.log("Logged out");
          },
          error => {
            this.loading = false;
            this.message =
              (error.response && error.response.data) ||
              error.message ||
              error.toString();
          }
        )
        .finally(() => {
          this.isFetching = false;
        });
    }
  },
  created() {
    this.logout();
  }
};
</script>
<style lang="sass" scoped></style>
