<template>
  <section class="columns is-centered">
    <Form :formData="formData" @saved="redirect" />
  </section>
</template>
<script>
import Form from "../components/Form";
import resourceApi from "../api/resources";

export default {
  name: "EditResource",
  data() {
    return {
      formData: {}
    };
  },
  props: {
    id: {
      require: true
    }
  },
  components: {
    Form
  },
  methods: {
    load: function(id) {
      resourceApi
        .getResource(id)
        .then(response => {
          this.formData = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    redirect: function() {
      this.$router.push({
        name: "Details",
        params: { id: this.id, name: this.formData.name }
      });
    }
  },
  watch: {
    id: function() {
      if (this.id) {
        this.load(this.id);
      }
    }
  },
  created() {
    if (this.id) {
      this.load(this.id);
    }
  }
};
</script>
<style lang="sass" scoped></style>
