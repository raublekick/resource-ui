<!-- TODO: Unit test -->
<template>
  <section>
    <div class="columns">
      <div class="column is-three-quarters">
        <b-loading
          :is-full-page="false"
          :active.sync="isLoading"
          :can-cancel="false"
        ></b-loading>
        <div class="card">
          <div class="card-content">
            <div class="media">
              <!-- Add icon if saved -->
              <div class="media-left" v-if="data.image">
                <figure class="image is-48x48">
                  <img :src="data.image" :alt="data.title" />
                </figure>
              </div>
              <div class="media-content">
                <p class="title is-4">{{ data.title }}</p>
                <p class="subtitle is-6">{{ data.subTitle }}</p>
              </div>
            </div>

            <div class="content">
              <a
                v-if="data.url"
                :href="data.url"
                target="_blank"
                :title="data.title"
                ><b-icon icon="link" size="is-small"> </b-icon> {{ data.url }}
              </a>
              <b-taglist>
                <b-tag
                  v-for="tag in data.Tags"
                  :key="tag.id"
                  type="is-primary"
                  >{{ tag.name }}</b-tag
                >
              </b-taglist>

              <read-more
                v-if="data.description"
                :text="data.description"
                align="right"
              ></read-more>

              <br />
              <time :datetime="data.updatedAt"
                >Updated: {{ data.updatedAt | formatDateTime }}</time
              >
            </div>
          </div>
          <footer class="card-footer">
            <span class="card-footer-item" v-if="isLoggedIn"
              ><button
                class="button is-primary is-fullwidth"
                @click="isSaveModalActive = true"
              >
                Add to...
              </button></span
            >
            <span class="card-footer-item" v-if="isOwner">
              <router-link
                :to="{ name: 'Home' }"
                class="button is-primary is-fullwidth"
                >Edit</router-link
              >
            </span>
          </footer>
        </div>
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
    <b-modal
      :active.sync="isSaveModalActive"
      has-modal-card
      full-screen
      :can-cancel="false"
    >
      <save-form :item="data" />
    </b-modal>
  </section>
</template>

<script>
import resourceApi from "@/api/resources";
import Collection from "@/components/Collection";
import SaveForm from "@/components/SaveForm";
import ReadMore from "@raublekick/vue-read-more";
import * as _ from "lodash";

export default {
  data() {
    return {
      data: {},
      collection: [],
      parents: [],
      isLoading: false,
      isSaveModalActive: false
    };
  },

  props: {
    id: {
      type: [String, Number],
      required: true
    }
  },

  components: {
    Collection,
    SaveForm,
    ReadMore
  },

  computed: {
    isLoggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
    isOwner() {
      if (this.data.Owners) {
        var owners = _.filter(this.data.Owners, owner => {
          return owner.username === this.$store.state.auth.user.user.username;
        });
        return owners.length > 0;
      }
      return false;
    }
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
