<template>
  <section class="columns is-centered">
    <Form @saved="redirect" />
  </section>
</template>
<script>
import Form from "../components/Form";

export default {
  name: "AddResource",
  data() {
    return {};
  },
  components: {
    Form
  },
  methods: {
    redirect: function(resource) {
      this.$router.push({
        name: "Details",
        params: { id: resource.id, name: resource.name }
      });
    }
  }
};
</script>
<style lang="sass" scoped></style>
