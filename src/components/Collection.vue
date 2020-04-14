<!-- TODO: Unit test -->
<template>
  <div>
    <div class="panel is-primary">
      <p class="panel-heading has-background-primary has-text-white">
        {{ heading }}
      </p>
      <div class="panel-block">
        <p class="control has-icons-left">
          <b-field type="is-primary">
            <b-input
              placeholder="Search..."
              type="search"
              icon-pack="fas"
              icon="search"
              v-model="search"
            >
            </b-input>
          </b-field>
        </p>
      </div>

      <div class="panel-block" v-for="item in filtered" :key="item.id">
        <div class="media">
          <!-- Add icon if saved -->
          <div class="media-left" v-if="item.url">
            <figure class="image is-48x48">
              <img :src="item.url" :alt="item.title" />
            </figure>
          </div>
          <div class="media-content">
            <router-link
              exact
              class="is-primary"
              :to="{
                name: 'Details',
                params: { id: item.id, name: item.name }
              }"
              >{{ item.title }}</router-link
            >
            <p class="subtitle is-7">{{ item.subTitle }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import filter from "lodash/filter";

export default {
  name: "Collection",
  data() {
    return { search: "" };
  },

  computed: {
    filtered() {
      var items = this.items;
      if (this.search != "") {
        items = filter(this.items, item => {
          return (
            item.title.includes(this.search) ||
            item.subTitle.includes(this.search)
          );
        });
      }

      return items;
    }
  },

  props: {
    items: {
      type: Array,
      required: true
    },
    heading: {
      type: String,
      default: "Collection"
    }
  }
};
</script>
<style lang="sass"></style>
