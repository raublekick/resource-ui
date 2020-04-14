<template>
  <div class="home container">
    <Search />
    <!-- <div class="columns">
      <div class="column">
        <Search2 @complete="data = $event" />
      </div>
    </div>

    <div class="columns">
      <div class="column" v-for="item in data" :key="item.id">
        <resource-card :item="item" />
      </div>
    </div> -->
  </div>
</template>

<script>
// @ is an alias to /src
import Search from "@/components/Search";
// import Search2 from "@/components/Search2";
// import ResourceCard from "@/components/ResourceCard";

export default {
  name: "Home",
  data() {
    return {
      data: []
    };
  },
  components: {
    Search
    //Search2,
    //ResourceCard
  }
};
</script>
