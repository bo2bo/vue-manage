<template>
  <div class="test1">
    <h1>测试一</h1>
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