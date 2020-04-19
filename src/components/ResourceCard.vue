<!-- TODO: Unit test -->
<template>
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

      <div class="content">
        <a v-if="item.url" :href="item.url" target="_blank" :title="item.title"
          ><b-icon icon="link" size="is-small"> </b-icon> {{ item.url }}
        </a>
        <b-taglist>
          <b-tag v-for="tag in item.Tags" :key="tag.id" type="is-primary">{{
            tag.name
          }}</b-tag>
        </b-taglist>

        <read-more :text="item.description" align="right"></read-more>

        <br />
        <time :datetime="item.updatedAt"
          >Updated: {{ item.updatedAt | formatDateTime }}</time
        >
      </div>
    </div>
    <footer class="card-footer">
      <!-- TODO: Add save action -->
      <span class="card-footer-item"
        ><button class="button is-primary is-fullwidth">
          Save
        </button></span
      >
      <!-- TODO: slot for footer items -->
      <span class="card-footer-item">
        <router-link
          class="button is-primary is-fullwidth"
          :to="{ name: 'Details', params: { id: item.id, name: item.name } }"
          >View</router-link
        >
      </span>
    </footer>
  </div>
</template>
<script>
import ReadMore from "@raublekick/vue-read-more";

export default {
  name: "ResourceCard",
  data() {
    return {};
  },

  props: {
    item: {
      type: Object,
      required: true
    }
  },

  components: {
    ReadMore
  }
};
</script>
<style lang="sass"></style>
