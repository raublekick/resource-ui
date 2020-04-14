<!-- TODO: Unit test -->
<template>
  <div>
    <b-field>
      <b-input
        placeholder="Search..."
        type="search"
        icon-pack="fas"
        icon="search"
        :loading="isFetching"
        @input="getAsyncData"
      >
      </b-input>
    </b-field>
    <b-loading
      :is-full-page="false"
      :active.sync="isFetching"
      :can-cancel="true"
    ></b-loading>
  </div>
</template>

<script>
import debounce from "lodash/debounce";
import resourceApi from "@/api/resources";

export default {
  data() {
    return {
      data: [],
      selected: null,
      isFetching: false
    };
  },

  props: {
    searchFunction: {
      type: Function,
      required: false
    }
  },

  computed: {},

  methods: {
    // You have to install and import debounce to use it,
    // it's not mandatory though.
    searchMethod(search) {
      if (this.searchFunction) {
        return this.searchFunction(search);
      } else {
        return this.searchAll(search);
      }
    },

    searchAll: function(search) {
      return resourceApi.getResources(search);
    },

    getAsyncData: debounce(function(search) {
      if (!search.length) {
        this.data = [];
        return;
      }
      this.isFetching = true;
      this.searchMethod(search)
        .then(({ data }) => {
          this.data = [];
          data.forEach(item => this.data.push(item));
        })
        .catch(error => {
          this.data = [];
          this.$buefy.toast.open({
            duration: 5000,
            message:
              "Status " +
              (error.response != undefined ? error.response.status : error) +
              "Error",
            type: "is-danger"
          });
          throw error;
        })
        .finally(() => {
          this.$emit("complete", this.data);
          this.isFetching = false;
        });
    }, 500)
  },

  created: function() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
