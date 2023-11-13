<template>
  <div class="text-900">{{ addr }}</div>
  <div class="text-500">{{ amount }}</div>
</template>

<script>
export default {
  props: {
    addr: String,
    amount: String,
  }
};
</script>
