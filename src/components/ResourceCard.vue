<!-- TODO: Unit test -->
<template>
  <div class="card">
    <div class="card-content">
      <div class="media">
        <div class="media-left" v-if="item.url">
          <figure class="image is-48x48">
            <img :src="item.url" :alt="item.title" />
          </figure>
        </div>
        <div class="media-content">
          <p class="title is-4">{{ item.title }}</p>
          <!-- TODO: Add Type -->
          <!-- <p class="subtitle is-6">{{ item.name }}</p> -->
        </div>
      </div>

      <div class="content">
        <b-taglist>
          <b-tag v-for="tag in item.Tags" :key="tag.id" type="is-info">{{
            tag.name
          }}</b-tag>
        </b-taglist>

        <read-more :text="item.description"></read-more>

        <br />
        <time :datetime="item.updatedAt">{{
          item.updatedAt | formatDateTime
        }}</time>
      </div>
    </div>
    <footer class="card-footer">
      <!-- TODO: Add valid actions -->
      <router-link
        class="card-footer-item"
        :to="{ name: 'Details', params: { id: item.id } }"
        >View</router-link
      >
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
