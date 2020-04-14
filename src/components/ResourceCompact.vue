<!-- TODO: Unit test -->
<template>
  <div class="card">
    <div class="card-content">
      <div class="media">
        <!-- Add icon if saved -->
        <div class="media-left" v-if="item.url">
          <figure class="image is-48x48">
            <img :src="item.url" :alt="item.title" />
          </figure>
        </div>
        <div class="media-content">
          <p class="title is-4">{{ item.title }}</p>
          <p class="subtitle is-6">{{ item.subTitle }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "ResourceCompact",
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
