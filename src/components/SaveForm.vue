<template>
  <div class="modal-card" style="width: auto">
    <header class="modal-card-head">
      <p class="modal-card-title">Add {{ item.title }} to another resource:</p>
    </header>
    <section class="modal-card-body">
      <b-field label="Find a resource">
        <b-autocomplete
          :data="data"
          placeholder="e.g. My Private Item"
          field="title"
          :loading="isFetching"
          :check-infinite-scroll="true"
          @typing="getAsyncData"
          @select="option => (selected = option)"
          @infinite-scroll="getMoreAsyncData"
        >
          <template slot-scope="props">
            <div class="media">
              <div class="media-left" v-if="props.option.image">
                <img width="32" :src="props.option.image" />
              </div>
              <div class="media-content">
                {{ props.option.title }}
                <br />
                <small>
                  {{ props.option.subTitle }}
                </small>
              </div>
            </div>
          </template>
          <template slot="footer">
            <span v-show="page > totalPages" class="has-text-grey">
              No more resources found!
            </span>
          </template>
        </b-autocomplete>
      </b-field>
      <div v-if="selected">
        <div class="columns is-vcentered">
          <div class="column">
            <div class="card">
              <div class="card-content">
                <div class="media">
                  <!-- Add icon if saved -->
                  <div class="media-left" v-if="item.image">
                    <figure class="image is-48x48">
                      <img :src="item.image" :alt="item.title" />
                    </figure>
                  </div>
                  <div class="media-content">
                    <p class="title is-4">{{ item.title }}</p>
                    <p class="subtitle is-6">{{ item.subTitle }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="column has-text-centered">
            >== Will be saved to ==>
          </div>
          <div class="column">
            <div class="card">
              <div class="card-content">
                <div class="media">
                  <!-- Add icon if saved -->
                  <div class="media-left" v-if="selected.image">
                    <figure class="image is-48x48">
                      <img :src="selected.image" :alt="selected.title" />
                    </figure>
                  </div>
                  <div class="media-content">
                    <p class="title is-4">{{ selected.title }}</p>
                    <p class="subtitle is-6">{{ selected.subTitle }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <b-notification
        type="is-danger"
        has-icon
        aria-close-label="Close notification"
        role="alert"
        :active.sync="showError"
      >
        {{ message }}
      </b-notification>
    </section>
    <footer class="modal-card-foot">
      <button class="button" type="button" @click="$parent.close()">
        Close
      </button>
      <button class="button is-primary" @click="save()">Save</button>
    </footer>
  </div>
</template>
<script>
import ResourceApi from "../api/resources";
import debounce from "lodash/debounce";

export default {
  name: "SaveModal",
  data() {
    return {
      data: [],
      selected: null,
      isFetching: false,
      search: "",
      page: 1,
      totalPages: 1,
      showError: false,
      message: ""
    };
  },

  props: {
    item: {
      type: Object,
      required: true
    }
  },

  components: {},

  methods: {
    getAsyncData: debounce(function(search) {
      // String update
      if (this.search !== search) {
        this.search = search;
        this.data = [];
        this.page = 1;
        this.totalPages = 1;
      }
      // String cleared
      if (!search.length) {
        this.data = [];
        this.page = 1;
        this.totalPages = 1;
        return;
      }
      // Reached last page
      if (this.page > this.totalPages) {
        return;
      }
      this.isFetching = true;
      ResourceApi.getUserResources(search)
        .then(({ data }) => {
          this.data = data;

          this.page++;
          this.totalPages = data.total_pages;
        })
        .catch(error => {
          throw error;
        })
        .finally(() => {
          this.isFetching = false;
        });
    }, 500),
    getMoreAsyncData: debounce(function() {
      this.getAsyncData(this.search);
    }, 250),
    save: function() {
      var parentId = this.selected.id,
        childId = this.item.id;

      ResourceApi.addToCollection(parentId, childId)
        .then(result => {
          console.log(result);
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
<style lang="css" scoped>
.is-vertical-center {
  display: flex;
  align-items: center;
}
</style>
