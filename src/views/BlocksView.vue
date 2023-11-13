<template>
  <div class="home">
    <TestDataTable :value="blocksdata" class="p-datatable-sm">
      <TestColumn field="id" header="Id"></TestColumn>
      <TestColumn field="hash" header="Hash"></TestColumn>
      <TestColumn field="time" header="Time"></TestColumn>
    </TestDataTable>
  </div>
</template>

<script>
export default {
  props: {
    blocksdata: null
  },

  mounted() {
    //console.log(this.$props);
  }
};
</script>