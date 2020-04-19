<template>
  <section class="columns is-centered">
    <b-loading
      :is-full-page="false"
      :active.sync="isFetching"
      :can-cancel="false"
    ></b-loading>

    <div class="column is-6">
      <form class="box" v-on:submit.prevent="submit">
        <h1 class="title">Add new resource</h1>

        <b-field label="Title">
          <b-input v-model="form.title" placeholder="Title" required></b-input>
        </b-field>

        <b-field label="Subtitle">
          <b-input v-model="form.subTitle" placeholder="Subtitle"></b-input>
        </b-field>

        <b-field label="Url">
          <b-input v-model="form.url" placeholder="URL" type="url"></b-input>
        </b-field>

        <b-field label="Description">
          <vue-editor
            id="descriptionEditor"
            v-model="form.description"
          ></vue-editor>
        </b-field>

        <b-notification
          type="is-danger"
          has-icon
          aria-close-label="Close notification"
          role="alert"
          :active.sync="showError"
        >
          {{ message }}
        </b-notification>

        <button type="submit" class="button is-primary">Submit</button>
      </form>
    </div>
  </section>
</template>
<script>
import { VueEditor } from "vue2-editor";
import ResourceApi from "../api/resources";

export default {
  name: "AddResource",
  data() {
    return {
      form: {
        name: "",
        title: "",
        subTitle: "",
        coverPhoto: "",
        url: "",
        address: "",
        description: ""
      },
      showError: false,
      message: "",
      isFetching: false
    };
  },
  components: {
    VueEditor
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  methods: {
    submit: function() {
      this.isFetching = true;
      ResourceApi.add(this.form)
        .then(result => {
          console.log(result);
          this.$router.push({
            name: "Details",
            params: { id: result.data.id, name: result.data.name }
          });
        })
        .catch(error => {
          console.log(error);
          this.message = error.response.data.error
            ? error.response.data.error
            : "There was an error saving the form.";
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
