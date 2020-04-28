<template>
  <div class="home container">
    <div class="columns">
      <div class="column" v-if="isLoggedIn">
        <div v-if="!data.length">
          <b-message type="is-info" has-icon>
            Any resources you own or have saved to a resource you own will show
            up here. Adding a new resource will automatically add you as an
            owner.

            <div>
              <router-link class="button is-primary" :to="{ name: 'Add' }"
                >Add Resource</router-link
              >
            </div>
          </b-message>
        </div>

        <resource-list :items="data" />
      </div>
      <div class="column">
        <Search />
      </div>
    </div>

    <div style="padding-top:0.75rem"></div>
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
import ResourceList from "@/components/ResourceList";
import ResourceApi from "../api/resources";
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
    Search,
    ResourceList
    //Search2,
    //ResourceCard
  },
  computed: {
    isLoggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },

  created() {
    ResourceApi.getUserResources()
      .then(results => {
        this.data = results.data;
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>
