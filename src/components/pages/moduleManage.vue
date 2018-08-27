<template>
    <div class="module-manage">

    </div>
</template>
<script>
export default {
  data: function() {
    return {};
  },
  methods: {},
  mounted() {
    var self = this;
    if (localStorage.username == undefined) {
      self.$router.push("/login");
    }
  }
};
</script>
<style>
</style>
