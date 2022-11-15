<template>
  <div>
    <h1>Home</h1>
    <h2>
      <test />
    </h2>
    <div>count: {{ count }}</div>
    <el-button @click="addCount">+1</el-button>
    <router-link to="/about">to about</router-link>
  </div>
</template>
<script>
export default {
  components: {
    Test: () => import('@/components/test/index.vue'),
  },
  computed: {
    count() {
      return this.$store.getters.count;
    },
  },
  methods: {
    addCount() {
      this.$store.commit("addCount", 1);
    },
  },
};
</script>