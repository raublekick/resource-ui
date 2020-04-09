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
        <!-- TODO: Add read more component -->
        {{ item.description }}
        <a href="#">#responsive</a>
        <br />
        <time :datetime="updatedAt">{{ item.updatedAt | formatDateTime }}</time>
      </div>
    </div>
    <footer class="card-footer">
      <!-- TODO: Add valid actions -->
      <a href="#" class="card-footer-item">Save</a>
      <a href="#" class="card-footer-item">Edit</a>
      <a href="#" class="card-footer-item">Delete</a>
    </footer>
  </div>
</template>
<script>
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
  }
};
</script>
<style lang="sass"></style>
