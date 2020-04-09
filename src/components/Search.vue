<!-- TODO: Unit test -->
<template>
  <section class="container">
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
    <div class="columns">
      <div class="column" v-for="item in data" :key="item.id">
        <resource-card :item="item" />
      </div>
    </div>
  </section>
</template>

<script>
import debounce from "lodash/debounce";
import resourceApi from "@/api/resources";
import ResourceCard from "@/components/ResourceCard";

export default {
  data() {
    return {
      data: [],
      selected: null,
      isFetching: false
    };
  },

  components: {
    ResourceCard
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
