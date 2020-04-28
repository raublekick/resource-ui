<!-- TODO: Unit test -->
<template>
  <section>
    <b-field>
      <b-input
        placeholder="Search..."
        type="search"
        icon="magnify"
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
    <resource-list :items="data" />

    <div v-if="!data.length">
      <b-message type="is-info" has-icon>
        Begin searching to find resources.
      </b-message>
    </div>
  </section>
</template>

<script>
import debounce from "lodash/debounce";
import resourceApi from "@/api/resources";
import ResourceList from "@/components/ResourceList";

export default {
  data() {
    return {
      data: [],
      selected: null,
      isFetching: false
    };
  },

  components: {
    ResourceList
  },

  methods: {
    // You have to install and import debounce to use it,
    // it's not mandatory though.
    getAsyncData: debounce(function(search) {
      if (!search.length) {
        this.data = [];
        return;
      }
      this.isFetching = true;
      resourceApi
        .getResources(search)
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
          this.isFetching = false;
        });
    }, 500)
  },

  created: function() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
