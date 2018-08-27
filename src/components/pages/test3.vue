<template>
  <div class="test3">
    <h1>测试三</h1>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      count: 0
    };
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