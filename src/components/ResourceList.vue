<!-- TODO: Unit test -->
<template>
  <section>
    <div class="columns">
      <div class="column" v-for="item in items" :key="item.id">
        <resource-card :item="item" />
      </div>
    </div>
  </section>
</template>

<script>
import ResourceCard from "@/components/ResourceCard";

export default {
  data() {
    return {};
  },

  props: {
    items: Array
  },

  components: {
    ResourceCard
  },

  created: function() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
