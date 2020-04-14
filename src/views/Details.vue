<!-- TODO: Unit test -->
<template>
  <section class="container">
    <div class="columns">
      <div class="column is-three-quarters">
        <b-loading
          :is-full-page="false"
          :active.sync="isLoading"
          :can-cancel="false"
        ></b-loading>
        <resource-card :item="data" v-if="data.id" />
      </div>
      <div class="column">
        <div class="columns">
          <div class="column is-full">
            <Collection :items="collection" />
          </div>
        </div>
        <div class="columns">
          <div class="column is-full">
            <Collection
              :items="parents"
              heading="Included in other collections"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import resourceApi from "@/api/resources";
import ResourceCard from "@/components/ResourceCard";
import Collection from "@/components/Collection";

export default {
  data() {
    return {
      data: {},
      collection: [],
      parents: [],
      isLoading: false
    };
  },

  props: {
    id: {
      type: Number,
      required: true
    }
  },

  components: {
    ResourceCard,
    Collection
  },

  methods: {
    getResource: function(id) {
      this.isLoading = true;
      resourceApi
        .getResource(id)
        .then(({ data }) => {
          this.data = data;
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
          this.isLoading = false;
        });
    },

    getCollection: function(id) {
      this.isLoading = true;
      resourceApi
        .getResourceCollection(id)
        .then(({ data }) => {
          this.collection = data;
        })
        .catch(error => {
          this.collection = [];
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
          this.isLoading = false;
        });
    },

    getParents: function(id) {
      this.isLoading = true;
      resourceApi
        .getResourceParents(id)
        .then(({ data }) => {
          this.parents = data;
        })
        .catch(error => {
          this.parents = [];
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
          this.isLoading = false;
        });
    },

    load: function(id) {
      if (id) {
        this.getResource(id);
        this.getCollection(id);
        this.getParents(id);
      }
    }
  },

  watch: {
    id: function(val) {
      this.load(val);
    }
  },

  created: function() {
    this.load(this.id);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
